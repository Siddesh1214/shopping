import { useState } from "react";
import { auth, googleProvider, db } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/profileSlice";
import { FcGoogle } from "react-icons/fc";
import { setDoc, doc } from "firebase/firestore";
import { toast } from 'react-hot-toast';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const signUpFn = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(response.user.accessToken);
      await setDoc(doc(db, "users", response.user.uid), {
        email: response.user.email,
        ordersId: [],
        createdAt: response.user.metadata.createdAt
      });      
      toast.success("Sign up successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Sign up failed!");
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response.user.accessToken);
      dispatch(setUser(response.user));
      dispatch(setToken(response.user.accessToken));
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', JSON.stringify(response.user.accessToken));
      await setDoc(doc(db, "users", response.user.uid), {
        email: response.user.email,
        ordersId: [],
        createdAt: response.user.metadata.createdAt
      });

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google login failed!");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up with your account</h2>
        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 cursor-pointer rounded-lg transition duration-200"
            onClick={signUpFn}
          >
            SignUp
          </button>
          <div className="flex items-center justify-between">
            <div className="w-full border-t border-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 border cursor-pointer border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition duration-200"
            onClick={loginWithGoogle}
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>

  );
};

export default Login;
