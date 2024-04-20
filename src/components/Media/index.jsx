// MediaComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Import your CSS file

const MediaComponent = () => {
  const [mediaData, setMediaData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await axios.get('http://localhost:3002/media');
        console.log('Response data:', response.data.data); 
        setMediaData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter mediaData to include only images
  const imageMediaData = mediaData.filter(media => media.media_type === 'IMAGE');

  // Function to handle image selection
  const handleImageSelect = (id) => {
    const index = selectedImages.indexOf(id);
    if (index === -1) {
      setSelectedImages([...selectedImages, id]);
    } else {
      const newSelectedImages = [...selectedImages];
      newSelectedImages.splice(index, 1);
      setSelectedImages(newSelectedImages);
    }
  };

  // Function to handle selecting all images
  const handleSelectAllImages = () => {
    if (selectedImages.length === imageMediaData.length) {
      setSelectedImages([]);
    } else {
      const allImageIds = imageMediaData.map(media => media._id);
      setSelectedImages(allImageIds);
    }
  };

  // Function to handle POST request
  const handlePostImages = async () => {
    try {
        console.log('Selected Images:', selectedImages);
        // Get the selected image objects
        const selectedImageObjects = mediaData.filter(media => selectedImages.includes(media._id));
        console.log('selectedImageObjects>>>>>>>>>>>>', selectedImageObjects);

        // Extract media URLs and IDs from selected image objects
        const selectedMediaData = selectedImageObjects.map(media => ({
            id: media._id,
            url: media.media_url
        }));
        console.log('Selected Media Data:', selectedMediaData);

        // Make POST request with selected image data
        const response = await fetch('http://localhost:3002/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selectedMediaData: selectedMediaData
            }),
        });

        // Parse JSON response
        const responseData = await response.json();

        console.log('Upload response:', responseData);
        // Optionally handle response from server
    } catch (error) {
        console.error('Error uploading images:', error);
    }
};



  return (
    <div className="container">
      <div>
        <button onClick={handlePostImages}>Upload Selected Images</button>
        <button onClick={handleSelectAllImages}>
          {selectedImages.length === imageMediaData.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      {imageMediaData && imageMediaData.length > 0 ? (
        <div className="image-container">
          {imageMediaData.map((media, _id) => (
            <div className="image-card" key={_id}>
              <input
                type="checkbox"
                checked={selectedImages.includes(media._id)}
                onChange={() => handleImageSelect(media._id)}
              />
              <img src={media.media_url} alt={`Media ${media._id}`} />
            </div>
          ))}
        </div>
      ) : (
        <div>No image media available</div>
      )}
    </div>
  );
};

export default MediaComponent;
