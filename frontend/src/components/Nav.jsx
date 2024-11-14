import { logo } from "../assets"


const Nav = () => {
  return (
    <div className="flex justify-between items-center px-[90px] py-[10px] font-secondary text-heading_2 text-tx_primary font-medium">
        <img src={logo} alt="blog_app_logo" className="w-[100px] h-[100px] object-fit rounded-full" />
        <nav className="flex gap-[30px]">
            <a href="#" className="hover:text-glow">Home</a>
            <a href="#" className="hover:text-glow">About</a>
            <a href="#" className="hover:text-glow">Contact</a>
        </nav>
        <button className="w-[100px] px-4 py-1 text-blog-500 bg-white font-secondary rounded-[5px] focus:outline-none ">Log in</button>
    </div>
  )
}

export default Nav