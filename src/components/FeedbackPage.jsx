import React, { useState } from 'react';
import { motion } from 'framer-motion';

function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div 
      className='flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className='w-full max-w-4xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row'
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className='w-full md:w-1/2 flex items-center justify-center p-4'>
          <img src='https://www.pngkey.com/png/detail/83-839816_in1-solutions-feedback-feedback-from-presentation-clipart.png' alt='Feedback' className='w-full rounded-md shadow-md' />
        </div>
        <div className='w-full md:w-1/2 p-4'>
          {submitted ? (
            <motion.p 
              className='text-orange-600 text-2xl text-center'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you for your feedback!
            </motion.p>
          ) : (
            <motion.form 
              onSubmit={handleSubmit} 
              className='space-y-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className='text-4xl font-bold mb-6 text-orange-600 dark:text-gray-100'>Feedback</h1>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name...'
                required
                className='input-style'
              />
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your email...'
                required
                className='input-style'
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='input-style'
              >
                <option value='general'>General</option>
                <option value='bug'>Bug Report</option>
                <option value='feature'>Feature Request</option>
              </select>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder='Your feedback...'
                required
                className='input-style'
              />
              <div className='flex items-center space-x-4'>
                <span className='text-gray-900 dark:text-gray-100'>Rating:</span>
                <input
                  type='number'
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min='1'
                  max='5'
                  placeholder='1-5'
                  required
                  className='input-style'
                />
              </div>
              <motion.button
                type='submit'
                className='w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>
            </motion.form>
          )}
        </div>
      </motion.div>
      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          transition: all 0.3s ease-in-out;
        }
        .input-style:focus {
          outline: none;
          border-color: #ff7f50;
          box-shadow: 0px 0px 10px rgba(255, 127, 80, 0.5);
        }
        .input-style:hover {
          border-color: #ff7f50;
          box-shadow: 0px 0px 5px rgba(255, 127, 80, 0.3);
        }
      `}</style>
    </motion.div>
  );
}

export default FeedbackPage;
