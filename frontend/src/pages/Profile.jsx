import { useEffect, useState } from "react";
import { IoCamera } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateProfile } from "../slices/user.slice";
import { logo } from "../assets";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const getValidationSchema = () => {
  return z.object({
    email: z.string().min(10, { message: "Email is required" }),
    name: z.string().min(3, { message: "Name is required" }),
    title: z.object().optional(),
    bio: z.object().optional(),
    profileImage: z.instanceof(File).optional(),
  });
};

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(getValidationSchema()),
    mode: "onSubmit",
  });

  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserById())
      .unwrap()
      .then((res) => {
        setValue("name", res.name);
        setValue("title", res.title);
        setValue("email", res.email);
        setValue("bio", res.bio);
        setProfileImage(res.profileImage);
      });
  }, [dispatch, setValue]);

  function submitForm(values) {
    console.log("Form Values:", values);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("bio", values.bio);

    if (typeof values.coverImage === "string") {
      formData.append("profileImage", values.profileImage);
    } else {
      formData.append("profileImage", values.profileImage);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Create new post
    dispatch(updateProfile(formData))
      .unwrap()
      .then(() => navigate("/listpost"));
  }

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
            <h1 className="text-2xl font-semibold">Profile</h1>
          </div>
        </div>
      </header>
      {loading ? (
        <div>loading</div>
      ) : (
        // <div className="w-full max-w-3xl px-6 py-8 mx-auto">
        <form
        className="w-full max-w-3xl px-6 py-8 mx-auto"
        onSubmit={handleSubmit(submitForm)}
      >

          <div className="mb-4 w-full flex justify-center items-center">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-[100px] h-[100px]  object-fit border border-[0.5px] border-br_primary rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center"
                />
              ) : (
                <div className="w-[100px] h-[100px]  object-fit border border-[0.5px] border-br_primary rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center"></div>
              )}
              <label
                htmlFor="profileImage"
                className="bg-white text-bg_tertiary p-1 rounded-md cursor-pointer absolute bottom-[1px] right-[0px]"
              >
                <IoCamera size={20} />
              </label>
            </div>
          </div>

          <Controller
            name="profileImage"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    console.log("Selected file:", file);
                    field.onChange(file);
                  }}
                />
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer"
                ></label>
              </>
            )}
          />
          {errors.profileImage && (
            <p className="text-tx_error">{errors.profileImage.message}</p>
          )}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="name"
              {...register("name")}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="title"
              {...register("title")}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="email"
              {...register("email")}
            />
            {errors.profileImage && (
              <p className="text-tx_error">{errors.profileImage.message}</p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Type anything..."
              className="w-full h-[150px] p-4 px-4 py-[5px] bg-[#00000066] border border-[0.5px] border-br_primary rounded-[10px] text-white w-[300px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="bio"
              {...register("bio")}
            />
          </div>
        {/* </div> */}
        <div className="flex justify-end items-center mb-6">
            <div className="space-x-4">
              <button
              type="submit"
                className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
