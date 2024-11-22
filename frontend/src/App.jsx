import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CreatePost, Home, Login, PostList, Profile, Signup } from "./pages";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <><ToastContainer />
    <Routes>
      <Route path="/listpost" element={<PostList />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/createpost" element={<CreatePost />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
    </>
  );
}

export default App;
