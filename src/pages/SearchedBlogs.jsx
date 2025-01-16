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
        <div className="w-full py-8 min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 
            dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                {loading ? (
                    <div className="h-32 flex flex-col justify-center items-center gap-4">
                        <p>Did you know waiting makes blogs better?</p>
                        <PropagateLoader color="#ff6300" />
                    </div>
                ) : posts.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {posts.map((post) => (
                            <div key={post.$id} className="w-full flex justify-center">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No blogs found</p>
                )}
            </div>
        </div>
    )
}

export default SearchedBlogs