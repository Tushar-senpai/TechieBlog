import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {

    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8 min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 
        dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-300'>
            <Container>
                <div className='max-w-4xl mx-auto bg-yellow-50 dark:bg-gray-800 p-8 rounded-lg 
                shadow-lg transition-colors duration-300'>
                    <PostForm post={post} />
                </div>
            </Container>
        </div>
    ) : null
}

export default EditPost
