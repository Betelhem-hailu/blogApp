import { RiSearchLine } from "react-icons/ri";
import { logo } from "../assets";
import { Footer, Nav } from "../components";
import { BiLike } from "react-icons/bi";
import { BlogPostCard } from "../components/posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../slices/post.slice";
import moment from "moment";
import { Link } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="bg-bg_primary min-h-[100vh] h-full">
      <Nav />
      <div>
        <section className="container mx-[90px] my-[30px]">
          <div className="flex space-x-4 items-center flex-wrap">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-[80px] px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[100px] bg-gray-700 text-white w-[500px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <RiSearchLine
                color="#59ACFF"
                size={30}
                width={10}
                className="absolute top-[20%] left-[10px]"
              />
            </div>
            <button className="px-4 py-2 w-[100px] text-gray-800 bg-white font-secondary rounded-[15px] focus:outline-none hover:bg-glow transition duration-300 hover:text-tx_primary">
              ALL
            </button>

            <button className="px-4 py-2 bg-gray-700 text-white rounded border border-br_primary rounded-[15px] hover:bg-glow transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Category 1
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded border border-br_primary rounded-[15px] hover:bg-glow transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Category 2
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded border border-br_primary rounded-[15px] hover:bg-glow transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Category 3
            </button>
          </div>
        </section>
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-[90px] py-[40px]">
          {data &&
            data.map((post, index) => (
              <Link key={index} to={`/post`} state={{ postId: post._id }}>
                <BlogPostCard  
                  image={post.coverImage}
                  title={post.title}
                  author={post.user.name}
                  date={moment(post.createdAt).format("DD/MM/YY")}
                  categories={post.tags.map((tag) => tag.name)}
                />
              </Link>
            ))}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
