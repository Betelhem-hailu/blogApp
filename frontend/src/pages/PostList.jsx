import { logo } from "../assets";
import { RiSearchLine } from "react-icons/ri";

const PostList = () => {
  return (
    <div className="bg-bg_primary min-h-[100vh] h-full">
      <header className="bg-five-color-gradient text-tx_primary h-[70px] shadow-header_shadow">
        <div className="flex justify-between items-center px-[90px] py-[10px]">
          <div className="flex gap-[15px] items-center">
            <img src={logo} alt="blog_app_logo" className="w-[50px] h-[50px] object-fit rounded-full" />
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
        <button className="bg-white text-gray-900 py-2 px-4 rounded-lg">Add +</button>
        
        <div className="mt-6 grid grid-cols-3 gap-[20px]">
          <PostCard
            title="Sample Title"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes mauris a gravida."
            date="Date"
          />
          <PostCard
            title="Sample Title"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes mauris a gravida."
            date="Date"
          />
          <PostCard
            title="Sample Title"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes mauris a gravida."
            date="Date"
          />
          <PostCard
            title="Sample Title"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes mauris a gravida."
            date="Date"
          />
        </div>
        
      </div>
    </div>
  )
}

export default PostList

const PostCard = ({ title, content, date }) => {
    return (
      <div className="rounded-[20px] border border-[3px] border-br_secondary">
        <h2 className="text-xl font-semibold mb-2 text-tx_primary bg-local w-full h-[40px] px-4" style={{ backgroundImage: `url(${logo})` }}>{title}</h2>
        <div className="p-4">
          <p className="text-gray-400 mb-4 text-tx_primary">{content}</p>
          <div className="grid grid-rows-1 grid-flow-col gap-4 w-[150px]">
            <img src={logo} alt="blog_app_logo" className="w-[50px] h-[50px] object-fit" />
            <img src={logo} alt="blog_app_logo" className="w-[50px] h-[50px] object-fit" />
            </div>
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <span className="text-tx_secondary">{date}</span>
           
            <div className="flex space-x-2">
              <button className="hover:text-white">🖊️</button>
              <button className="hover:text-white">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    );
  }