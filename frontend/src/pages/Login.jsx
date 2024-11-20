import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../slices/user.slice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email('Invalid email address').min(1,{message: 'Email is required'}),
  password: z.string().min(1, {message: 'Password is required'}),
});

const Login = () => {
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
    dispatch(login({email: data.email, password: data.password}))
    .unwrap()
          .then(() => {
            navigate("/");
          });
  }

    return (
      <div className="flex items-center justify-center min-h-screen bg-bg_primary">
        <div className="w-full max-w-sm p-8 space-y-6 bg-gray-900 rounded-lg shadow-header_shadow">
          <h2 className="text-heading_1 font-primary text-center text-tx_primary ">Sign in</h2>
          
          <form className="space-y-2" onSubmit={handleSubmit(submitForm)}>
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
            </div>
            {errors?.password && <span className="text-tx_error">{errors.password.message}</span>}
            <button
              type="submit"
              className="w-full px-4 py-2 text-gray-800 bg-white font-secondary rounded-[15px] hover:bg-gray-200 focus:outline-none hover:bg-glow transition duration-300 hover:text-tx_primary"
            >
              Login
            </button>
          </form>
          <p className="text-tx_primary font-secondary">{`Don't have an account? `}<Link to={"/register"} className="text-tx_link underline">Sign up</Link>{` here`}</p>
        </div>
      </div>
    );
  };
  
  export default Login;
  