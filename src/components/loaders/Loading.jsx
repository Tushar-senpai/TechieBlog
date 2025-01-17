import React from 'react'
import { HashLoader } from 'react-spinners'

function Loading() {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <HashLoader color='#ff7402' />
        </div>
    )
}

export default Loading
