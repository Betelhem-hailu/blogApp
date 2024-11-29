import { useLocation } from "react-router-dom";
import { logo } from "../assets";
import { Footer, Nav } from "../components";
import { BiLike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createComment, getPostsbyId, setNewComment } from "../slices/post.slice";
import moment from "moment";
import {socket} from "../utils/socket";

const Post = () => {
  const dispatch = useDispatch();
  const { post, comments } = useSelector((state) => state.post);
  const location = useLocation();
  const postId = location.state?.postId;
  
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (postId) {
      dispatch(getPostsbyId(postId)); // Fetch the post and initial comments
    }

    socket.emit("joinPost", postId); // Join the post-specific WebSocket room

    // Listen for real-time comments
    socket.on("newComment", (newComment) => {
      dispatch(setNewComment(newComment)); // Dynamically update Redux state with new comments
    });

    return () => {
      socket.off("newComment"); // Clean up the listener
    };
  }, [dispatch, postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ id: postId, message: comment }))
        .unwrap()
        .then(() => {
            setComment("");
        });
        socket.emit("newComment", comment);
    }

    if(post){
        console.log(post);
    }

  return (
    <div className="bg-bg_primary min-h-[100vh] h-full">
      <Nav />
      <div className="bg-bg_secondary min-h-[700px] mx-[80px] my-[40px] p-8 rounded-[20px] text-tx_primary">
        <h1
          className="text-center font-secondary text-heading_1 font-bold py-10 mb-2 text-tx_primary w-full h-[100px] px-4 rounded-t-[20px]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${post?.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          {post?.title}
        </h1>
        <p className="font-secondary text-[20px]">{post?.content}</p>
      </div>

      <div className="md:flex mx-[80px] my-[40px]">
        <div className="mx-[20px]">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-[10px] items-center">
              {post?.user?.profilePicture ? (
                <img
                  src={logo}
                  alt="blog_app_logo"
                  className="w-[50px] h-[50px] object-fit rounded-full"
                />
              ) : (
                <div className="cursor-pointer h-[50px] w-[50px] capitalize text-tx_primary text-heading_2 flex justify-center items-center rounded-full bg-bg_primary border border-br_primary focus:outline-none focus:ring-2 focus:ring-blue-400">
                  {post?.user?.name.substring(0, 1)}
                </div>
              )}
              <h2 className="font-secondary text-tx_primary">
                {post?.user.name}
              </h2>
            </div>
            <div className="flex gap-[5px] items-center">
              <h2 className="font-secondary text-tx_primary">324</h2>
              <BiLike color="white" size={25} />
            </div>
          </div>
          {/* comments */}
          <div className="text-tx_primary flex flex-col gap-[5px] w-full my-[5px]">
            <h2 className="text-heading_2">Comments</h2>
            <div className="flex flex-col gap-[10px] items-center">
                {comments?.map((comment, index) => (
            <div key={index} className="w-full">           
            <p>{comment?.user?.name}</p>
            <p>
              {comment?.message}
            </p>
            <p className="text-right">{moment(comment?.createdAt).format("DD/MM/YY")}</p>
            </div>
            ))}
            </div>

            <div className="relative">
                <form onSubmit={handleSubmit}>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
                className="bg-bg_secondary min-h-[60px] w-full px-4 py-[5px] rounded-[20px] text-tx_primary mt-[10px]"
              />
              <button type="submit" className="absolute bottom-[10%] right-[10px] py-[2px] bg-[#11003380] text-small text-tx_primary w-[60px] h-[30px] border border-[0.5px] border-[#59ACFF80] rounded-full">
                send
              </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mx-[20px] mt-[40px]">
          <h2 className="text-heading_1 text-tx_primary font-secondary font-bold mb-[10px]">
            Related Posts
          </h2>
          <section className="container mx-auto grid grid-cols-1 gap-4 w-[400px]">
            <RelatedPostCard title="Title 1" author="Author 1" />
            <RelatedPostCard title="Title 2" author="Author 2" />
            <RelatedPostCard title="Title 3" author="Author 3" />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;

const RelatedPostCard = ({ title, author }) => (
  <div className="rounded-[20px] p-4 border border-[3px] border-br_secondary">
    <div className="bg-gray-500  mb-4">
      <img
        src={logo}
        alt="blog_app_logo"
        className="w-full object-cover w-[400px] h-[180px]"
        style={{
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "0px",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "0px",
        }}
      />
    </div>
    <h2 className="text-heading2 font-bold text-tx_primary">{title}</h2>
    <div className="flex justify-between text-tx_secondary">
      <p className="text-gray-400">By {author}</p>
      <p className="text-gray-400">{"See More >>"}</p>
    </div>
  </div>
);
