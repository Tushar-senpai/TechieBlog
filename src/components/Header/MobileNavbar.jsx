import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusCircle, Layout } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentValue = () => {
    const path = location.pathname;
    if (path === '/all-posts') return 'posts';
    if (path === '/add-post') return 'create';
    return '';
  };

  return (
    <div className="md:hidden fixed z-50 bottom-0 left-0 right-0 border-t border-gray-200 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 transition duration-300 animate-slide-down">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate('/all-posts')}
          className={`flex flex-col items-center justify-center w-full h-full ${
            getCurrentValue() === 'posts' ? 'text-orange-600' : 'text-gray-600'
          }`}
        >
          <Layout className="h-6 w-6" />
          <span className="text-sm mt-1">Posts</span>
        </button>
        
        <button
          onClick={() => navigate('/add-post')}
          className={`flex flex-col items-center justify-center w-full h-full ${
            getCurrentValue() === 'create' ? 'text-orange-600' : 'text-gray-600'
          }`}
        >
          <PlusCircle className="h-6 w-6" />
          <span className="text-sm mt-1">Create</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;