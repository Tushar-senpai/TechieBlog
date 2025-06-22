import { useState } from "react";
import { Container } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LogIn,
  UserPlus,
  Files,
  FileEdit,
  HelpCircle,
  MessageSquare,
  Info,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import Logo from "../Logo";
import Searchbar from "./Searchbar.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import BasicMenu from "./Menu.jsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleTheme } from "../../store/themeSlice";
import Sidebar from "./Sidebar.jsx";
import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: LogIn,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: UserPlus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: Files,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: FileEdit,
    },
    {
      name: "FAQ",
      slug: "/faq",
      active: true,
      icon: HelpCircle,
    },
    {
      name: "Feedback",
      slug: "/feedback",
      active: true,
      icon: MessageSquare,
    },
    {
      name: "About Us",
      slug: "/about-us",
      active: true,
      icon: Info,
    },
    {
      name: "Events",
      slug: "/events",
      active: true,
      icon: Calendar,
    },
    {
      name: "Contact Us",
      slug: "/contact-us",
      active: true,
      icon: Phone,
    },
  ];

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className="py-5 transition duration-300 rounded-md shadow-md backdrop-blur-md bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 dark:backdrop-blur-xl dark:border dark:border-white/10 dark:shadow-xl animate-slide-down dark:md:rounded-none dark:md:mx-0 dark:md:my-0 dark:py-4"
      >
        <Container>
          <nav className="flex justify-between gap-2 items-left">
            <div className="flex items-center space-x-2">
              <Link to="/">
                <div className="animate-fade-in">
                  <Logo width={70} />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="items-center justify-center hidden w-full space-x-8 md:flex">
              {authStatus && <Searchbar />}
              {!authStatus &&
                navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name} className="animate-fade-in-delayed">
                        <NavLink
                          className={({ isActive }) =>
                            `${isActive &&
                            "bg-yellow-100 dark:bg-white/10 dark:text-white shadow-md"
                            } relative group overflow-hidden inline-flex items-center gap-2 px-5 py-2 text-orange-600 font-bold hover:bg-orange-200 rounded-md transition-all duration-300 hover:scale-105 dark:text-gray-300 dark:hover:text-orange-500 dark:hover:bg-white/10 dark:font-medium dark:px-4 dark:py-2 dark:rounded-md`
                          }
                          to={item.slug}
                          onClick={() => handleNavigation()}
                        >
                          <span className="absolute left-0 block w-3 h-32 rotate-45 bg-opacity-0 bg-slate-100 group-hover:bg-opacity-35 group-hover:animate-waving-hand dark:hidden"></span>
                          <item.icon size={18} className="" />
                          {item.name}
                        </NavLink>
                      </li>
                    )
                )}
            </ul>

            <ul className="flex items-center justify-end space-x-5">
              <li className="animate-fade-in-delayed">
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="justify-end hidden px-2 py-2 ml-16 font-semibold text-orange-600 transition-transform duration-300 bg-yellow-100 rounded-full shadow-md sm:inline-block dark:text-white dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 hover:bg-orange-200 dark:hover:bg-white/20 dark:hover:border-white/30 dark:hover:text-orange-500 hover:scale-105"
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </button>
              </li>
              {authStatus && <BasicMenu />}
              {authStatus && <Sidebar isOpen={isSidebarOpen} />}
              {authStatus && (
                <button
                  className="text-orange-600 transition bg-yellow-100 rounded-full dark:bg-white/10 dark:text-white dark:backdrop-blur-md dark:border dark:border-white/20 hover:bg-orange-200 dark:hover:bg-white/20 dark:hover:border-white/30 dark:hover:text-orange-500"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              )}
            </ul>

            {/* Mobile Menu Button */}
            {!authStatus && (
              <button
                className="p-1 ml-2 transition-colors rounded-lg md:hidden dark:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <MenuIcon fontSize="large" className="text-orange-600 dark:text-white" />
              </button>
            )}
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="py-2 mt-4">
                <ul className="flex flex-col items-center mt-4 space-y-6 text-lg">
                  {navItems.map((item, index) =>
                    item.active && (
                      <li
                        key={item.name}
                        className={`${index < 3 ? "md:hidden" : ""}`}
                      >
                        <NavLink
                          className={({ isActive }) =>
                            `${isActive ? "bg-transparent border-orange-600 dark:border-white dark:text-white" : "border-transparent"} 
          w-full inline-flex items-center gap-2 px-6 py-2 text-orange-400 dark:text-gray-300
          font-semibold border hover:border-orange-500 dark:hover:border-white dark:hover:text-orange-500 rounded-lg transition-colors`
                          }
                          to={item.slug}
                          onClick={() => handleNavigation()}
                        >
                          <item.icon size={20} className="" />
                          {item.name}
                        </NavLink>
                      </li>
                    )
                  )}

                  <li className="animate-fade-in-delayed">
                    <button
                      onClick={() => dispatch(toggleTheme())}
                      className="inline-block px-2 py-2 mr-3 font-semibold text-orange-600 transition-transform duration-300 bg-yellow-100 rounded-full shadow-md dark:text-white dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 hover:bg-orange-200 dark:hover:bg-white/20 dark:hover:border-white/30 dark:hover:text-orange-500 hover:scale-105"
                    >
                      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </Container>
      </header>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400 dark:border-white/10"></div>
        </div>
      </div>
    </>
  );
}

export default Header;