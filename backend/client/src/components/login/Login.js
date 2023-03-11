import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [loginUser, setLoginUser] = useState({});
  const [registerUser, setRegisterUser] = useState({});
  const history = useHistory();


  const handelOnChange_login = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };
  const handelOnChange_register = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("user/login", { ...loginUser });
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("user/register", { ...registerUser });
      alert(res.data.msg);
      window.location.href = "/login";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleRegisterClick = () => {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");
    var element1 = document.getElementById("login_title");
    var element2 = document.getElementById("register_title");
    element1.classList.remove("changecolor");
    element2.classList.add("changecolor");

    x.style.left = "-200%";
    y.style.left = "0";
    z.style.left = "50%";
  };
  const handleLoginClick = () => {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");
    var element1 = document.getElementById("login_title");
    var element2 = document.getElementById("register_title");
    element1.classList.add("changecolor");
    element2.classList.remove("changecolor");

    x.style.left = "0";
    y.style.left = "100%";
    z.style.left = "0";
  };
  const onClose = () => {
    history.goBack();
  };

  return (
    <section className="login section">
      <div className="login_container bd-grid">
        <div className="login_img"></div>
        <div className="login_box">
          <i class="bx bx-x close_icon" onClick={onClose}></i>

          <div className="login_form">
            <div className="form_titles">
              <div id="btn"></div>
              <a  className="changecolor" id="login_title" onClick={handleLoginClick}>
                LOGIN
              </a>
              <a id="register_title" onClick={handleRegisterClick}>
                REGISTER
              </a>
            </div>
            <form method="post" className="input_group" id="login">
              <input type="text" className="input_field" placeholder="Email Id" required name="email" value={loginUser.email} onChange={handelOnChange_login}></input>
              <input type="password" className="input_field" placeholder="Password" required name="password" value={loginUser.password} onChange={handelOnChange_login}></input>
              <a  type="submit" onClick={loginSubmit} className="button button_modify">
                Log In
              </a>
            </form>
            <form method="post" className="input_group" id="register">
              <input type="text" className="input_field" placeholder="Name" required name="name" value={registerUser.name} onChange={handelOnChange_register}></input>
              <input type="text" className="input_field" placeholder="Email Id" required name="email" value={registerUser.email} onChange={handelOnChange_register}></input>
              {/* <input type='number' className='input_field'  placeholder='Phone' required></input>  */}
              <input type="password" className="input_field" placeholder="Password" required name="password" value={registerUser.password} onChange={handelOnChange_register}></input>

              <a  type="submit" onClick={registerSubmit} className="button button_modify">
                Register
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
