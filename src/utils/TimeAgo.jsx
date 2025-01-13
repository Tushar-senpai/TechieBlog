import React from "react";
import { formatDistanceToNow } from "date-fns";

function TimeAgo({ timestamp }) {
  if (!timestamp) {
    return null;
  }

  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <div className="text-gray-500 text-sm absolute bottom-2 right-2">
      {timeAgo}
    </div>
  );
}

export default TimeAgo;
