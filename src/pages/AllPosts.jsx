import { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import Loading from '../components/loaders/Loading.jsx';

function AllPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await appwriteService.getPosts();
        if (posts) {
          setPosts(posts.documents);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='w-full py-8 min-h-screen bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black  transition-colors duration-300'>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center '>
            {posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;