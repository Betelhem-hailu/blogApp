/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../slices/post.slice";

const Search = ({search, setSearch, setTag}) => {
  const dispatch = useDispatch();
  const {tags} = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  console.log()
  return (
    <section className="container mx-[90px] my-[30px]">
      <div className="flex space-x-4 items-center flex-wrap">
        <div className="relative">
        <input  value={search}
          onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..." className="pl-[80px] px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[100px] bg-gray-700 text-white w-[500px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <RiSearchLine color="#59ACFF" size={30} width={10} className="absolute top-[20%] left-[10px]" />
        </div>
        <button
        onClick={()=>setTag("")} 
        className="px-4 py-2 w-[100px] text-gray-800 bg-white font-secondary rounded-[15px] focus:outline-none hover:bg-glow transition duration-300 hover:text-tx_primary"
        >ALL</button>
{tags && tags.map((tag, index) => (
        <button key={index} onClick={()=>setTag(tag.name)} className="px-4 py-2 bg-gray-700 text-white rounded border border-br_primary rounded-[15px] hover:bg-glow transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">{tag.name}</button>
        ))}
        
      </div>
    </section>
  );
};

export default Search;
