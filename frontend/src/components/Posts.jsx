/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import moment from "moment";


const Posts = ({data}) => {
  return (
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
  );
};

export default Posts;


export const BlogPostCard = ({ image, title, author, date, categories }) => (
    <div className="rounded-[20px] p-4 border border-[3px] border-br_secondary">
      <div className="mb-4">
        <img src={image} alt="blog_app_logo" className="w-full object-cover w-[400px] h-[180px]" 
          style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '0px' }}
      />
      </div>
      <h2 className="text-heading2 font-bold text-tx_primary">{title}</h2>
      <div className="flex justify-between text-tx_secondary">
      <p className="text-gray-400">By {author}</p>
      <p className="text-gray-400">{date}</p>
      </div>
      <div className="mt-2 flex space-x-2">
        {categories && categories.map((name, index) => (
          <span key={index} className="px-3 py-1 bg-white rounded-[10px] text-xs">{name}</span>
        ))}
      </div>
    </div>
  );