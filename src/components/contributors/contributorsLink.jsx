import React, { useEffect, useState } from 'react';
import { getContributors } from "./contribution.js";
import { Link } from 'react-router-dom';

function ContributorsLink() {
    const [data, setData] = useState([]);
    
    const getData = async () => {
        const res = await getContributors({ perPage: 5 });
        if(res) {
            setData(res);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Link to="/contributors">
            {data ? (
                <div className="flex items-center">
                    <div className="flex -space-x-3">
                        {data.map((item) => (
                            <img 
                                src={item.avatar_url} 
                                key={item.id} 
                                className="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition-transform duration-200 ease-in-out"
                                alt={`${item.login}'s avatar`}
                            />
                        ))}
                    </div>
                    <span className="text-blue-600 hover:text-blue-800 font-medium">
                        +more
                    </span>
                </div>
            ) : (
                <p className="font-semibold my-5">Contributors</p>
            )}
        </Link>
    )
}

export default ContributorsLink;