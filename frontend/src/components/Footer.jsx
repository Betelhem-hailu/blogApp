import { logo } from "../assets";

const Footer = () => {
  return (
    <footer>
      <div id="contact" className="container mx-auto px-[90px] py-[10px] grid grid-cols-1 md:grid-cols-3 gap-4 text-tx_primary">
      <img src={logo} alt="blog_app_logo" className="w-[100px] h-[100px] object-fit rounded-full" />
        <div>
          <h3 className="text-base mb-2">Useful Links</h3>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-white text-small">Contact Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-small">About Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-base mb-2">Legal</h3>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-white text-small">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-small">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>
      <div className="bg-bg_tertiary px-[90px] text-tx_primary">
          <p>&copy; All rights reserved</p>
        </div>
    </footer>
  );
};

export default Footer;
