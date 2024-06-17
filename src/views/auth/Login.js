import { Link } from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
// import { ToastContainer, toast } from 'react-toastify';

import gh from 'lg.png'
export default function Login() {
  const [loading, setloading]=useState(false);
  const [username, setusername] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password,setPassword] = useState("");
  const [isloading, setisloading]=useState(false);
  const baseURL = "https://app.savebills.com.ng/api/auth/signin";

  const btns = document.querySelectorAll('button');
  btns.forEach((items)=>{
    items.addEventListener('click',(evt)=>{
      evt.target.classList.add('activeLoading');
    })
  })
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange =(evnt)=>{
    setPasswordInput(evnt.target.value);
  }
  const togglePassword =()=>{
    if(passwordType==="password")
    {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const handleInputChange = (e) => {
    const {id , value} = e.target;

    if(id === "username"){
      setusername(value);
    }

    if(id === "password"){
      setPassword(value);
    }


  }
  const handleSubmit  = async () =>  {
      setisloading(true);
      setloading(true);

    try {
      axios
          .post(baseURL, {
            username:username,
            password:password,
          })
          .then(response => {
            setError("");
            setMessage(response);
            setloading(false);

            setisloading(false);
            if (response.data.status == "0") {
              setError(response.data.message);
              swal({
                title: "Ooops",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "OK",
              }).then(function () {
                // Redirect the user
                window.location.href = "/auth/login";
              });


            }else{
              setMessage(response.data.message);
              localStorage.setItem('dataKey', response.data.token);
              // const [cookies, setCookie] = useCookies(response.data.username);
           window.location.href='/dashboard';
            }
            // setPost(response.data);
          });
    }catch (e) {
      console.log(e);
      console.log("e.data");
      console.log(e.data);
      setError("An error occured. Check your input and try again");
    }
  }
  return (
    <>
      <div className="show-section">
        <section className="step1">
          <div className="step1-inner">
            <div className="container">
              <div className="wrapper">
                <div className="row">
                  <div className="col-md-7 pe-md-4">
                    <div className="row">
                      <div className="col-md-6 tab-100">

                        <div className="company">

                          <div className="company_logon text-center">
                            <img width="50" alt="avatar" src={gh}/>
                          </div>

                          <div className="company-name">
                            <h4>Admin Login</h4>
                            {/*<p>PAY BILLS</p>*/}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 tab-100">

                        <div className="form_tabs">
                          <div className="nav nav-tabs" id="form-tabs" role="tablist">

                            {/*<center>*/}
                            <button className="nav-link active" id="car-insurance-tab" data-bs-toggle="tab"
                                    data-bs-target="#car-tab" role="tab" aria-controls="car-tab" aria-selected="true">
                              Login
                            </button>
                            {/*</center>*/}
                            {/*<Link to="/auth/register" className="nav-link">*/}
                            {/*  Sign Up*/}
                            {/*</Link>*/}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-content" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="car-tab" role="tabpanel"
                           aria-labelledby="car-insurance-tab" tabIndex="0">
                        {loading ?<div className="overlay">
                              <div className="loader"></div>
                            </div>:
                            <form className="entrance_animation">

                              <div className="main-heading">
                                Admin
                                {/*<br/>*/}
                                {/*Pay Bills*/}
                              </div>
                              {/*<ToastContainer/>*/}

                              <br/>

                              <div>
                                <label className="label-text">Username</label>
                                <input className="form_input" type="text" name="username" placeholder="Username"
                                       value={username} onChange={(e) => handleInputChange(e)} id="username"
                                       required/>
                              </div>
                              <div>
                                <label className="label-text">Password</label>
                                <div
                                    style={{
                                      width: "auto",
                                      position: "relative",
                                      box_sizing: "border-box"
                                    }}>
                                  <input className="form_input" type={passwordType} name="password"
                                         value={password} onChange={(e) => handleInputChange(e)} id="password"
                                         required/>
                                  <i onClick={togglePassword} style={{
                                    position: "absolute",
                                    top: "28%",
                                    right: "4%"
                                  }} className={`fa ${passwordType === "password" ? "fa-eye-slash" : "fa-eye"}`}></i>

                                </div>
                              </div>

                              {/*<Link to="/auth/pass" className="forgot" href="">Forgotten Password?</Link>*/}
                              <div className="next-btn">
                                <button type="button" onClick={handleSubmit} className="btn btn-success">Login
                                </button>
                              </div>
                            </form>
                        }

                      </div>
                    </div>
                  </div>

                  <div className="col-md-5">

                    <div className="sidebar-slider">
                      <div id="sidebar-slide-2" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <div className="carousel-caption">

                              <img alt="slider" src={gh}/>

                              <span>
								      			SuperAdmin
								      		</span>

                            </div>
                          </div>
                          <div className="carousel-item">
                            <div className="carousel-caption">

                              <img alt="slider" src={gh}/>

                              <span>
								      			SuperAdmin
								      		</span>
                            </div>
                          </div>
                          <div className="carousel-item">
                            <div className="carousel-caption">

                              <img alt="slider" src={gh}/>

                              <span>
								      			SuperAdmin
								      		</span>

                            </div>
                          </div>
                        </div>

                        <div className="carousel-indicators">

                          <button type="button" data-bs-target="#sidebar-slide-2" data-bs-slide-to="0" className="active"
                                  aria-current="true" aria-label="Slide 1"></button>

                          <button type="button" data-bs-target="#sidebar-slide-2" data-bs-slide-to="1"
                                  aria-label="Slide 2"></button>

                          <button type="button" data-bs-target="#sidebar-slide-2" data-bs-slide-to="2"
                                  aria-label="Slide 3"></button>
                        </div>
                      </div>
                      {/*<div className="bg-shape">*/}
                      {/*  <img alt="slider" src={gh}/>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  );
}
