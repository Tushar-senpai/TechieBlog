import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 min-h-60 
        hover:shadow-lg transition-all duration-300 hover:scale-[1.02] 
        dark:hover:shadow-gray-700">
        <div className="w-full justify-center mb-4">
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="rounded-xl object-cover w-full h-40" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 
          hover:text-orange-600 dark:hover:text-orange-400 
          transition-colors duration-300">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
