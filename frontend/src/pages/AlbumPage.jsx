import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import BackButton from "../components/BackButton";

const AlbumPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch album details
    axios
      .get(`http://127.0.0.1:8000/api/albums/${albumId}/`)
      .then((response) => setAlbum(response.data))
      .catch((error) => console.error("Error fetching album:", error));

    // Fetch photos in the album
    axios
      .get(`http://127.0.0.1:8000/api/albums/${albumId}/photos/`)
      .then((response) => setPhotos(response.data))
      .catch((error) => console.error("Error fetching photos:", error));
  }, [albumId]);

  return (
    <Container className="mt-4">
      {album ? (
        <>
          <h2 className="text-center">{album.title}</h2>
          <p className="text-center text-muted">
            Total Photos: {album.photo_count}
          </p>
          <Row>
            {photos.map((photo) => (
              <Col key={photo.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <Card>
                  <Link to={`/photos/${photo.id}`}>
                    <Card.Img
                      variant="top"
                      src={photo.image_url}
                      alt={photo.title}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{photo.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <p className="text-center">Loading album details...</p>
      )}
      <BackButton />
    </Container>
  );
};

export default AlbumPage;
