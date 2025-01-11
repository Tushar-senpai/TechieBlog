import { useState } from "react";
import { Container, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import Searchbar from "./Searchbar.jsx";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="py-3 shadow bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 transition duration-300 animate-slide-down">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <div className="animate-fade-in">
                <Logo width={50} />
              </div>
            </Link>

            {authStatus && <Searchbar />}
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex ml-auto space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="animate-fade-in-delayed">
                    <NavLink
                      className={({ isActive }) =>
                        `${
                          isActive && "bg-yellow-100 shadow-md"
                        } inline-block px-6 py-2 text-orange-600 font-semibold  hover:bg-orange-200 rounded-full transition-transform duration-300 hover:scale-105`
                      }
                      to={item.slug}
                      onClick={() => handleNavigation()}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <li className="animate-fade-in-delayed">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 ml-2 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon fontSize="large" className="text-orange-600" />
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="mt-4 py-2">
              <ul className="mt-4 space-y-6 text-lg flex flex-col items-center">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <NavLink
                          className={({ isActive }) =>
                            `${
                              isActive && "bg-orange-300"
                            } w-full text-left px-6 py-2 text-orange-800 font-semibold hover:bg-orange-200 rounded-lg transition-colors`
                          }
                          to={item.slug}
                          onClick={() => handleNavigation()}
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    )
                )}
                {authStatus && (
                  <li className="pt-2 border-t border-orange-200 text-red-500 font-semibold">
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
