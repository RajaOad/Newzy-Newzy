import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import DummyImage from './DummyImage';



const NewsCard = ({ title, description, imageUrl, time, source, url }) => {



  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      {imageUrl && !imageError ?(<img className="w-full h-48 object-cover" src={imageUrl} alt={title} onError={handleImageError} />) : (<DummyImage
  logoName="Newzy Newzy"
  textColor="#168eea"
  backgroundColor="#e2e8f0"
  width="100%"
  height="200px"
/>)
}

      <div className="px-6 py-4">
        <div className="flex items-center mb-2">
          <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 uppercase tracking-wide rounded-full mr-2">
            New
          </span>
          <FaClock className="text-gray-600 text-sm mr-1" />
          <span className="text-gray-600 text-xs">{time}</span>
        </div>

        <h3 className="text-gray-900 font-bold text-xl mb-2">{title}</h3>

        <p className="text-gray-700 text-sm">{description.substring(0, 100)}...</p>
      </div>

      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 uppercase tracking-wide rounded-full">
            {source}
          </span>
        </div>

        <a href={url} target='blank'><button className="text-blue-500 text-sm font-medium hover:text-blue-700 transition duration-200 ease-in-out">
          Read More
        </button></a>
   
      </div>
    </div>
 
    </>
  );
};

export default NewsCard;
