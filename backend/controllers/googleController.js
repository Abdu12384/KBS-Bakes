const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../model/userModel');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};
 
const googleSignup = async (req, res) => {
    console.log('working');
       const {tokenId} = req.body
        console.log(tokenId);
        
       try {
         const ticket = await client.verifyIdToken({
           idToken:tokenId,
           audience: process.env.GOOGLE_CLIENT_ID
          });
          console.log('dsfdsfsfdsfsdfsf',ticket);
    
    const payload = ticket.getPayload();
    const { email, name, picture } = payload
    console.log('herthe informantion ',email,name,picture);
    

    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        email,
        fullName:name,
        profileImage:picture,
        googleId:payload.sub,
        mobile:'9809809',
        password:'1234',
      });
    }
   
    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();
     
    // Set tokens in cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.fullName,
        profileImage: user.profileImage,
        token:refreshToken
      }
    });

  } catch (error) {
    console.error('Google signup error:', error);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};





// // Middleware to verify access token from cookies
// exports.verifyToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.accessToken;
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Access token not found' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// };

module.exports={
   googleSignup
}