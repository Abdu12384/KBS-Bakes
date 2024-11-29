const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy


  passport.use(new GoogleStrategy({
         clientID:process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
       },
       async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;
        try {
          let user = await User.findOne({ email });
  
          if (!user) {
            user = new User({
              googleId: id,
              fullName: displayName,
              email,
            });
            await user.save();
          }
          done(null, user); // Pass user data to callback
        } catch (error) {
          done(error, null);
        }
      }
  
     )
  )

  passport.serializeUser((user, done)=> done(null, user.id))
  passport.deserializeUser(async (id, done)=>{
      try {
         const user = await User.findById(id)
         done(null,user)
      } catch (error) {
        done(error,null)
      }
  })






const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};







 const googleSingupCallback = async (req,res)=>{
   try {
     const user = req.user
      console.log(user);
      
       const accessToken = generateAccessToken(user._id)
       const refreshToken = generateRefreshToken(user._id)

       user.refreshToken = refreshToken
       await user.save()

       res.cookie('authToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, 
      });
  
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });

     res.status(200).json({message:"Singup Successfully"})
   } catch (error) {
     console.error(error)
     res.status(500).json({message:'Server error'})
   }
 }



  const googleRefreshHandle = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(403).json({ error: 'Refresh token missing' });
  
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(payload.id);
  
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }
  
      const newAccessToken = generateAccessToken(user._id);
      res.cookie('auth_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
  
      res.json({ success: true });
    } catch (error) {
      res.status(403).json({ error: 'Invalid token' });
    }
  }







 module.exports={
   googleSingupCallback,
   googleRefreshHandle
 }

