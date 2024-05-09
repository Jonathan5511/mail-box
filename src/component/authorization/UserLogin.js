import { useRef } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { authActions } from "../../store/auth";

const UserLogin = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      alert("Please enter all details!!");
      return;
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtqAksUMVQaM5s-MzgcY17TKDUIkNN9b8",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "SignIn failed!!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.email);
        dispatch(authActions.login(data.idToken));
        dispatch(authActions.userMailId(data.email));

        history.replace("/welcome");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container
      style={{ margin: "10rem", marginLeft: "27rem", marginTop: "5rem" }}
    >
      <Card
        className="p-3 bg-dark text-light "
        style={{ borderRadius: "0.5rem", width: "30rem" }}
      >
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3 " controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailInputRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordInputRef}
            />
          </Form.Group>
          <div style={{ textAlign: "center" }} className="mb-3">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
        <div style={{ textAlign: "center" }}>
          <NavLink to="/">Don't have an account?</NavLink>
        </div>
      </Card>
    </Container>
  );
};

export default UserLogin;
