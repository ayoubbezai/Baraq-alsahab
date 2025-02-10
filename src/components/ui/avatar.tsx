import React from "react";

export const Avatar = ({ src, alt }) => (
  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span>No Image</span>
    )}
  </div>
);
