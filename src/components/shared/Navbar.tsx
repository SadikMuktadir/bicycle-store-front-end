import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, useCurrentToken } from "@/redux/feacures/auth/authSlice";
import Cart from "../pages/public/Cart";

const Navbar = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <Link to="/">
            <div className="flex">
              <div className="mr-3 h-[40px] w-[40px]">
                <img src="https://i.ibb.co.com/ZzBftDwL/M.png" alt="" />
              </div>
              <div>
                <h1 className="text-[25px] font-bold">RideSphere</h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allProducts">All Products</Link>
            </li>
            <li>
              <Link to="/contactUs">Contact Us</Link>
            </li>
            <li>
              <Link to="/aboutUs">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {token ? (
            <div className="flex">
              <div className="mr-5 my-auto">
                <Cart></Cart>
              </div>
              <div>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex">
                <div className="mr-3">
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </div>
                <div>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
