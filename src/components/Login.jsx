import React, { useState } from 'react'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import axiosClient from '../api/axiosClient'
import Toast from './Toast'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    pwd: ''
  })
  const [toast, setToast] = useState({ visible: false, message: '', type: 'error' })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosClient.post('/auth', {
        email: formData.email,
        pwd: formData.pwd
      })
      const token = res?.data?.token || res?.data?.accessToken
      if (token) {
        localStorage.setItem('auth_token', token)
      }
      setToast({ visible: true, message: 'Login successful.', type: 'success' })
      setTimeout(() => navigate('/adminDashboard'), 500)
    } catch (err) {
      const message = err?.response?.data?.message || 'Invalid credentials. Please try again.'
      setToast({ visible: true, message, type: 'error' })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='login-page'>
      <Toast 
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />
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
                  name="pwd"
                  id="pwd" 
                  placeholder='Enter your password'
                  value={formData.pwd}
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
