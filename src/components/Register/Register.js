import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import * as authService from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  let history = useHistory();
  const { login } = useContext(AuthContext);

  const registerSubmitHandler = (e) => {
    e.preventDefault();

    let form = e.target;

    let firstName =form.elements.firstName.value; 
    let lastName =form.elements.lastName.value; 
    let email = form.elements.email.value;
    // TODO validate password and confirmPassword
    let password = form.elements.password.value;
    let confirmPassword = form.elements.confirmPassword.value;

    authService.register({firstName, lastName, email, password}).then((authData) => {
      console.log(authData)
      login(authData);
      history.push("/");
    });
  };


  return (
    <Form className="register-form" onSubmit={registerSubmitHandler} method="POST">
      <Form.Text className="register-form-title">Register</Form.Text>

      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Confirm password" />
      </Form.Group>

      <Button className="register-form-btn" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Register;
