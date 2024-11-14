
const Login = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg_primary">
        <div className="w-full max-w-sm p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-heading_1 font-primary text-center text-tx_primary ">Sign in</h2>
          
          <form className="space-y-2">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 text-tx_primary font-secondary placeholder-gray-400 bg-bg_primary border border-br_primary rounded-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 text-tx_primary font-secondary placeholder-gray-400 bg-bg_primary border border-br_primary rounded-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-gray-800 bg-white font-secondary rounded-[15px] hover:bg-gray-200 focus:outline-none hover:bg-glow transition duration-300 hover:text-tx_primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  