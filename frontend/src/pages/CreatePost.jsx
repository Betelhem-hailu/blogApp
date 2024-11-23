import { useEffect, useState } from "react";
import { logo } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { createPost, getPostsbyId, getTags, updatePost } from "../slices/post.slice";

const getValidationSchema = (isUpdate = false) => {
  return z.object({
    title: z.string().min(10, { message: "Title is required" }),
    content: z.string().min(250, { message: "Content must be greater than 250 words" }),
    coverImage: isUpdate
      ? z.any().optional()
      : z.any().refine((file) => file instanceof File && file.size > 0, {
          message: "Cover image is required",
        })
  });
};

function CreatePost() {
  
  const location = useLocation();
  const postId = location.state?.postId;

  const isUpdate = !!postId;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm({
    resolver: zodResolver(getValidationSchema(isUpdate)),
    mode: "onSubmit",
  });


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.post);



  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [existingGallery, setExistingGallery] = useState([]);
  const [existingCoverImage, setExistingCoverImage] = useState(null);

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSelectedOptions((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  function submitForm(values, buttonValue) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("tags", JSON.stringify(selectedOptions));
    formData.append("status", buttonValue);
    
    if (typeof values.coverImage === "string") {
      formData.append("existingCoverImage", values.coverImage); 
    } else {
      formData.append("coverImage", values.coverImage); 
    }

    existingGallery?.forEach((image) => {
      formData.append("existingGalleryImages", image); 
    });
    values.gallery?.forEach((file) => {
      if (file instanceof File) {
        formData.append("galleryImages", file); 
      }
    });

    if (postId) {
      // Update existing post
      dispatch(updatePost({ postId, formData }))
        .unwrap()
        .then(() => navigate("/listpost"));
    } else {
      // Create new post
      dispatch(createPost(formData))
        .unwrap()
        .then(() => navigate("/listpost"));
    }
  }

  const handleButtonClick = (value) => (data) => submitForm(data, value);

  useEffect(() => {
    dispatch(getTags())
    .unwrap()
    .then((post) => {
      if (post?.tags) {
        setSelectedOptions(post.tags.map((tag) => tag.name)); // Pre-fill tags
      }
    });
    if (postId) {
      // Fetch post by id
      dispatch(getPostsbyId(postId))
      .unwrap()
      .then((post) => {
        setValue("title", post.title);
        setValue("content", post.content);
        setSelectedOptions(post.tags.map((tag) => tag.name)); 
        setExistingCoverImage(post.coverImage); 
        setExistingGallery(post.galleryImages); 
      });
    }
  }, [dispatch, postId, setValue]);

  return (
    <div className="bg-bg_primary min-h-[100vh] h-full">
      <header className="bg-five-color-gradient text-tx_primary h-[70px] shadow-header_shadow">
        <div className="flex justify-between items-center px-[90px] py-[10px]">
          <div className="flex gap-[15px] items-center">
            <Link to={"/"}>
              <img
                src={logo}
                alt="blog_app_logo"
                className="w-[50px] h-[50px] object-fit rounded-full"
              />
            </Link>
            <h1 className="text-2xl font-semibold">Add Post</h1>
          </div>
        </div>
      </header>
      <div className="w-full max-w-4xl px-6 py-8 mx-auto">
        <div className="flex justify-end items-center mb-6">
          <div className="space-x-4">
            <button
              value="draft"
              onClick={handleSubmit(handleButtonClick("draft"))}
              className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold"
            >
              Save
            </button>
            <button
              value="post"
              onClick={handleSubmit(handleButtonClick("post"))}
              className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold"
            >
              Post
            </button>
          </div>
        </div>
        <form className="space-y-2">
          <div className="mb-4 w-[700px]">
            <input
              type="text"
              placeholder="Title of the blog"
              className="w-full p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="title"
              {...register("title")}
            />
            {errors?.title && (
              <span className="text-tx_error">{errors.title.message}</span>
            )}
          </div>
          <div className="relative w-[700px]">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="z-99 p-2 cursor-pointer flex justify-between items-center bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] 
                text-white h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span>
                {selectedOptions.length > 0
                  ? selectedOptions.join(", ")
                  : "Select options"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {isOpen && (
              <div className="absolute top-[30px] z-9999 w-full bg-bg_primary border border-[0.5px] border-br_primary rounded-lg mt-2  text-tx_primary shadow-lg max-h-48 overflow-y-auto scroll-smooth custom-scrollbar">
                <div className="p-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Add a tag"
                      className="flex-grow text-black border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      Add
                    </button>
                  </div>
                </div>
                {data.map((option) => (
                  <div
                    key={option._id}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleOption(option.name)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.name)}
                      onChange={() => toggleOption(option.name)}
                      className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-gray-700">{option.name}</label>
                  </div>
                ))}
              </div>
            )}
            {errors?.tags && (
              <span className="text-tx_error">{errors.tags.message}</span>
            )}
          </div>

          <div className="mb-4 w-[700px]">
            <textarea
              placeholder="Type anything..."
              className="w-full custom-height p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="content"
              {...register("content")}
            />
            {errors?.content && (
              <span className="text-tx_error">{errors.content.message}</span>
            )}
          </div>

          <div className="mb-4 w-[700px]">
          {existingCoverImage && (
              <img src={existingCoverImage} alt="Cover" className="mb-2 h-20" />
            )}
            <Controller
              name="coverImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files[0])}
                  // value={post?.coverImage}
                  className="w-[700px] p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center"
                />
              )}
            />
            {errors.coverImage && (
              <p className="text-tx_error">{errors.coverImage.message}</p>
            )}
          </div>

          <div className="mb-4 w-[700px]">
            <label className="block text-sm font-semibold mb-2 text-tx_primary">
              Gallery Images (Select multiple)
            </label>
            <div className="flex flex-wrap gap-2">
              {existingGallery.map((image, index) => (
                <img key={index} src={image} alt={`Gallery ${index}`} className="h-20" />
              ))}
            </div>
            <Controller
              name="gallery"
              control={control}
              defaultValue={[]}
              render={({ field: { value, onChange } }) => (
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files); // Convert FileList to Array
                    onChange([...(value || []), ...files]); // Append new files to the existing array
                  }}
                  // value={post?.galleryImages}
                  className="w-[700px] p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center"
                />
              )}
            />
            {errors.gallery && (
              <p className="text-tx_error">{errors.gallery.message}</p>
            )}
          </div>

          {/* <button
            value="draft"
            onClick={handleSubmit(handleButtonClick("draft"))}
            className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold"
          >
            Save
          </button>
          <button
            value="post"
            onClick={handleSubmit(handleButtonClick("post"))}
            className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold"
          >
            Post
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
