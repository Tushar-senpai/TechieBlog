import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import themeSlice from './themeSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice
  }
});
// Get the button element
const scrollToTopButton = document.getElementById("scrollToTop");

// Show the button when the user scrolls down 100px
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
};

// Scroll to the top when the button is clicked
scrollToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling
  });
});
export default store;