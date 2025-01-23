import React from 'react';

const ContactUs = () => {
    return (
        <div className="mt-20 mb-28 max-w-3xl mx-auto p-6 bg-white bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md rounded-md dark:text-white">
            <h1 className="text-3xl font-bold mb-6 text-center text-orange-600" >Contact Us</h1>
            <p className="mb-6 text-center">If you have any questions, feel free to reach out!</p>
            <form className="space-y-4">
                <div>
                    <label className="block font-medium">
                        Name:
                        <input type="text" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-300 dark:bg-gray-800" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium">
                        Email:
                        <input type="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-300 dark:bg-gray-800" />
                    </label>
                </div>
                <div>
                    <label className="block font-medium">
                        Message:
                        <textarea name="message" className="mt-1 block w-full px-3 py-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-300 dark:bg-gray-800"></textarea>
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
