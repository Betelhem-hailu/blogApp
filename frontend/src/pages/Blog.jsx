import { logo } from "../assets"
import { Footer, Nav } from "../components"
import { BiLike } from "react-icons/bi";


const Blog = () => {
  return (
    <div className='bg-bg_primary min-h-[100vh] h-full'>
        <Nav />
        <div className="bg-bg_secondary min-h-[700px] mx-[80px] my-[40px] p-8 rounded-[20px] text-tx_primary">
            <h1 className="text-center text-heading_1 font-secondary font-bold py-10">TITLE OF THE BLOG</h1>
            <p className="font-secondary text-[20px]">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Montes mauris a gravida efficitur fames augue imperdiet sociosqu. Commodo primis eget id integer porta sociosqu, condimentum mus euismod. Bibendum eros condimentum senectus habitasse fringilla. Magna non per accumsan vehicula magna erat risus ipsum. Feugiat vehicula commodo mi molestie eleifend nec adipiscing. Nulla magna scelerisque tristique volutpat tempus commodo. Adipiscing suspendisse fusce ipsum, nulla libero sollicitudin curabitur. Cursus quis lacinia accumsan lacinia nulla finibus.
                <br /> <br/>
                Litora ad ante litora risus massa pulvinar praesent. Aliquam auctor tortor malesuada mi et ante pharetra. Tellus augue integer vestibulum quam ac imperdiet et. Ex fringilla nulla ligula aptent at hendrerit vivamus! Aenean accumsan commodo habitant habitant bibendum pharetra maecenas maecenas. Vestibulum porttitor etiam lacinia vestibulum torquent ac orci. Placerat hendrerit porta pharetra non ligula blandit ante. Et lobortis habitasse viverra vehicula tincidunt felis vitae. Fusce porta duis habitant nec ligula maecenas non lorem. Suspendisse nec fusce cras facilisi at congue maecenas.</p>
        </div>
        
        <div className="flex mx-[80px] my-[40px]">
            <div className="mx-[20px]">
                <div className="flex justify-between w-full items-center">
                    <div className="flex gap-[10px] items-center">
                        <img src={logo} alt="blog_app_logo" className="w-[50px] h-[50px] object-fit rounded-full" />
                        <h2 className="font-secondary text-tx_primary">Author</h2>
                    </div>
                    <div className="flex gap-[5px] items-center">
                        <h2 className="font-secondary text-tx_primary">324</h2>
                        <BiLike color="white" size={25}/>
                    </div>
                </div>
                <div className="text-tx_primary flex flex-col gap-[5px] w-full my-[5px]">
                    <h2 className="text-heading_2">Comments</h2>
                    <p>By Author</p>
                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Erat nibh laoreet consequat viverra parturient vestibulum? Erat eu integer nec aptent auctor inceptos.</p>
                    <p className="text-right">Date</p>
                    <div className="relative">
                        <input type="text" className="bg-bg_secondary min-h-[60px] w-full px-4 py-[5px] rounded-[20px] text-tx_primary mt-[10px]" />
                        <button className="absolute bottom-[10%] right-[10px] py-[2px] bg-[#11003380] text-small text-tx_primary w-[60px] h-[30px] border border-[0.5px] border-[#59ACFF80] rounded-full" >send</button>
                    </div>
                </div>
            </div>
            <div className="mx-[20px] mt-[40px]">
            <h2 className="text-heading_1 text-tx_primary font-secondary font-bold mb-[10px]">Related Posts</h2>
            <section className="container mx-auto grid grid-cols-1 gap-4 w-[400px]">
      <RelatedPostCard title="Title 1" author="Author 1"  />
      <RelatedPostCard title="Title 2" author="Author 2"  />
      <RelatedPostCard title="Title 3" author="Author 3"   />
    </section>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Blog

const RelatedPostCard = ({ title, author }) => (
    <div className="rounded-[20px] p-4 border border-[3px] border-br_secondary">
      <div className="bg-gray-500  mb-4">
  <img src={logo} alt="blog_app_logo" className="w-full object-cover w-[400px] h-[180px]" 
    style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '0px' }}
/>
</div>
      <h2 className="text-heading2 font-bold text-tx_primary">{title}</h2>
      <div className="flex justify-between text-tx_secondary">
      <p className="text-gray-400">By {author}</p>
      <p className="text-gray-400">{'See More >>'}</p>
      </div>
    </div>
  );