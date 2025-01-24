import React from 'react';

const AboutUs = () => {
    return (
        <div className="p-[50px_20px] max-w-[900px] mx-auto font-sans bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white">
            <h1 className='text-center text-4xl text-orange-600 mb-5 pb-2.5 border-b-2 border-gray-500'>
                About TechieBlog
            </h1>
            <p className='text-xl leading-relaxed  mb-5 text-justify px-5'>
                Welcome to TechieBlog, your number one source for all things tech. 
                We're dedicated to providing you the very best of technology news, 
                reviews, and tutorials with an emphasis on quality and reliability.
            </p>
            <h2 className='text-center text-2xl mb-5 pb-2.5 border-b-2 border-gray-500'>
                Our Story
            </h2>
            <p className='text-xl leading-relaxed mb-5 text-justify px-5'>
                Founded in 2023, TechieBlog has come a long way from its beginnings in a home office.
                When we first started out, our passion for "cutting-edge technology" drove us to start 
                our own blog, so that TechieBlog can offer you the world's most advanced tech insights.
            </p>
            <h2 className='text-center text-2xl mb-5 pb-2.5 border-b-2 border-gray-500'>
                Our Mission
            </h2>
            <p className='text-xl leading-relaxed mb-5 text-justify px-5'>
                At TechieBlog, our mission is to provide accurate, up-to-date tech information and insightful analysis. We aim to:
            </p>
            <ul className='text-xl leading-relaxed mb-5 text-justify px-5'>
                <li><b>Educate:</b> Empower our readers with comprehensive guides and tutorials.</li>
                <li><b>Inform:</b> Deliver the latest news and trends in the tech world.</li>
                <li><b>Inspire:</b> Share innovative ideas and breakthroughs in technology.</li>
                <li><b>Engage:</b> Foster a community where tech enthusiasts can connect and share their passion.</li>
            </ul>
            <h2 className='text-center text-2xl mb-5 pb-2.5 border-b-2 border-gray-500'>
                Get In Touch
            </h2>
            <p className='text-xl leading-relaxed mb-5 text-justify px-5'>
                We'd love to hear from you! Here are some ways you can connect with us:
            </p>
            <ul className='text-xl leading-relaxed mb-5 text-justify px-5'>
                <li><b>Newsletter:</b> Subscribe to receive the latest updates directly to your inbox.</li>
                <li><b>Social Media:</b> Follow us on <a href="https://x.com/?lang=en" className='text-blue-600 hover:underline'>Twitter</a>, <a href="https://www.facebook.com/" className='text-blue-600 hover:underline'>Facebook</a>, and <a href="https://www.instagram.com/" className='text-blue-600 hover:underline'>Instagram</a> for real-time updates and engaging content.</li>
                <li><b>Contact Form:</b> Reach out to us through our <a href="#contact" className='text-blue-600 hover:underline'>Contact Page</a> for any inquiries or feedback.</li>
            </ul>
            <p className='text-2xl leading-loose font-bold mb-5 text-justify px-5'>
                We hope you enjoy our content as much as we enjoy offering it to you. 
                If you have any questions or comments, please don't hesitate to contact us.
            </p>
        </div>
    );
};

export default AboutUs;