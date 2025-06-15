
import { Home, Mail, MapPin, Phone, Facebook, TwitterIcon as Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Dashboard", href: "#dashboard" },
        { name: "Committee Tools", href: "#committee" },
        { name: "Vendor Marketplace", href: "#services" },
        { name: "Facility Booking", href: "#booking" },
        { name: "Mobile App", href: "#" }
      ]
    },
    {
      title: "Company", 
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "API Docs", href: "#" },
        { name: "Status", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" },
        { name: "Security", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-[#111827] border-t border-white/10 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">MyBlock</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Transforming neighborhoods through intelligent civic management and community engagement.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@myblock.community</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-white/10 pt-8 pb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-white/70 text-sm">
                Get the latest updates on features, community stories, and civic innovation.
              </p>
            </div>
            <div className="flex space-x-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#ff6ec4]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/60 text-sm">
            © 2024 MyBlock. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
