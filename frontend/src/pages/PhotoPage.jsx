import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";

const PhotoPage = () => {
  const { photoId } = useParams(); // Get photo ID from URL
  const [photo, setPhoto] = useState(null);
  const [newTitle, setNewTitle] = useState(""); // State for updating title
  const [isEditing, setIsEditing] = useState(false);

  // Fetch photo details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/photos/${photoId}/`)
      .then((response) => {
        setPhoto(response.data);
        setNewTitle(response.data.title); // Set title for editing
      })
      .catch((error) => console.error("Error fetching photo:", error));
  }, [photoId]);

  // Handle title update
  const handleUpdateTitle = () => {
    axios
      .patch(`http://127.0.0.1:8000/api/photos/${photoId}/`, {
        title: newTitle,
      })
      .then((response) => {
        setPhoto(response.data);
        setIsEditing(false); // Exit edit mode
      })
      .catch((error) => console.error("Error updating title:", error));
  };

  if (!photo) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Photo Details</h2>
      <img
        src={photo.image_url}
        alt={photo.title}
        style={{ maxWidth: "100%", height: "auto" }}
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
          style={{ cursor: "pointer", color: "blue" }}
        >
          {photo.title} (Click to edit)
        </h3>
      )}
      <BackButton />
    </div>
  );
};

export default PhotoPage;
