import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AlbumPage from "./pages/AlbumPage";
import PhotoPage from "./pages/PhotoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/albums/:albumId" element={<AlbumPage />} />
        <Route path="/photos/:photoId" element={<PhotoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
