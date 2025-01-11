import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

function Searchbar() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const handlesubmit = (e) => {
        e.preventDefault()
        const slug = search.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
        navigate(`/search/${slug}`)

    }
    return (
        <form
            onSubmit={handlesubmit}
            className='flex items-center justify-center w-[full] md:w-auto border 
        border-orange-400 dark:border-orange-500 rounded-lg transition-colors duration-300'
        >
            <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search blogs'
                className='px-4 py-2 w-[70%] md:w-full bg-transparent outline-none 
            text-gray-800 dark:text-gray-200 
            placeholder-gray-500 dark:placeholder-gray-400 
            transition-colors duration-300'
            />
            <button
                className='px-2 py-2 rounded-tr-md rounded-br-md 
            hover:bg-orange-100 dark:hover:bg-gray-700 
            transition-colors duration-300'
                type='submit'
            >
                <SearchIcon className='text-orange-500 dark:text-orange-400' fontSize='medium' />
            </button>
        </form>
    )
}

export default Searchbar
