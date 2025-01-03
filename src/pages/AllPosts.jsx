import React , {useState ,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container , PostCard } from '../components'
import Loading from '../components/loaders/Loading.jsx'

function AllPosts() {
    const [loading ,setLoading] = useState(true)
    const [posts ,setPosts] =useState([])
    useEffect(()=> {
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
      
    },[])
    
  return (
    <div className='w-full py-8'>
     <Container>
       {loading ? (
        <Loading />
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
  )
}

export default AllPosts
