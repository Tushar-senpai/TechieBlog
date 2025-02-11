import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";
import { User, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function PostCard({ $id, title, featuredImage, $createdAt, userId }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        if (userId) {
          const userData = await authService.getUserById(userId);
          setAuthor(userData);
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [userId]);

  return (
    <Link
      to={`/post/${$id}`}
      className="block transform transition-all duration-300 hover:scale-[1.02] hover:z-10 w-full"
    >
      <div className="w-full max-w-[340px] mx-auto h-[320px] sm:h-[320px] md:h-[400px] relative group">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden h-full 
          shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-lg
          hover:shadow-[0_8px_30px_rgba(255,165,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(255,165,0,0.15)]
          transition-all duration-300">
          <div className=" h-[200px] sm:h-[220px] md:h-[240px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"/>
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-700 
                group-hover:scale-110 group-hover:rotate-1"
            />
          </div>
          <div className="p-4 sm:p-5 md:p-6">
            <h2 className="text-lg sm:text-xl font-bold line-clamp-3 text-gray-800 dark:text-gray-100
              group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
              {title}
            </h2>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 
            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
        </div>
        {/* Bottom info bar */}
        <div className="absolute bottom-4 left-0 right-0 px-3 sm:px-4 flex justify-between items-center">
          {/* Author info */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium">
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate max-w-[100px] sm:max-w-[150px]">{author?.name || "Loading..."}</span>
          </div>
          {/* Time info */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate max-w-[100px] sm:max-w-[150px]">
              {formatDistanceToNow(new Date($createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;