import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../states/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login, currentUser } = useAuth();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

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
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4 text-gray-700 text-center'>Login</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        {message && <p className='text-green-500 text-center'>{message}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type="email"
            placeholder='Email'
            ref={emailRef}
            required
            className='w-full p-2 border rounded bg-transparent placeholder-gray-400 border-gray-400'
          />
          <input
            type="password"
            placeholder='Password'
            ref={passwordRef}
            required
            className='w-full p-2 border rounded bg-transparent placeholder-gray-400 border-gray-400'
          />
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400'
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
