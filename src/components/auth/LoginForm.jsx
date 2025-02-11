import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../states/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import logo from "../../assets/logo/logo english yellow.svg"

const LoginForm = () => {
  const { login, currentUser } = useAuth();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/dashboard");
  //   }
  // }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await login(email, password);
      setMessage("Account logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message.split("/")[1] || "Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className='flex justify-center items-center min-h-screen  bg-gray-100'>
      <div className='flex flex-col md:flex-row bg-primary py-6 px-2 md:p-6 mx-2 md:mx-6 shadow-lg rounded-lg'>
        <div className='flex  justify-center items-center w-1/2 mx-auto'>
          <img src={logo} alt="logo" className='w-40 md:w-72 md:h-64' />
        </div>

        <div className='   p-8 md:px-12 w-full max-w-md'>
          <h2 className='text-xl font-semibold mb-4 text-white text-center'>Login</h2>
          {error && <p className='text-red-500 text-center'>{error}</p>}
          {message && <p className='text-green-500 text-center'>{message}</p>}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type="email"
              placeholder='Email'
              ref={emailRef}
              required
              className='w-full p-2 border text-white rounded bg-transparent placeholder-gray-400 border-gray-400'
            />
            <input
              type="password"
              placeholder='Password'
              ref={passwordRef}
              required
              className='w-full p-2 border text-white rounded bg-transparent placeholder-gray-400 border-gray-400'
            />
            <Button
              type='submit'
              disabled={loading}
              className='w-full text-white font-semibold'
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
