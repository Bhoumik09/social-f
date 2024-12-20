import axios from "axios";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
export const backend: string = "https://social-b-new.vercel.app";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LinearIndeterminate from "./Components/Header/Loader";
import Home from "./Components/Body/Home";
import ForgotPassword from "./Components/Auth/ForgotPassword";

export interface PostUser {
  _id: string; // Assume this is always returned by API
  username: string;
  likedPosts: string[];
  yourPosts: string[];
}

const App = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const [user, setUser] = useState<PostUser | null>(null); // Initialize as null
  const [loading, setLoadingState] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      if (token) {
        const { data } = await axios.get<{ userInfo: PostUser }>(`${backend}/fetch-user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });
        console.log(data);
        if (data.userInfo) {
          setUser(data.userInfo); // Ensure we set valid PostUser data
        }
      }
      setLoadingState(false);
    } catch (e) {
      console.error("Error fetching user:", e);
      setLoadingState(false); // Ensure loading stops even on error
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  useEffect(() => {
    if (user) {
      navigate("/home"); // Navigate to /home if user is available
    }
  }, [user]);

  if (loading) {
    return (
      <div className="absolute top-0 h-screen w-screen">
        <LinearIndeterminate />
      </div>
    );
  }

  // Fallback UI if user is null
  

  return (
    <div className="bg-neutral-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={user?<Home user={user} />:<Navigate to={'/'}/>} />
      </Routes>
    </div>
  );
};

export default App;
