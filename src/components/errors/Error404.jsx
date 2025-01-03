import React from 'react'

function Error404() {
    return (
        <div className='my-32 flex flex-col justify-center items-center'>
            <h1 className='text-5xl lg:text-7xl font-bold'>Error: 404</h1>
            <p className='text-2xl my-2'>Page not found</p>
            <p className='text-lg lg:text-xl w-[80%] lg:w-[50%] mx-auto'>The page you are looking for does not exist or has been moved</p>
        </div>
    )
}

export default Error404
