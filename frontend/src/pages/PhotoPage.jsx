import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';

const PhotoPage = () => {
  const { photoId } = useParams(); // Get photo ID from URL
  const [photo, setPhoto] = useState(null);
  const [newTitle, setNewTitle] = useState(''); // State for updating title
  const [isEditing, setIsEditing] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch photo details
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/photos/${photoId}/`
        );
        setPhoto(response.data);
        setNewTitle(response.data.title); // Set title for editing
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    fetchPhoto();
  }, [photoId]);

  // Handle title update
  const handleUpdateTitle = async () => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/photos/${photoId}/`,
        {
          title: newTitle,
        }
      );
      setPhoto(response.data);
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  if (!photo) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Photo Details</h2>
      <img
        src={photo.image_url}
        alt={photo.title}
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleUpdateTitle}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <h3
          onClick={() => setIsEditing(true)}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          {photo.title} (Click to edit)
        </h3>
      )}
      <BackButton />
    </div>
  );
};

export default PhotoPage;
