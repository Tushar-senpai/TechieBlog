import { useState } from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../../store/themeSlice";
import Logo from "../Logo";
import Searchbar from "./Searchbar.jsx";
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

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

  const handleNavigation = (slug) => {
    navigate(slug);
    setIsMenuOpen(false);
  };

  return (
    <header className="py-3 shadow bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black transition duration-300 animate-slide-down">
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
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="animate-fade-in-delayed">
                  <button
                    className="inline-block px-6 py-2 text-orange-600 dark:text-orange-400 font-semibold bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
                    onClick={() => handleNavigation(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            <li className="animate-fade-in-delayed">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="inline-block px-6 py-2 text-orange-600 dark:text-orange-400 font-semibold bg-yellow-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </button>
            </li>
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
              <ul className="mt-4 space-y-2 text-lg flex flex-col items-center">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        className="w-full text-left px-6 py-2 text-orange-600 font-semibold hover:bg-orange-200 rounded-lg transition-colors"
                        onClick={() => handleNavigation(item.slug)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
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