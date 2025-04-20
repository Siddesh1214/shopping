import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/profileSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { clearCart } from "../redux/slices/cartSlice";


const Navbar = () => {
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);



  const handleLogout = async () => {
    dispatch(setUser(""));
    dispatch(setToken(""));
    dispatch(clearCart());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };


  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const linkClass = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";
  return (
    <nav className="p-4 fixed w-full bg-gray-100 z-50 shadow-md flex justify-between">
      <div className="flex gap-4">
        <Link to="/"className={linkClass("/")}>Logo</Link>
        {user && (
          <>
            <Link to="/cart" className={`relative ${linkClass('/cart')}`}>
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/orders" className={linkClass("/orders")}>Orders</Link>
          </>

        )}
      </div>
      <div>
        {!user ? (
          <>
            <Link to="/login" className={`mr-4 ${linkClass("/login")}`}>Login</Link>
            <Link to="/signup" className={linkClass("/signup")}>Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-red-500">Logout</button>
        )}
      </div>
    </nav>
    

  );
};

export default Navbar;
