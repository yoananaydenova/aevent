import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  useNotificationContext,
  types,
} from "../../contexts/NotificationContext";
import * as authService from "../../services/authService";
import useForm from "../../hooks/useForm";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const { login } = useAuthContext();
  const { addNotification } = useNotificationContext();
  let history = useHistory();

  const { handleChange, values, errors, handleSubmit } =
    useForm(onLoginHandler);

  function onLoginHandler() {
    authService
      .login(values.email, values.password)
      .then((authData) => {
        login(authData);
        addNotification("You logged in successfuly...", types.success);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        addNotification(
          err,
          types.error
        );
      });
  }
  return (
    <Form className="login-form" onSubmit={handleSubmit} method="POST">
      <Form.Text className="login-form-title">Log In</Form.Text>

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

      <Button className="login-form-btn" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
