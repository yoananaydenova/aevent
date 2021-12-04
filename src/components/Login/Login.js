import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

import { Form, Button } from "react-bootstrap";

const Login = () => {
  const {login} = useContext(AuthContext)
  let history = useHistory();

  const onLoginHandler = (e) => {
    e.preventDefault();

    let form = e.target;
    let email = form.elements.email.value;
    let password = form.elements.password.value;


    authService.login(email, password).then((authData) => {
      // add data to context
      login(authData);

      history.push("/");
    }).catch( err => {
      //TODO: Show notification
      console.log(err);
    })
    

    
  };
  return (
    <Form className="login-form" onSubmit={onLoginHandler} method="POST">
      <Form.Text className="login-form-title">Log In</Form.Text>

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

      <Button className="login-form-btn" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
