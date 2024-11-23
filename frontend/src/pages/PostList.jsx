import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsbyuserId } from "../slices/post.slice";

const PostList = () => {
  const dispatch =  useDispatch();
  const {data} = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsbyuserId());
  }, [dispatch]);

  return (
    <div className="bg-bg_primary min-h-[100vh] h-full">
      <header className="bg-five-color-gradient text-tx_primary h-[70px] shadow-header_shadow">
        <div className="flex justify-between items-center px-[90px] py-[10px]">
          <div className="flex gap-[15px] items-center">
          <Link to={"/"}><img src={logo} alt="blog_app_logo" className="w-[50px] h-[50px] object-fit rounded-full" /></Link>
            <h1 className="text-2xl font-semibold">POSTS</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
            <input type="text" placeholder="Search..." className="pl-[80px] px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[100px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <RiSearchLine color="#59ACFF" size={40} width={10} className="absolute top-[10%] left-[10px]" />
            </div>
            <select className="p-2 border border-[0.5px] border-br_primary rounded-[15px] bg-[#00000066] text-white w-[100px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="all" className="border border-[0.5px] border-br_primary rounded-[15px] bg-[#00000066] text-white">ALL</option>
              <option value="category1" className="border border-[0.5px] border-br_primary rounded-[15px] bg-[#00000066] text-white">Category 1</option>
            </select>
          </div>
        </div>
      </header>
      <div className="px-[90px] pt-[40px]">
        <Link to={"/createpost"}><button className="bg-white text-gray-900 py-2 px-4 rounded-lg">Add +</button></Link>
        
        <div className="mt-6 grid grid-cols-3 gap-[20px]">
          {data && data.map((post) => ( 
            <PostCard
            key={post._id}
            id={post._id}
            title={post.title}
            content={post.content}
            coverImage={post.coverImage}
            galleryImages={post.galleryImages}
            date={post.createdAt}
          />
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default PostList

const PostCard = ({ id, title, content, coverImage, galleryImages, date }) => {
  const maxLength = 120; 
  
  const truncatedContent =
    content?.length > maxLength
      ? `${content?.slice(0, maxLength)}...`
      : content;

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/createpost", { state: { postId: id } });
  };

    return (
      <div className="rounded-[20px] border border-[3px] border-br_secondary">
        <h2 className="text-xl font-semibold mb-2 text-tx_primary w-full h-[40px] px-4 rounded-t-[20px]" 
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white", }}
        >{title}</h2>
        <div className="p-4">
          <p className="text-gray-400 mb-4 text-tx_primary">{truncatedContent}</p>
          <div className="grid grid-rows-1 grid-flow-col gap-4 w-[150px]">
            {galleryImages?.map((image, index) => (
              <img src={image} key={index} alt="blog_app_logo" className="w-[50px] h-[50px] object-fit" />
              ))}
            </div>
          <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
            <span className="text-tx_secondary">{moment(date).format('MMM Do YY, h:mm a')}</span>
            <div className="flex space-x-2">
            <button onClick={handleEdit} className="border border-br_primary border-[0.5px] rounded-[5px] hover:outline-none hover:ring-2 hover:ring-blue-400">🖊️</button>
              <button className="border border-br_primary border-[0.5px] rounded-[5px] hover:outline-none hover:ring-2 hover:ring-blue-400">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    );
  }