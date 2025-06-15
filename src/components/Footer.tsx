
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/resident-dashboard" },
        { name: "Facility Booking", href: "/facility-booking" },
        { name: "Service Providers", href: "/service-providers" },
        { name: "Maintenance", href: "/maintenance-portal" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Visitor Management", href: "/visitor-management" },
        { name: "Events", href: "/event/1" },
        { name: "Polls", href: "/poll/1" },
        { name: "Complaints", href: "/complaint/1" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Admin", href: "/admin" }
      ]
    }
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      // Handle anchor links
      return;
    }
    navigate(href);
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-800/90 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">My Block</h3>
              <p className="text-white/70 leading-relaxed">
                Transforming neighborhood living through intelligent community management and seamless resident experiences.
              </p>
            </div>
            
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-sm font-medium">{social.charAt(0).toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-6">
              <h4 className="text-lg font-semibold text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-white/70 hover:text-white transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm">
            © 2024 My Block. All rights reserved. Building smarter communities.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <button className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </button>
            <button className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </button>
            <button className="text-white/60 hover:text-white text-sm transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
