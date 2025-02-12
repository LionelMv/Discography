import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, albumsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/users/`),
          axios.get(`${API_BASE_URL}/api/albums/`),
        ]);
        setUsers(usersResponse.data);
        setAlbums(albumsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Count albums per user
  const getAlbumCount = (userId) => {
    return albums.filter((album) => album.user === userId).length;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            <Link to={`/users/${user.id}`}>
              {user.name} - {getAlbumCount(user.id)} Albums
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
