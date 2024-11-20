import { Link } from "react-router-dom"
import { logo } from "../assets"
import { useSelector } from "react-redux"


const Nav = () => {
  const {user} = useSelector(state=> state.user)
  console.log(user);
  return (
    <div className="flex justify-between items-center px-[90px] py-[10px] font-secondary text-heading_2 text-tx_primary font-medium">
        <img src={logo} alt="blog_app_logo" className="w-[100px] h-[100px] object-fit rounded-full" />
        <nav className="flex gap-[30px]">
            <a href="#" className="hover:text-glow">Home</a>
            <a href="/posts" className="hover:text-glow">Blog</a>
            <a href="#" className="hover:text-glow">About</a>
            <a href="#" className="hover:text-glow">Contact</a>
        </nav>
        {!user ?
        (<Link to={"/login"}><button className="w-[100px] px-4 py-1 text-blog-500 bg-white font-secondary rounded-[5px] focus:outline-none " >Log in</button></Link>)
        : 
        (<div className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-bg_primary border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400">{user.name.substring(0,1)}</div>)
      }
    </div>
  )
}

export default Nav