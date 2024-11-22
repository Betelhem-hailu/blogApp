import { Link } from "react-router-dom"
import { logo } from "../assets"
import { useSelector } from "react-redux"
import { useState } from "react"


const Nav = () => {
  const [showModal, setShowModal] = useState(false)
  const {user} = useSelector(state=> state.user)
  return (
    <div className="relative flex justify-between items-center px-[90px] py-[10px] font-secondary text-heading_2 text-tx_primary font-medium">
        <Link to={"/"}><img src={logo} alt="blog_app_logo" className="w-[100px] h-[100px] object-fit rounded-full" /></Link>
        <nav className="flex gap-[30px]">
            <a href="#" className="hover:text-glow">Home</a>
            <a href="/posts" className="hover:text-glow">Blog</a>
            <a href="#" className="hover:text-glow">About</a>
            <a href="#" className="hover:text-glow">Contact</a>
        </nav>
        {!user 
        ? (<Link to={"/login"}><button className="w-[100px] px-4 py-1 text-blog-500 bg-white font-secondary rounded-[5px] focus:outline-none " >Log in</button></Link>)
        : ( user.profile_pic 
          ? <img src={user.profile_pic} alt="profile_pic" onClick={()=>{setShowModal(!showModal)}} className="cursor-pointer h-[50px] w-[50px] object-cover rounded-full border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400" />
          : <div onClick={()=>{setShowModal(!showModal)}} className="cursor-pointer h-[50px] w-[50px] flex justify-center items-center rounded-full bg-bg_primary border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400">{user.name.substring(0,1)}</div>
        )
      }
      { showModal &&
      <div className="absolute right-[100px] w-[120px] bottom-[-30px] rounded-[10px] px-[10px] py-[5px] bg-bg_primary text-tx_primary text-base font-secondary border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400">
        <Link to={"/listpost"}><p className="cursor-pointer border-b border-b-br_primary hover:text-tx_link">My blog posts</p></Link>
        <Link to={"/profile"}><p className="cursor-pointer hover:text-tx_link">Profile</p></Link>
      </div>
}
    </div>
  )
}

export default Nav