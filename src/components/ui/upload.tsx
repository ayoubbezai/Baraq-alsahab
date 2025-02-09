// src/components/ui/Upload.js

import { useState } from "react";
import toast from "react-hot-toast";

const Upload = ({ onUpload, maxFiles = 3, maxSize = 5 * 1024 * 1024 }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > maxFiles) {
      toast.error(`You can upload up to ${maxFiles} files.`);
      return;
    }

    const validFiles = files.filter((file) => file.size <= maxSize);
    if (validFiles.length !== files.length) {
      toast.error("Some files exceed the maximum size.");
    }

    setSelectedFiles(validFiles);
    onUpload(validFiles);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-800 border rounded-lg p-2"
      />
      <p className="text-sm text-gray-500 mt-2">
        {selectedFiles.length}/{maxFiles} images uploaded
      </p>
    </div>
  );
};

export { Upload };
