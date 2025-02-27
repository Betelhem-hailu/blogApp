import { RiSearchLine } from "react-icons/ri";
import { Footer, Nav } from "../components";
import { BlogPostCard } from "../components/posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts, getTags } from "../slices/post.slice";
import moment from "moment";
import { Link } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  const { data } = useSelector((state) => state.post);
  const { tags } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getTags());
    dispatch(getPosts({ search, tag }));
  }, [tag, search, dispatch]);

  console.log("data", data);
  return (
    <div className="bg-bg_primary min-h-[100vh] h-full">
      <Nav />
      <div>
        <section className="container px-[10px] md:px-[90px] my-[10px] md:my-[30px]">
          <div className="flex gap-2 items-center flex-col md:flex-row">
            <div className="relative mb-4 md:mb-0">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search..."
                className="pl-[40px] md:pl-[80px] px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[100px] bg-gray-700 text-white w-full md:w-[500px] h-[40px] md:h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <RiSearchLine
                color="#59ACFF"
                size={30}
                width={10}
                className="absolute top-[20%] left-[10px]"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setTag("")}
                className="px-4 py-2 w-[100px] text-gray-800 bg-white font-secondary rounded-[15px] focus:outline-none hover:bg-glow transition duration-300 hover:text-tx_primary"
              >
                ALL
              </button>
              {tags &&
                tags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setTag(tag.name)}
                    className="px-4 py-2 bg-gray-700 text-white rounded border border-br_primary rounded-[15px] hover:bg-glow transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {tag.name}
                  </button>
                ))}
            </div>
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
