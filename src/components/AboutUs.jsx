import React from 'react';

const AboutUs = () => {
    return (
        <div className="about-container">
            <h1 className='aboutheading1'>About TechieBlog</h1>
            <p className='para'>
                Welcome to TechieBlog, your number one source for all things tech. 
                We're dedicated to providing you the very best of technology news, 
                reviews, and tutorials with an emphasis on quality and reliability.
            </p>
            <h2 className='aboutheading'>Our Story</h2>
            <p className='para'>
                Founded in 2023, TechieBlog has come a long way from its beginnings in a home office.
                When we first started out, our passion for "cutting-edge technology" drove us to start 
                our own blog, so that TechieBlog can offer you the world's most advanced tech insights.
            </p>
            <h2 className='aboutheading'>Our Mission</h2>
            <p className='para'>
                At TechieBlog, our mission is to provide accurate, up-to-date tech information and insightful analysis. We aim to:
            </p>
            <ul className='para'>
                <li><b>Educate:</b> Empower our readers with comprehensive guides and tutorials.</li>
                <li><b>Inform:</b> Deliver the latest news and trends in the tech world.</li>
                <li><b>Inspire:</b> Share innovative ideas and breakthroughs in technology.</li>
                <li><b>Engage:</b> Foster a community where tech enthusiasts can connect and share their passion.</li>
            </ul>
            <h2 className='aboutheading'>Get In Touch</h2>
            <p className='para'>
                We'd love to hear from you! Here are some ways you can connect with us:
            </p>
            <ul className='para get-in-touch'>
                <li><b>Newsletter:</b> Subscribe to receive the latest updates directly to your inbox.</li>
                <li><b>Social Media:</b> Follow us on <a href="https://x.com/?lang=en">Twitter</a>, <a href="https://www.facebook.com/">Facebook</a>, and <a href="https://www.instagram.com/">Instagram</a> for real-time updates and engaging content.</li>
                <li><b>Contact Form:</b> Reach out to us through our <a href="#contact">Contact Page</a> for any inquiries or feedback.</li>
            </ul>
            <p className='para1'>
                We hope you enjoy our content as much as we enjoy offering it to you. 
                If you have any questions or comments, please don't hesitate to contact us.
            </p>
        </div>
    );
};

export default AboutUs;
