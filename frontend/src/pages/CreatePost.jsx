import { useState } from 'react';
import { logo } from '../assets';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const handleCoverImageUpload = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleGalleryUpload = (event) => {
    setGallery([...gallery, event.target.files[0]]);
  };

  return (
    <div className="bg-bg_primary min-h-[100vh] h-full">
        <header className="bg-five-color-gradient text-tx_primary h-[70px] shadow-header_shadow">
        <div className="flex justify-between items-center px-[90px] py-[10px]">
          <div className="flex gap-[15px] items-center">
            <img src={logo} alt="blog_app_logo" className="w-[50px] h-[50px] object-fit rounded-full" />
            <h1 className="text-2xl font-semibold">Add Post</h1>
          </div>
        </div>
      </header>
      <div className="w-full max-w-3xl px-6 py-8 mx-auto">
            <div className="flex justify-end items-center mb-6">
                <div className="space-x-4">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">Save</button>
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">Post</button>
                </div>
            </div>

            <div className="mb-4">
            <input
                type="text"
                placeholder="Title of the blog"
                className="w-full p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </div>

            <div className="mb-4">
            <textarea
                placeholder="Type anything..."
                className="w-full h-[330px] p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            </div>

            <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-tx_primary">Cover image</label>
            <input
                type="file"
                onChange={handleCoverImageUpload}
                className="hidden"
                id="coverImage"
            />
            <div className='w-full p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center'>
            <label htmlFor="coverImage" className="bg-bg_tertiary text-white px-4 py-1 rounded-md cursor-pointer">
                Upload +
            </label>
            </div>
            </div>

            <div className="mb-4">
            <p className="text-sm font-semibold mb-2 text-tx_primary">Add gallery of photos to your blog</p>
            <input
                type="file"
                onChange={handleGalleryUpload}
                className="hidden"
                id="galleryUpload"
            />
            <div className="flex space-x-4">
               <div className='w-[150px] h-[40px] p-4 px-4 py-[5px] flex items-center bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 '>
                  <label htmlFor="galleryUpload" className="bg-bg_tertiary text-white px-4 py-1 rounded-md cursor-pointer">
                  Upload +
                  </label>
                </div>
                <button
                  onClick={() => setGallery([...gallery, ''])}
                  className="bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-1"
                  >
                  Add More
                </button>
             </div>
            </div>
      </div>
    </div>
  );
}

export default CreatePost;
