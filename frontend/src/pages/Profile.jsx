import { useState } from 'react';
import { logo } from '../assets';
import { IoCamera } from "react-icons/io5";

function Profile() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');

  const [bio, setBio] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleCoverImageUpload = (event) => {
    setCoverImage(event.target.files[0]);
  };


  return (
    <div className="bg-bg_primary min-h-[100vh] h-full">
        <header className="bg-five-color-gradient text-tx_primary h-[70px] shadow-header_shadow">
        <div className="flex justify-between items-center px-[90px] py-[10px]">
          <div className="flex gap-[15px] items-center">
            <img src={logo} alt="blog_app_logo" className="w-[50px] h-[50px] object-fit rounded-full" />
            <h1 className="text-2xl font-semibold">Profile</h1>
          </div>
        </div>
      </header>
      <div className="w-full max-w-3xl px-6 py-8 mx-auto">
            <div className="flex justify-end items-center mb-6">
                <div className="space-x-4">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">Save</button>
                </div>
            </div>

            <div className="mb-4 w-full flex justify-center items-center">
                <input
                    type="file"
                    onChange={handleCoverImageUpload}
                    className="hidden"
                    id="coverImage"
                />
                <div className='relative w-[100px] h-[100px] p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center'>
                <label htmlFor="coverImage" className="bg-white text-bg_tertiary p-1 rounded-md cursor-pointer absolute bottom-[1px] right-[0px]">
                <IoCamera size={20}/>
                </label>
                </div>
            
            </div>

            <div className="mb-4">
            <input
                type="text"
                placeholder="Name"
                className="w-full p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div className="mb-4">
            <input
                type="text"
                placeholder="Title"
                className="w-full p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </div>
            <div className="mb-4">
            <input
                type="email"
                placeholder="Email"
                className="w-full p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="mb-4">
            <textarea
                placeholder="Type anything..."
                className="w-full h-[150px] p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
            </div>
      </div>
    </div>
  );
}

export default Profile;
