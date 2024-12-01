import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useRouter } from "next/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShow(false);

    setLoading(true);

    try {
      const response = await axios.post(
        `https://api-es.alkisahcinema.com/api/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      console.log(data.status);
      setStatus(data.status);

      if (data.status) {
        router.push("/");
        window.location.href = "/";
        sessionStorage.setItem("token", data.token);
      }
    } catch (error) {
      setShow(true);
      console.error("Error:", error.message);
      setToastMessage(error.message || "An error occurred");
      setToastVisible(true);
    } finally {
      setShow(true);
      setLoading(false);
    }
  };

  return (
    <Row
      style={{ container: "none" }}
      className="align-items-center justify-content-center g-0 min-vh-100"
    >
      {toastVisible && (
        <div
          class="z-3 d-flex justify-content-end"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={`w-25 `}>
            <div class="toast-header ">
              <strong
                class={`me-auto ${status ? "text-success" : "text-danger"}`}
              >
                {status ? "Success" : "Failed"}
              </strong>
              <small>information</small>
              <button
                onClick={() => setToastVisible(false)}
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div
              class={`toast-body ${status ? "text-success" : "text-danger"}`}
            >
              {toastMessage}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          backgroundImage: 'url("/images/bg-auth.avif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          container: "none",
          width: "100%",
          position: "absolute",
        }}
      ></div>
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <h1 className="bold">Login</h1>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            <Form onSubmit={handleSubmit}>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="username"
                  placeholder="Enter address here"
                  required
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="**************"
                  required
                />
              </Form.Group>

              {/* Checkbox */}
              <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" id="rememberme">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>Remember me</Form.Check.Label>
                </Form.Check>
              </div>
              <div>
                {/* Button */}
                <div
                  style={{ backgroundColor: "color: rgb(22 163 74)" }}
                  className="d-grid"
                >
                  <Button type="submit" className="btn btn-success">
                    {show && <span>Sign In</span>}

                    {loading && (
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link
                      href="/authentication/sign-up"
                      className="fs-5 text-success"
                    >
                      Create An Account{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/authentication/forget-password"
                      className="text-inherit fs-5"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
