import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Testimonials } from '../components'
import Loading from '../components/loaders/Loading.jsx'
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
// import { getPostsFromDatabase } from '../appwrite/config.js';
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the Appwrite service
        const response = await appwriteService.getPosts();

        if (response) {
          // Assuming `response.documents` contains the posts
          const sortedPosts = response.documents
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by `createdAt` descending
            .slice(0, 6); // Limit to 6 posts

          setPosts(sortedPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  if (posts.length === 0) {
    return (
      <div className="w-full text-center bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 
dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex flex-col 
justify-center animate-fade-in transition-colors duration-300">
        <div className="p-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-orange-600 
    dark:text-orange-400 tracking-tight animate-slide-in">
            Welcome to <span className="text-red-800 dark:text-red-400">TechieBlog</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg md:text-xl 
    animate-fade-in-delayed">
            Your hub for the latest in technology and innovation.
          </p>
          <Link
            to={"/signup"}
            className="bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg 
      shadow-md mt-6 inline-flex items-center gap-2 text-lg
      hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 
      transition-colors duration-300"
          >
            <span>Get Started</span>
            <LoginIcon />
          </Link>
        </div>

        <div className="mt-8 max-w-3xl mx-auto bg-white dark:bg-gray-800 
  shadow-lg rounded-lg p-8 animate-fade-up transition-colors duration-300">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 
    dark:text-gray-100">
            Subscribe to TechieBlog
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Get the latest posts delivered right to your inbox.
          </p>
          <form action="#" className="mt-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="youremail@example.com"
                className="w-full md:w-auto flex-1 rounded-lg border-gray-300 
          dark:border-gray-600 shadow-sm focus:ring focus:ring-orange-300 
          dark:focus:ring-orange-500 p-3 bg-white dark:bg-gray-700 
          text-gray-900 dark:text-gray-100 placeholder-gray-500 
          dark:placeholder-gray-400 transition-colors duration-300"
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-orange-600 
          dark:bg-orange-500 text-white font-semibold rounded-lg shadow-md 
          hover:bg-orange-700 dark:hover:bg-orange-600 
          transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 animate-fade-in-delayed">
          <img
            src="/assets/tech-blog-illustration.svg"
            alt="Tech Blog Illustration"
            className="mx-auto w-full max-w-md animate-bounce-slow 
      dark:opacity-90 transition-opacity duration-300"
          />
        </div>
        <Testimonials />
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gradient-to-b from-orange-50 to-red-100 
  dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen 
  transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-orange-600 dark:text-orange-400 
      mb-8 animate-slide-in">
          Latest Posts
        </h1>
        <div className='w-full py-8'>
          <Container>
            {loading ? (
              <div className="dark:bg-gray-900">
                <Loading />
              </div>
            ) : (
              <div className='flex flex-wrap'>
                {posts.map((post) => (
                  <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            )}
          </Container>
        </div>

        <div className="mt-16 animate-fade-in-delayed">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Join the Community
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Share your knowledge, write posts, and connect with like-minded tech enthusiasts.
          </p>
          <button className="mt-6 px-8 py-3 bg-orange-600 dark:bg-orange-500 
        text-white font-semibold rounded-lg shadow-md 
        hover:bg-orange-700 dark:hover:bg-orange-600 
        transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
