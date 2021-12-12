import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const Navigation = () => {
  const { user } = useAuthContext();

  let guestNavigation = (
    <>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
    </>
  );

  let userNavigation = (
    <>
      <Nav.Link as={Link} to="/create">
        Create
      </Nav.Link>
      <Nav.Link as={Link} to="/dashboard/my-events/all">
        Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/logout">
        Logout
      </Nav.Link>
    </>
  );

  return (
    <Navbar collapseOnSelect className="navbar">
      <Navbar.Brand id="logo" href="/">
        aevent
      </Navbar.Brand>

      <Nav className="ms-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about-us">About Us</Nav.Link>
        <Nav.Link href="/catalog">Catalog</Nav.Link>
        {user.email ? userNavigation : guestNavigation}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
