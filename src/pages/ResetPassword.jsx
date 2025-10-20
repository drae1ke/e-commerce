import React, { useState, useEffect } from 'react'
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './CSS/reset-password.css'
import axiosClient from '../api/axiosClient'
import Toast from '../components/Toast'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams() // Change this line
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [toast, setToast] = useState({ visible: false, message: '', type: 'error' })
  const [submitting, setSubmitting] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)
  const [tokenValid, setTokenValid] = useState(true)

  useEffect(() => {
    if (!token) {
      setTokenValid(false)
      setToast({ 
        visible: true, 
        message: 'Invalid or missing reset token.', 
        type: 'error' 
      })
    }
  }, [token])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validatePassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),/.\-?":{}|<>]/.test(password);

    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: {
        minLength: password.length < minLength,
        noUpperCase: !hasUpperCase,
        noLowerCase: !hasLowerCase,
        noNumbers: !hasNumbers,
        noSpecialChar: !hasSpecialChar
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!token) {
      setToast({ visible: true, message: 'Invalid reset token.', type: 'error' })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setToast({ visible: true, message: 'Passwords do not match.', type: 'error' })
      return
    }

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      setToast({ 
        visible: true, 
        message: 'Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.', 
        type: 'error' 
      })
      return
    }

    try {
      setSubmitting(true)
      await axiosClient.post('/password/reset-password', {
        token,
        password: formData.password
      })
      
      setPasswordReset(true)
      setToast({ 
        visible: true, 
        message: 'Password reset successfully!', 
        type: 'success' 
      })
      
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to reset password. Please try again.'
      setToast({ visible: true, message, type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  if (!tokenValid) {
    return (
      <div className='reset-password-page'>
        <Toast 
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, visible: false }))}
        />
        <div className='reset-password-wrapper'>
          <div className='reset-password-container'>
            <div className='error-icon'>
              <FaLock />
            </div>
            <h2>Invalid Reset Link</h2>
            <p>The password reset link is invalid or has expired.</p>
            <Link to="/forgot-password" className='request-new-link'>
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (passwordReset) {
    return (
      <div className='reset-password-page'>
        <Toast 
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, visible: false }))}
        />
        <div className='reset-password-wrapper'>
          <div className='reset-password-container'>
            <div className='success-icon'>
              <FaCheckCircle />
            </div>
            <h2>Password Reset Successfully!</h2>
            <p>Your password has been updated. You will be redirected to the login page.</p>
            <Link to="/login" className='back-to-login'>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='reset-password-page'>
      <Toast 
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />
      <div className='reset-password-wrapper'>
        <div className='reset-password-container'>
          <div className='reset-password-header'>
            <div className='lock-icon'>
              <FaLock />
            </div>
            <h2>Reset Your Password</h2>
            <p>Enter your new password below.</p>
          </div>
          
          <form className='reset-password-form' onSubmit={handleSubmit}>
            <div className='input-group'>
              <div className='input-wrapper'>
                <FaLock className='input-icon' />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password" 
                  placeholder='Enter new password'
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

            <div className='input-group'>
              <div className='input-wrapper'>
                <FaLock className='input-icon' />
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword" 
                  placeholder='Confirm new password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required 
                />
                <button 
                  type="button" 
                  className='password-toggle'
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className='password-requirements'>
              <h4>Password Requirements:</h4>
              <ul>
                <li>At least 8 characters long</li>
                <li>Contains uppercase and lowercase letters</li>
                <li>Contains numbers</li>
                <li>Contains special characters</li>
              </ul>
            </div>

            <button type="submit" className='reset-password-button' disabled={submitting}>
              {submitting ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword