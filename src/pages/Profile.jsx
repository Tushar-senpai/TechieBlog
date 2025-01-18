import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Avatar, Skeleton } from '@mui/material'
import PostCard from '../components/PostCard'
import authService from '../appwrite/auth'
import { CalendarDays, Mail } from 'lucide-react'
import { format } from 'date-fns'

function Profile() {
    const [user, setUser] = useState({})
    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const getUser = async() => {
        try {
            const res = await authService.getCurrentUser()
            if(res) {
                setUser(res)               
                getBlogs(user.$id)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

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
        getUser()
    }, [])

    const PostSkeleton = () => (
        <div className="p-2 w-full md:w-1/2 lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4">
                <Skeleton variant="rectangular" height={200} className="rounded-lg" />
                <Skeleton variant="text" height={32} className="mt-2" />
                <Skeleton variant="text" height={20} width="60%" />
            </div>
        </div>
    )
    
    return (
        <div className='min-h-screen bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-300 p-4 sm:p-6 md:p-10'>
            <div className='max-w-7xl mx-auto'>
                <div className='bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition-colors duration-300'>
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
                                    className="border-4 border-white dark:border-gray-800"
                                />
                                <div className="mt-4 text-center sm:text-left">
                                    <Skeleton variant="text" height={40} width="200px" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center sm:items-start">
                                <Avatar 
                                    className='border-4 border-white dark:border-gray-800 bg-orange-600 w-32 h-32 text-5xl shadow-lg'
                                >
                                    {user.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                    {user.name}
                                </h1>
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Mail className="w-4 h-4 mr-2" />
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <CalendarDays className="w-4 h-4 mr-2" />
                                        <span className="text-sm">
                                            Joined {format(new Date(user.$createdAt), 'MMMM yyyy')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Posts Section */}
                <div className='mt-8'>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Posts</h2>
                        <span className="text-gray-500 dark:text-gray-400">{blogs.length} posts</span>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-6">
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
                                    className={`p-2 w-full md:w-1/2 lg:w-1/3 place-items-center ${
                                        post.status === 'inactive' ? "opacity-50" : ""
                                    }`}
                                >
                                    <PostCard {...post} />
                                </div>
                            ))
                        ) : (
                            <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-8 text-center transition-colors duration-300">
                                <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Your published posts will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile