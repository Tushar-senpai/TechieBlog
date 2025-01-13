function Error404() {
    return (
        <div className='my-32 flex flex-col justify-center items-center'>
            <h1 className='text-5xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 transition duration-300'>Error: 404</h1>
            <p className='text-2xl my-2 text-gray-800 dark:text-gray-200 transition duration-300'>Page not found</p>
            <p className='text-lg lg:text-xl w-[80%] lg:w-[50%] mx-auto text-gray-600 dark:text-gray-400 transition duration-300'>
                The page you are looking for does not exist or has been moved
            </p>
        </div>
    )
}

export default Error404
