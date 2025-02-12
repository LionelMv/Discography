import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch users
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch albums
    axios
      .get("http://127.0.0.1:8000/api/albums/")
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error("Error fetching albums:", error));
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
