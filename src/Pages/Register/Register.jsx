import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { Input, Button } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.min.css'
import './Register.scss'
import "bootstrap/dist/css/bootstrap.min.css"

const Register = ({token, setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
    if (getToken){
      navigate("/")   
    }
  }, [token, setToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (name === "") {
      alert("Name is required");
      return;
    }
    if (email !== "" && password !== "" && name !== "") {
      const data = {
        name,
        email,
        password,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/register`,
          data
        );
        if (result.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
                <>
                  <div className="Login d-flex justify-content-center text-center" >
                    <div className='submain mx-auto d-flex justify-content-center align-items-center flex-column min-vh-100'>
                      <h1 className='text-white align-items-center fs-1'>Register</h1>
                      <Input size="large" placeholder="Username" className='rounded-pill my-3' suffix={<UserOutlined />} maxLength={30} value={name}
                        onChange={(e) => setName(e.target.value)}/>
                      <Input size="large" placeholder="Email Adress" maxLength={30} className='rounded-pill my-3' suffix={<MailOutlined />} onChange={(e) => setEmail(e.target.value)} value={email}/>
                      <Input.Password placeholder="Password" size="large" className='my-3' maxLength={30} value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                      <div className="row">
                        <div className="col">
                        <Button onClick={ handleSubmit}>Register</Button>
                        </div>
                        <div className="col">
                        <GoogleLogin setToken={setToken} label="With Google"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
    </div>
  );
};

export default Register;