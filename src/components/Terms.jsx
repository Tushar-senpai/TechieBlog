import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaExclamationCircle, FaBan, FaCheckCircle, FaLink, FaEdit, FaGavel } from 'react-icons/fa';
import termImg from '../assets/term.svg';

function Terms() {
  const tableOfContents = [
    { id: "terms", text: "Terms", icon: <FaBook /> },
    { id: "disclaimer", text: "Disclaimer", icon: <FaExclamationCircle /> },
    { id: "limitations", text: "Limitations", icon: <FaBan /> },
    { id: "accuracy", text: "Accuracy of Materials", icon: <FaCheckCircle /> },
    { id: "links", text: "Links", icon: <FaLink /> },
    { id: "modifications", text: "Modifications", icon: <FaEdit /> },
    { id: "governing-law", text: "Governing Law", icon: <FaGavel /> }
  ];
  return (
    <div className="container mx-auto p-6 lg:p-10">
      <h1 className='text-5xl font-extrabold mb-6 text-orange-600 dark:text-gray-100 text-center'>Terms & Conditions</h1>
      <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
        Welcome to TechieBlog, accessible at techieblog.com. By accessing and using this Blog, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </p>

      {/* First Row: Image and Table of Contents */}
      <div className="lg:grid lg:grid-cols-2 gap-10 mb-10 ">
        <motion.div 
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex justify-center items-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <img src={termImg} alt="Terms Illustration" className="w-96 h-auto rounded-lg" />
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-5">Table of Contents</h2>
          <ul className="list-none space-y-4">
            {tableOfContents.map((item) => (
              <li key={item.id} className="flex items-center space-x-3">
                <span className="text-orange-500 dark:text-orange-400 text-2xl">{item.icon}</span>
                <a href={`#${item.id}`} className="text-lg text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Full Width Content */}
      <motion.div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl space-y-8">
        {[
          { id: "terms", title: "1. Terms", text: "By accessing this website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws." },
          { id: "disclaimer", title: "2. Disclaimer", text: "The materials on TechieBlog's website are provided on an 'as is' basis. TechieBlog makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties." },
          { id: "limitations", title: "3. Limitations", text: "In no event shall TechieBlog or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption)." },
          { id: "accuracy", title: "4. Accuracy of Materials", text: "The materials appearing on TechieBlog's website could include technical, typographical, or photographic errors. TechieBlog does not warrant that any of the materials on its website are accurate, complete or current." },
          { id: "links", title: "5. Links", text: "TechieBlog has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site." },
          { id: "modifications", title: "6. Modifications", text: "TechieBlog may revise these terms of service for its website at any time without notice." },
          { id: "governing-law", title: "7. Governing Law", text: "These terms and conditions are governed by and construed in accordance with the laws of our country and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location." }
        ].map((section) => (
          <motion.div 
            key={section.id} 
            id={section.id} 
            className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">{section.title}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">{section.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Terms;