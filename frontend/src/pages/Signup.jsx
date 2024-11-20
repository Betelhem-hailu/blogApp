import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { userRegister } from "../slices/user.slice";
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = z.object({
  name: z.string().min(3, {message: 'Name is should be at least 3 characters'}),
  email: z.string().email('Invalid email address').min(1,{message: 'Email is required'}),
  password: z
  .string()
  .min(8, { message: "Password is too short" })
  .max(20, { message: "Password is too long" }),
confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
message: "Passwords do not match",
path: ["confirmPassword"],
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(validationSchema),
    mode: "all"
  });

  function submitForm(data) {
    const user = {name: data.name, email: data.email, password: data.password};
    dispatch(userRegister(user))
    .unwrap()
          .then(() => {
            navigate("/login");
          });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg_primary">
      <div className="w-full max-w-sm p-8 space-y-6 bg-gray-900 rounded-lg shadow-header_shadow">
        <h2 className="text-heading_1 font-primary text-center text-tx_primary ">Sign Up</h2>
        
        <form className="space-y-2" onSubmit={handleSubmit(submitForm)}>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              {...register('name')}
              className="w-full px-4 py-2 text-tx_primary font-secondary placeholder-gray-400 bg-bg_primary border border-br_primary rounded-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.name && <span className="text-tx_error">{errors.name.message}</span>}
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              {...register('email')}
              className="w-full px-4 py-2 text-tx_primary font-secondary placeholder-gray-400 bg-bg_primary border border-br_primary rounded-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.email && <span className="text-tx_error">{errors.email.message}</span>}
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              {...register('password')}
              className="w-full px-4 py-2 text-tx_primary font-secondary placeholder-gray-400 bg-bg_primary border border-br_primary rounded-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.password && <span className="text-tx_error">{errors.password.message}</span>}
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              {...register('confirmPassword')}
              className="w-full px-4 py-2 text-tx_primary font-secondary placeholder-gray-400 bg-bg_primary border border-br_primary rounded-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors?.confirmPassword && <span className="text-tx_error">{errors.confirmPassword.message}</span>}
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-gray-800 bg-white font-secondary rounded-[15px] hover:bg-gray-200 focus:outline-none hover:bg-glow transition duration-300 hover:text-tx_primary"
          >
            Sign Up
          </button>
        </form>
        <p className="text-tx_primary font-secondary">{`Already have an account? `}<Link to={"/login"} className="text-tx_link underline">Login</Link>{` here`}</p>
      </div>
    </div>
  );
};

export default Signup;
