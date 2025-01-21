import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaBlog } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is TechieBlog?",
      answer: "TechieBlog is your hub for the latest in technology and innovation. Stay updated with our latest posts, join the community, and share your knowledge.",
    },
    {
      question: "How often is new content published?",
      answer: "We strive to publish new content regularly. Typically, you can expect new articles to be posted at least once a week. Subscribe to our newsletter to stay updated on the latest posts."
    },
    {
      question: "How can I find a specific article?",
      answer: "To find a specific article, use the search bar located at the top of our website. Enter keywords related to the topic you're looking for, and a list of relevant articles will appear."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the signup link in the navbar and fill out the required information. You'll receive a confirmation email to activate your account."
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the forgot password link on the login page and follow the instructions. You'll receive a password reset email."
    },
    {
      question: "How can I submit a post?",
      answer: "First you need create your account. Then you can submit your post by clicking on the submit post button in the navbar. We welcome original, insightful content related to technology. Once your article is reviewed and approved, it will be published on our site."
    },
    {
      question: "How do I subscribe to the blog?",
      answer: "You can subscribe to our blog by entering your email address in the subscription box located at the bottom of our homepage. You'll receive regular updates and notifications about our latest posts directly to your inbox."
    },
    {
      question: "How can I contact the blog author?",
      answer: "If you have questions or feedback for a specific blog author, you can reach them through the \"Contact\" section. Each author has a dedicated profile page with their contact information and social media links."
    },
    {
      question: "How do I report a technical issue with the website?",
      answer: "To report a technical issue, please use the \"Support\" form available in the \"Contact\" section. Provide a detailed description of the issue, and our technical team will address it as soon as possible."
    }
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page min-h-screen p-6 sm:p-10 lg:p-20 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-orange-600 dark:text-orange-500 mb-10">
        Frequently Asked Questions
      </h1>
      <div className="faq-list space-y-6 max-w-4xl mx-auto">
        {questions.map((item, index) => (
          <div
            key={index}
            id={`faq-item-${index}`}
            className={`faq-item p-5 rounded-lg shadow-lg transition-all ${
              activeIndex === index
                ? "bg-orange-50 dark:bg-orange-900 border-orange-500"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
              aria-expanded={activeIndex === index}
            >
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">
                  {item.question}
                </h2>
              </div>
              {activeIndex === index ? (
                <FaChevronUp className="text-orange-500 transform transition-transform duration-300 rotate-180" />
              ) : (
                <FaChevronDown className="text-gray-400 dark:text-gray-500 transform transition-transform duration-300" />
              )}
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                activeIndex === index ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <p className="mt-3 text-gray-700 dark:text-gray-300 text-left leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
