import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deletePost, getPostsbyuserId, getTags } from "../slices/post.slice";

const PostList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const { data, tags } = useSelector((state) => state.post);

  console.log(search);
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPostsbyuserId({search, tag}));
  }, [dispatch, search, tag]);

  return (
    <div className="bg-bg_primary min-h-[100vh] h-full">
      <header className="bg-five-color-gradient text-tx_primary h-full md:h-[70px] shadow-header_shadow">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4 px-[30px] md:px-[90px] py-[10px]">
          <div className="flex gap-[15px] items-center">
            <Link to={"/"}>
              <img
                src={logo}
                alt="blog_app_logo"
                className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] object-fit rounded-full"
              />
            </Link>
            <h1 className="text-2xl font-semibold">POSTS</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search..."
                className="pl-[40px] md:pl-[80px] px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[100px] text-white w-full md:w-[300px] h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <RiSearchLine
                color="#59ACFF"
                size={30}
                width={10}
                className="absolute top-[10%] left-[10px]"
              />
            </div>
            <select
              onChange={(e) => setTag(e.target.value)}
              className="px-4 py-2 bg-bg_secondary text-white rounded border border-br_primary rounded-[15px] transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option
                value=""
                className="px-4 py-2 text-white rounded border border-br_primary hover:bg-glow focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                ALL
              </option>
              {tags &&
                tags.map((tag, index) => (
                  <option
                    key={index}
                    value={tag.name}
                    className="px-4 py-2 hover:bg-bg_additional cursor-pointer text-white rounded border border-br_primary  focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {tag.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </header>
      <div className="px-[30px] md:px-[90px] pt-[40px]">
        <Link to={"/createpost"}>
          <button className="bg-white text-gray-900 py-2 px-4 rounded-lg">
            Add +
          </button>
        </Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {data &&
            data.map((post) => (
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
  );
};

export default PostList;

const PostCard = ({ id, title, content, coverImage, galleryImages, date }) => {
  const maxLength = 120;

  const truncatedContent =
    content?.length > maxLength
      ? `${content?.slice(0, maxLength)}...`
      : content;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEdit = () => {
    navigate("/createpost", { state: { postId: id } });
  };

  const handleDelete = () => {
    console.log("Delete Post with id: ", id);
    dispatch(deletePost(id))
      .unwrap()
      .then(() => {});
  };

  return (
    <div className="rounded-[20px] border border-[3px] border-br_secondary">
      <h2
        className="text-xl font-semibold mb-2 text-tx_primary w-full h-[40px] px-4 rounded-t-[20px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        {title}
      </h2>
      <div className="p-4">
        <p className="text-gray-400 mb-4 text-tx_primary">{truncatedContent}</p>
        <div className="grid grid-rows-1 grid-flow-col gap-4 w-[150px]">
          {galleryImages?.map((image, index) => (
            <img
              src={image}
              key={index}
              alt="blog_app_logo"
              className="w-[50px] h-[50px] object-fit"
            />
          ))}
        </div>
        <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
          <span className="text-tx_secondary">
            {moment(date).format("MMM Do YY, h:mm a")}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="border border-br_primary border-[0.5px] rounded-[5px] hover:outline-none hover:ring-2 hover:ring-blue-400"
            >
              🖊️
            </button>
            <button
              onClick={handleDelete}
              className="border border-br_primary border-[0.5px] rounded-[5px] hover:outline-none hover:ring-2 hover:ring-blue-400"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
