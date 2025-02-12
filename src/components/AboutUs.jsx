import React from 'react';

const AboutUs = () => {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start max-w-7xl mx-auto m-5 p-10 font-sans bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg dark:from-gray-900 dark:to-gray-800 dark:text-white">
            {/* Left Side - Animated GIF */}
            <div className="hidden md:block md:w-1/3 mt-20">
                <img 
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTRpbWJrNW9zcnZkdXk5M2llc3l3eGIxdmdxZnp4NDFpdmRibzV0MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif" 
                    alt="Tech GIF" 
                    className="w-full rounded-lg shadow-md"
                />
            </div>

            {/* Right Side - Content */}
            <div className="md:w-2/3 md:pl-10">
                <h1 className='text-center md:text-left text-5xl font-bold text-orange-600 mb-6 pb-3 border-b-4 border-gray-500'>
                    About TechieBlog
                </h1>
                <p className='text-lg leading-relaxed mb-6 text-justify'>
                    Welcome to <span className="font-semibold text-orange-500">TechieBlog</span>, your ultimate destination for all things tech. 
                    Our mission is to bring you the latest technology news, in-depth reviews, 
                    and insightful tutorials with a strong focus on accuracy and innovation.
                </p>

                <h2 className='text-center md:text-left text-3xl font-semibold mb-6 pb-3 border-b-4 border-gray-500'>
                    Our Story
                </h2>
                <p className='text-lg leading-relaxed mb-6 text-justify'>
                    Founded in <span className="font-bold text-orange-500">2023</span>, TechieBlog started as a passion project in a home office. 
                    Our love for cutting-edge technology inspired us to create a platform where enthusiasts, 
                    professionals, and learners can explore the world of tech together.
                </p>

                <h2 className='text-center md:text-left text-3xl font-semibold mb-6 pb-3 border-b-4 border-gray-500'>
                    Our Mission
                </h2>
                <p className='text-lg leading-relaxed mb-6 text-justify'>
                    We aim to provide our audience with reliable and up-to-date tech content by focusing on:
                </p>
                <ul className='text-lg leading-relaxed mb-6 text-justify space-y-3'>
                    <li><span className="font-bold text-orange-500">📘 Educate:</span> Empower readers with step-by-step tutorials and guides.</li>
                    <li><span className="font-bold text-orange-500">📰 Inform:</span> Keep you updated with the latest trends and innovations.</li>
                    <li><span className="font-bold text-orange-500">💡 Inspire:</span> Share breakthrough ideas and technological advancements.</li>
                    <li><span className="font-bold text-orange-500">💬 Engage:</span> Foster a thriving community of tech enthusiasts.</li>
                </ul>

                <h2 className='text-center md:text-left text-3xl font-semibold mb-6 pb-3 border-b-4 border-gray-500'>
                    Connect With Us
                </h2>
                <p className='text-lg leading-relaxed mb-6 text-justify'>
                    We’d love to hear from you! Get in touch with us through:
                </p>
                <ul className='text-lg leading-relaxed mb-6 text-justify space-y-3'>
                    <li><span className="font-bold text-orange-500">📩 Newsletter:</span> Subscribe to receive the latest updates.</li>
                    <li>
                        <span className="font-bold text-orange-500">🌍 Social Media:</span> Follow us on 
                        <a href="https://x.com/?lang=en" className='text-blue-600 hover:underline mx-1'>Twitter</a>, 
                        <a href="https://www.facebook.com/" className='text-blue-600 hover:underline mx-1'>Facebook</a>, and 
                        <a href="https://www.instagram.com/" className='text-blue-600 hover:underline mx-1'>Instagram</a>.
                    </li>
                    <li>
                        <span className="font-bold text-orange-500">📞 Contact Us:</span> Reach out via our 
                        <a href="#contact" className='text-blue-600 hover:underline ml-1'>Contact Page</a>.
                    </li>
                </ul>

                <p className='text-2xl font-semibold text-center md:text-left mt-8 text-orange-600'>
                    "Empowering You with Tech Knowledge, One Post at a Time!"
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
