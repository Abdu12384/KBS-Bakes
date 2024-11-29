function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-[#f5e6d3] pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* Logo */}
              <div className="relative w-12 h-12 mr-2">
                <div className="absolute w-8 h-8 bg-[#DEB887] rounded-t-full top-1 left-2"></div>
                <div className="absolute w-10 h-3 bg-[#8B4513] bottom-1 left-1"></div>
                <div className="absolute w-6 h-2 bg-[#DEB887] bottom-3 left-3"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#8B4513]">KBS</span>
                <span className="text-2xl font-bold text-[#DEB887]">BAKES</span>
                <span className="block text-sm italic text-[#8B4513]">Cakes</span>
              </div>
            </div>
            <p className="text-[#8B4513]/80">
              Crafting moments of joy through delicious and beautiful cakes since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Our Menu', 'Custom Orders', 'About Us', 'Contact', 'FAQs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#8B4513]/80 hover:text-[#DEB887] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-[#8B4513]/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                123 Bakery Street, Sweet City
              </li>
              <li className="flex items-center text-[#8B4513]/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@kbsbakes.com
              </li>
              <li className="flex items-center text-[#8B4513]/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-[#8B4513] mb-4">Newsletter</h3>
            <p className="text-[#8B4513]/80 mb-4">
              Subscribe to receive updates about new products and special offers!
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-[#DEB887] focus:outline-none focus:ring-2 focus:ring-[#8B4513] bg-white/50"
              />
              <button
                type="submit"
                className="w-full bg-[#8B4513] text-white py-2 rounded-lg hover:bg-[#DEB887] transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
            <a
              key={social}
              href="#"
              className="w-10 h-10 rounded-full bg-[#8B4513] text-white flex items-center justify-center hover:bg-[#DEB887] transition-colors duration-300"
            >
              <span className="sr-only">{social}</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {social === 'facebook' && (
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                )}
                {social === 'twitter' && (
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                )}
                {social === 'instagram' && (
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
                )}
                {social === 'youtube' && (
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                )}
              </svg>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-[#8B4513]/20 pt-6">
          <p className="text-center text-[#8B4513]/60 text-sm">
            © {new Date().getFullYear()} KBS Bakes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

