import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
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
      <Nav.Link href="/">My Events</Nav.Link>
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
        <Nav.Link href="/about">About Us</Nav.Link>
        <Nav.Link href="/catalog">Catalog</Nav.Link>
        {user.email ? userNavigation : guestNavigation}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
