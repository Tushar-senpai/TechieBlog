import React from 'react'
import { HashLoader } from 'react-spinners'

function Loading() {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <HashLoader />
        </div>
    )
}

export default Loading
