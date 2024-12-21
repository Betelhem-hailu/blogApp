import { Link } from "react-router-dom"
import { logo } from "../assets"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addNotification, fetchNotifications, markAsRead } from "../slices/notify.slice"
import { socket } from "../utils/socket";
import { FaBell } from "react-icons/fa";
import { GoRead } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Nav = () => {
  const [showModal, setShowModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showMenu, setShowMenu] = useState(false);

  const {user} = useSelector(state=> state.user)

  const dispatch = useDispatch();
    const { notifications, loading } = useSelector((state) => state.notifications);

    useEffect(() => {
      if (user) {
        // Fetch notifications on load
        dispatch(fetchNotifications());
  
        // Listen for real-time notifications
        socket.on("notification", (notification) => {
          dispatch(addNotification(notification));
        });
  
        return () => {
          socket.off("notification");
        };
      }
    }, [dispatch, user]);

  const handleMarkAsRead = (notificationId) => {
    if (user) {
      dispatch(markAsRead([notificationId]));
    }
  };

  return (
    <div className="relative flex justify-between items-center px-[30px] md:px-[90px] py-[10px] font-secondary text-heading_2 text-tx_primary font-medium">
        <Link to={"/"}><img src={logo} alt="blog_app_logo" className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] object-fit rounded-full" /></Link>

        <nav className="hidden md:flex gap-[30px]">
            <a href="/#home" className="hover:text-glow">Home</a>
            <a href="/blog" className="hover:text-glow">Blog</a>
            <a href="#" className="hover:text-glow">About</a>
            <a href="#contact" className="hover:text-glow">Contact</a>
        </nav>

        {showMenu && (
        <div className="absolute top-full left-0 w-full bg-blog-200 shadow-md md:hidden">
          <nav className="flex flex-col items-center gap-4 py-4">
            <a href="/#home" className="hover:text-glow" onClick={() => setShowMenu(false)}>Home</a>
            <a href="/blog" className="hover:text-glow" onClick={() => setShowMenu(false)}>Blog</a>
            <a href="#" className="hover:text-glow" onClick={() => setShowMenu(false)}>About</a>
            <a href="#contact" className="hover:text-glow" onClick={() => setShowMenu(false)}>Contact</a>
          </nav>
        </div>
      )}

<div className="flex gap-[10px]">

        {!user 
        ? (<Link to={"/login"}>
          <button className="w-[100px] px-4 py-1 text-blog-500 bg-white font-secondary rounded-[5px] focus:outline-none " >Log in</button></Link>)
        : ( <div className="flex gap-[10px]">
         { user.profile_pic 
          ? <img src={user.profile_pic} alt="profile_pic" onClick={()=>{setShowModal(!showModal)}} className="cursor-pointer h-[20px] w-[20px] md:h-[50px] md:w-[50px] object-cover rounded-full border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400" />
          : <div onClick={()=>{setShowModal(!showModal)}} className="cursor-pointer h-[40px] w-[40px] md:h-[50px] md:w-[50px] flex justify-center items-center rounded-full bg-bg_primary border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400">{user.name.substring(0,1)}</div>
         }
          <div onClick={()=>{setShowNotification(!showNotification)}} className="cursor-pointer h-[40px] w-[40px] md:h-[50px] md:w-[50px] flex justify-center items-center rounded-full bg-bg_primary border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400">
          <FaBell color="#59ACFF"/>
          </div>
          </div>
        )
      }
      <button 
        className="text-2xl md:hidden focus:outline-none" 
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
      </div>
      { showModal &&
      <div className="absolute right-[100px] w-[120px] bottom-[-30px] rounded-[10px] px-[10px] py-[5px] bg-bg_primary text-tx_primary text-base font-secondary border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400">
        <Link to={"/listpost"}><p className="cursor-pointer border-b border-b-br_primary hover:text-tx_link">My blog posts</p></Link>
        <Link to={"/profile"}><p className="cursor-pointer hover:text-tx_link">Profile</p></Link>
      </div>
}

{
  showNotification &&
  <div className="z-20 absolute right-[10px] w-[200px] h-[30vh] md:h-[50vh] overflow-scroll top-[100px] rounded-[10px] px-[10px] py-[5px] bg-bg_primary text-tx_primary text-base font-secondary border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400">
    <ul className="list-none">
    {loading? <div>loading</div> : 
    notifications.length === 0 ? ( <li>No notifications</li> ) :
    notifications.map((notification) => (
              <div key={notification._id} className="flex">
                        <p>{notification.message}</p>
                    <button onClick={() => handleMarkAsRead(notification._id)} className=""><GoRead color="#59ACFF" /></button>
              </ div>
            ))}
    </ul>
  </div>
}
    </div>
  )
}

export default Nav