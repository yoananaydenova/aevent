import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  useNotificationContext,
  types,
} from "../../contexts/NotificationContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import * as authService from "../../services/authService";
import { useAuthContext } from "../../contexts/AuthContext";

const Register = () => {
  let history = useHistory();
  const { addNotification } = useNotificationContext();
  const { login } = useAuthContext();

  const { handleChange, values, errors, handleSubmit } =
    useForm(onRegisterHandler);

  function onRegisterHandler() {
    authService
      .register({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
      })
      .then((authData) => {
        login(authData);
        addNotification(
          "You registered and logged in successfully...",
          types.success
        );
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        addNotification(err, types.error);
      });
  }

  return (
    <Form className="register-form" onSubmit={handleSubmit} method="POST">
      <Form.Text className="register-form-title">Register</Form.Text>

      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First name"
          onChange={handleChange}
          required
        />
        {errors.firstName ? (
          <Alert variant="danger">{errors.firstName}</Alert>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last name"
          onChange={handleChange}
          required
        />
        {errors.lastName ? (
          <Alert variant="danger">{errors.lastName}</Alert>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
        {errors.email ? <Alert variant="danger">{errors.email}</Alert> : null}
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {errors.password ? (
          <Alert variant="danger">{errors.password}</Alert>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
          required
        />
        {errors.confirmPassword ? (
          <Alert variant="danger">{errors.confirmPassword}</Alert>
        ) : null}
      </Form.Group>

      <Button className="register-form-btn" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Register;
