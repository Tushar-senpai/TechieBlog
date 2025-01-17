import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import TimeAgo from "../utils/TimeAgo";

function PostCard({ $id, title, featuredImage, $createdAt }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="block transition-transform duration-300 hover:scale-105"
    >
      <div className="w-[300px] h-[250px] relative"> {/* Add relative here */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg overflow-hidden h-full">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="object-cover w-full h-full rounded-t-xl"
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg md:text-xl font-semibold line-clamp-2 text-gray-800 dark:text-gray-100 truncate">
              {title}
            </h2>
          </div>
        </div>
        {/* TimeAgo Component */}
        <TimeAgo
          timestamp={$createdAt}
          className="text-gray-600 dark:text-gray-400 mt-2 text-sm"
        />
      </div>
    </Link>

  );
}

export default PostCard;
