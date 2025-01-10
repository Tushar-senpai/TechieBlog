import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import Loading from '../components/loaders/Loading.jsx'

function AllPosts() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
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

  }, [])

  return (
    <div className='w-full py-8 min-h-screen bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-300'>
      <Container>
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {posts.length === 0 ? (
              <div className="w-full text-center text-gray-600 dark:text-gray-400">
                <p className="text-xl">No posts found</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.$id} className="w-full sm:w-1/2 lg:w-[32%] p-2">
                  <PostCard {...post} />
                </div>
              ))
            )}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
