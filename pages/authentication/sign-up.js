// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "../../layouts/AuthLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [progressbar, setProgressbar] = useState("w-30");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isHidden1, setIsHidden1] = useState(false);
  const [isHidden2, setIsHidden2] = useState(true);
  const [isHidden3, setIsHidden3] = useState(true);

  const [name, setName] = useState("");
  const [type, setType] = useState(0);
  const [address, setAddress] = useState("");
  const [webste, setWebste] = useState("");
  const [Social, setSocial] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [typeBusiness, setTypeBusiness] = useState([]);
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  console.log("Id nya", country);
  console.log("Id Value", type);
  console.log(name);
  console.log(type);
  console.log(country);
  console.log(address);
  console.log(webste);
  console.log(Social);
  console.log(email);
  console.log(password);
  console.log(confirmPassword);

  const handleNext = () => {
    if (!name || !country || !type) {
      setToastMessage("Semua harus di isi");
      setToastVisible(true);
    } else {
      setIsHidden1(true); // Form bergeser ke samping
      setIsHidden2(false);
      setIsHidden3(true);
      setProgressbar("w-75");
      setToastVisible(false);
    }
  };
  const handleNext2 = () => {
    console.log("Ceeeekk", webste, Social, address);
    if (!webste || !Social || !address) {
      setToastMessage("Semua harus di isi");
      setToastVisible(true);
    } else {
      setIsHidden1(true); // Form bergeser ke samping
      setIsHidden2(true);
      setIsHidden3(false);
      setProgressbar("w-100");
      setToastVisible(false);
    }
  };
  const back1 = () => {
    setIsHidden1(false); // Form bergeser ke samping
    setIsHidden2(true);
    setIsHidden3(true);
    setProgressbar("w-30");
    setToastVisible(false);
  };
  const back2 = () => {
    setIsHidden1(true); // Form bergeser ke samping
    setIsHidden2(false);
    setIsHidden3(true);
    setProgressbar("w-75");
    setToastVisible(false);
  };

  const togglePasswordVisibility = () => {
    setEye1((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setEye2((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const getTypeBussiness = async () => {
      try {
        const response = await axios.get(
          "https://api-es.alkisahcinema.com/api/business-type-list",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const value = await response.data;
        console.log(value);
        setTypeBusiness(value.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getCountry = async () => {
      try {
        const response = await axios.get(
          "https://api-es.alkisahcinema.com/api/country-list",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.data;
        setCountryList(data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTypeBussiness();
    getCountry();
  }, []);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleTypeChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !name ||
      !type ||
      !country ||
      !address ||
      !webste ||
      !Social ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setToastMessage("Semua harus di isi");
      setToastVisible(true);
    }
    setShow(false);

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api-es.alkisahcinema.com/api/auth/register",
        {
          name: name,
          type_id: type,
          country_id: country,
          address: address,
          website: webste,
          social: Social,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log(data.data);

      if (data.status) {
        window.location.href = "/authentication/sign-in";
        setStatus(data.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setToastMessage(error.response.data.message || "An error occurred");
      // alert(error.response.data.message || "An error occurred");
      setToastVisible(true);
      setShow(true);
      setLoading(false);
    }
  };
  return (
    <Row className="align-items-center  justify-content-center g-0 min-vh-100">
      {toastVisible && (
        <div
          className={`z-3 w-25 position-absolute end-0 top-0 ${
            status ? "bg-success" : "bg-danger"
          } m-4 rounded-2`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div style={{ padding: "10px" }} className={``}>
            <div class="toast-header ">
              <strong class={`me-auto text-light`}>
                {status ? "Success" : "Failed"}
              </strong>
              <small className="text-light">information</small>
              <button
                onClick={() => setToastVisible(false)}
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div class={`toast-body text-light`}>{toastMessage}</div>
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
              <h1 className="" style={{ fontWeight: "bold" }}>
                Register
              </h1>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            <Form onSubmit={handleSubmit}>
              <div
                className="progress mb-4"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className={`progress-bar bg-success transition-transform   ${progressbar}`}
                ></div>
              </div>
              {/* Username */}
              <div
                className={`w-100 transition-transform ${
                  isHidden1 ? "d-none" : ""
                }`}
              >
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Name of Business</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="username"
                    placeholder=""
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <select
                    className="form-select"
                    value={country}
                    onChange={handleCountryChange}
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    {countryList.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Type of Business</Form.Label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    {typeBusiness.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                <div className="d-flex justify-content-end mt-5">
                  <Button
                    variant="primary"
                    style={{ width: "100px" }}
                    onClick={handleNext}
                    className="bg-success border-0"
                  >
                    Next
                  </Button>
                </div>
              </div>

              <div className={`${isHidden2 ? "d-none" : ""}`}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Website (if any)</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setWebste(e.target.value)}
                    name="email"
                    placeholder="Enter address here"
                    required=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Social Media</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={Social}
                    onChange={(e) => setSocial(e.target.value)}
                    placeholder="Enter address here"
                    required=""
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Address</Form.Label>

                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </Form.Group>
                <div className="d-flex gap-4 justify-content-end">
                  <Button
                    className="bg-secondary border-0"
                    style={{ width: "100px" }}
                    variant="primary"
                    onClick={back1}
                  >
                    Back
                  </Button>
                  <Button
                    style={{ width: "100px" }}
                    variant="primary"
                    className="bg-success border-0"
                    onClick={handleNext2}
                  >
                    Next
                  </Button>
                </div>
              </div>

              <div className={`${isHidden3 ? "d-none" : ""}`}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="Enter address here"
                    required=""
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative border">
                    <Form.Control
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={`${eye1 ? "password" : "text"}`}
                      name="password"
                      placeholder="**************"
                      required=""
                    />
                    <svg
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                      className="position-absolute top-50 end-0 translate-middle"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      {eye1 ? (
                        <g>
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                          <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                        </g>
                      ) : (
                        <g>
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                        </g>
                      )}
                    </svg>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirm-password">
                  <Form.Label>Confirm Password</Form.Label>
                  <div className="position-relative border">
                    <Form.Control
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={`${eye2 ? "password" : "text"}`}
                      name="confirm-password"
                      placeholder="**************"
                      required=""
                    />
                    <svg
                      style={{ cursor: "pointer" }}
                      onClick={toggleConfirmPasswordVisibility}
                      className="position-absolute top-50 end-0 translate-middle"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye-slash"
                      viewBox="0 0 16 16"
                    >
                      {eye2 ? (
                        <g>
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                          <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                        </g>
                      ) : (
                        <g>
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                        </g>
                      )}
                    </svg>
                  </div>
                </Form.Group>

                <div className="d-flex gap-4 justify-content-end">
                  <Button
                    style={{ width: "100px" }}
                    className="bg-secondary border-0"
                    variant="primary"
                    onClick={back2}
                  >
                    Back
                  </Button>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "100px" }}
                    className="bg-success border-0"
                  >
                    {show && <span>Submit</span>}

                    {loading && (
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {/* <div>
             
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    {show && <span>Create Account</span>}

                    {loading && (
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-in" className="fs-5">
                      Already member? Login{" "}
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
              </div> */}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
