import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios';

function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, albumsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/users/${userId}/`),
          axios.get(`${API_BASE_URL}/api/users/${userId}/albums/`),
        ]);

        setUser(userResponse.data);
        setAlbums(albumsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!user) return <div className="text-center mt-5">User not found.</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">{`${user.name}'s Albums`}</h2>
      <p className="text-center text-muted">{user.email}</p>

      {albums.length === 0 ? (
        <p className="text-center">No albums found.</p>
      ) : (
        <ul className="list-group">
          {albums.map((album) => (
            <li key={album.id} className="list-group-item">
              <Link to={`/albums/${album.id}`}>{album.title}</Link>
            </li>
          ))}
        </ul>
      )}

      <BackButton />
    </div>
  );
}

export default UserPage;
