import { RiSearchLine } from "react-icons/ri";

const Search = () => {
  return (
    <section className="container mx-[90px] my-[30px]">
      <div className="flex space-x-4 items-center flex-wrap">
        <div className="relative">
        <input type="text" placeholder="Search..." className="pl-[80px] px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[100px] bg-gray-700 text-white w-[500px] h-[70px] focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <RiSearchLine color="#59ACFF" size={50} width={10} className="absolute top-[10%] left-[10px]" />
        </div>
        <button 
        className="px-4 py-2 w-[100px] text-gray-800 bg-white font-secondary rounded-[15px] focus:outline-none hover:bg-glow transition duration-300 hover:text-tx_primary"
        >ALL</button>

        <button className="px-4 py-2 bg-gray-700 text-white rounded border border-br_primary rounded-[15px] hover:bg-glow transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">Category 1</button>
        <button className="px-4 py-2 bg-gray-700 text-white rounded border border-br_primary rounded-[15px] hover:bg-glow transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">Category 2</button>
        <button className="px-4 py-2 bg-gray-700 text-white rounded border border-br_primary rounded-[15px] hover:bg-glow transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">Category 3</button>
      </div>
    </section>
  );
};

export default Search;
