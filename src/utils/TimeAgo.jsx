import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";

function TimeAgo({ timestamp }) {
  if (!timestamp) {
    return null;
  }

  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 
      bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full
      text-gray-600 dark:text-gray-400 text-sm font-medium
      transform transition-all duration-300 group-hover:scale-105">
      <Clock className="w-4 h-4" />
      {timeAgo}
    </div>
  );
}

export default TimeAgo;
