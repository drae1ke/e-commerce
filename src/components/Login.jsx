import React, { useState } from 'react'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './login.css'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', formData)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='login-page'>
      <div className='login-wrapper'>
        <div className='login-container'>
          <div className='login-header'>
            <div className='user-icon'>
              <FaUser />
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>
          </div>
          
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='input-group'>
              <div className='input-wrapper'>
                <FaUser className='input-icon' />
                <input 
                  type="email" 
                  name="email"
                  id="email-id" 
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className='input-group'>
              <div className='input-wrapper'>
                <FaLock className='input-icon' />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password" 
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                <button 
                  type="button" 
                  className='password-toggle'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className='form-options'>
              <label className='remember-me'>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="forgot-password" className='forgot-password'>Forgot Password?</a>
            </div>

            <button type="submit" className='login-button'>
              Continue
            </button>
          </form>
        </div>

        <div className='signup-link'>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
