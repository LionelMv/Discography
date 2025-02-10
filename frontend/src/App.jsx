import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AlbumPage from "./pages/AlbumPage";
import PhotoPage from "./pages/PhotoPage";
import PrivateRoute from "./components/PrivateRoute";
import NavbarComponent from "./components/NavbarComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/albums/:albumId"
          element={
            <PrivateRoute>
              <AlbumPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/photos/:photoId"
          element={
            <PrivateRoute>
              <PhotoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
