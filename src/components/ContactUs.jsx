import React from 'react';

const ContactUs = () => {
    return (
        <div className="mt-20 mb-28 max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>Contact Us</h1>
            <p className="mb-6 text-center text-gray-600">If you have any questions, feel free to reach out!</p>
            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">
                        Name:
                        <input type="text" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-300" />
                    </label>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">
                        Email:
                        <input type="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-300" />
                    </label>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">
                        Message:
                        <textarea name="message" className="mt-1 block w-full px-3 py-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-300"></textarea>
                    </label>
                </div>
                <button type="submit" className="btn-shadow w-full px-4 py-2 bg-orange-600 text-white font-semibold rounded-md shadow-sm hover:bg-orange-700 hover:text-shadow transition duration-300">
                    Send
                </button>
            </form>
        </div>
    );
}

export default ContactUs;
