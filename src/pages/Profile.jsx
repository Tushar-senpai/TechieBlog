import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'
import { Avatar, Skeleton } from '@mui/material'
import PostCard from '../components/PostCard'

function Profile() {
    const user = useSelector(state => state.auth.userData)
    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const getBlogs = async() => {
        try {
            const response = await appwriteService.getPostsByUser(user.$id)
            if(response) {
                setError('')
                setBlogs(response.documents)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBlogs()
    }, [])

    const PostSkeleton = () => (
        <div className="p-2 w-full md:w-1/2 lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4">
                <Skeleton variant="rectangular" height={200} className="rounded-lg" />
                <Skeleton variant="text" height={32} className="mt-2" />
                <Skeleton variant="text" height={20} width="60%" />
            </div>
        </div>
    )
    
    return (
        <div className='min-h-screen bg-gray-50/50 p-4 sm:p-6 md:p-10'>
            <div className='max-w-7xl mx-auto'>
                <div className='bg-white shadow-md rounded-2xl overflow-hidden'>
                    {/* Header Banner */}
                    <div className='h-32 sm:h-48 bg-gradient-to-r from-orange-400 to-rose-400'></div>
                    
                    {/* Profile Info Section */}
                    <div className='px-6 sm:px-8 md:px-10 pb-6 -mt-16 sm:-mt-20'>
                        {loading ? (
                            <div className="flex flex-col items-center sm:items-start">
                                <Skeleton 
                                    variant="circular"
                                    width={120}
                                    height={120}
                                    className="border-4 border-white"
                                />
                                <div className="mt-4 text-center sm:text-left">
                                    <Skeleton variant="text" height={40} width="200px" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center sm:items-start">
                                <Avatar 
                                    className='border-4 border-white bg-orange-600 w-32 h-32 text-5xl shadow-lg'
                                >
                                    {user.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
                                    {user.name}
                                </h1>
                            </div>
                        )}
                    </div>
                </div>

                {/* Posts Section */}
                <div className='mt-8'>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
                        <span className="text-gray-500">{blogs.length} posts</span>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    <div className='flex flex-wrap -mx-2'>
                        {loading ? (
                            <>
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                            </>
                        ) : blogs.length > 0 ? (
                            blogs.map((post) => (
                                <div 
                                    key={post.$id} 
                                    className={`p-2 w-full md:w-1/2 lg:w-1/3 ${
                                        post.status === 'inactive' ? "opacity-50" : ""
                                    }`}
                                >
                                    <PostCard {...post} />
                                </div>
                            ))
                        ) : (
                            <div className="w-full bg-white rounded-xl p-8 text-center">
                                <p className="text-gray-500">No posts yet.</p>
                                <p className="text-gray-400 text-sm mt-1">Your published posts will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile