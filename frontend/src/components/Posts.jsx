import { logo } from "../assets";


const Posts = () => {
  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-[90px] py-[40px]">
      <BlogPostCard title="Title 1" author="Author 1" date="Date 1" categories={['Cat 1', 'Cat 2']} />
      <BlogPostCard title="Title 2" author="Author 2" date="Date 2" categories={['Cat 1', 'Cat 3']} />
      <BlogPostCard title="Title 3" author="Author 3" date="Date 3" categories={['category 2', 'Cat 3']} />
    </section>
  );
};

export default Posts;


export const BlogPostCard = ({ title, author, date, categories }) => (
    <div className="rounded-[20px] p-4 border border-[3px] border-br_secondary">
      <div className="mb-4">
        <img src={logo} alt="blog_app_logo" className="w-full object-cover w-[400px] h-[180px]" 
          style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '0px' }}
      />
      </div>
      <h2 className="text-heading2 font-bold text-tx_primary">{title}</h2>
      <div className="flex justify-between text-tx_secondary">
      <p className="text-gray-400">By {author}</p>
      <p className="text-gray-400">{date}</p>
      </div>
      <div className="mt-2 flex space-x-2">
        {categories.map((category, index) => (
          <span key={index} className="px-3 py-1 bg-white rounded-[10px] text-xs">{category}</span>
        ))}
      </div>
    </div>
  );