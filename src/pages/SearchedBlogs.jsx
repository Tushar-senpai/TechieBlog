import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { PropagateLoader } from 'react-spinners'

function SearchedBlogs() {
    const { slug } = useParams()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const getSearchedBlogs = async () => {
        try {
            const res = await appwriteService.getSearchedPosts(slug)
            if (res) {
                setPosts(res.documents)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSearchedBlogs()
    }, [slug, getSearchedBlogs])

    return (
        <div className='w-full py-8 min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 
    dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-300'>
            <Container>
                {loading ? (
                    <div className='h-32 flex flex-col justify-center items-center gap'>
                        <p >Did you know waiting makes blogs better?</p>
                        <PropagateLoader color="#ff6300" />
                    </div>
                ) : posts.length ? (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No blogs found</p>
                )}
            </Container>
        </div>
    )
}

export default SearchedBlogs
