import { useEffect, useState } from 'react';
import { getContributors } from '../components/contributors/contribution.js';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

function Contributors() {
    const [data, setData] = useState([]);
    const [showConfetti, setShowConfetti] = useState(true);
    const { width, height } = useWindowSize();

    const getData = async () => {
        const res = await getContributors({});
        if (res) {
            setData(res);
        }
    }

    useEffect(() => {
        getData();
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-orange-50 to-red-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen relative">
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={200}
                    colors={['#f97316', '#ea580c', '#FFB800', '#FF3D00']} // Orange theme colors
                />
            )}
            <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">Contributors</h1>
            <p className="text-lg mb-8 text-center">Meet the brilliant minds who brought this project to life!</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {data.map((item) => (
                    <a
                        key={item.id}
                        href={item.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center hover:transform hover:scale-105 transition-all duration-200 ease-in-out"
                    >
                        <div className="relative">
                            <img
                                src={item.avatar_url}
                                className="w-20 h-20 rounded-full border-2 border-gray-200 group-hover:border-orange-500 transition-colors duration-200"
                                alt={`${item.login}'s avatar`}
                            />
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[1.5rem] text-center">
                                {item.contributions}
                            </span>
                        </div>
                        <span className="mt-2 text-gray-700 font-medium group-hover:text-orange-500 transition-colors duration-200">
                            {item.login}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Contributors;