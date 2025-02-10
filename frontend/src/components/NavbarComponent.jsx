import { useAuth } from "../AuthContext";
import { Navbar, Button, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    localStorage.setItem("loggedOut", "true"); // Set logout flag
    navigate("/");
  };

  //if (!user) return null; // Hide if not logged in

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Home
        </Navbar.Brand>

        {/* Add Navbar.Toggle for smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {user && (
              <Button variant="outline-light" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
