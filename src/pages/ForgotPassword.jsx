import React, { useState } from 'react'
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './CSS/forgot-password.css'
import axiosClient from '../api/axiosClient'
import Toast from '../components/Toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState({ visible: false, message: '', type: 'error' })
  const [submitting, setSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setToast({ visible: true, message: 'Please enter your email address.', type: 'error' })
      return
    }

    try {
      setSubmitting(true)
      await axiosClient.post('/password/forgot-password', { email })
      setEmailSent(true)
      setToast({ 
        visible: true, 
        message: 'Password reset link sent to your email address.', 
        type: 'success' 
      })
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to send reset email. Please try again.'
      setToast({ visible: true, message, type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (emailSent) {
    return (
      <div className='forgot-password-page'>
        <Toast 
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, visible: false }))}
        />
        <div className='forgot-password-wrapper'>
          <div className='forgot-password-container'>
            <div className='success-icon'>
              <FaEnvelope />
            </div>
            <h2>Check Your Email</h2>
            <p>We've sent a password reset link to <strong>{email}</strong></p>
            <p className='check-spam'>Didn't receive the email? Check your spam folder or try again.</p>
            <div className='form-actions'>
              <button 
                onClick={() => setEmailSent(false)}
                className='resend-button'
              >
                Try Another Email
              </button>
              <Link to="/login" className='back-to-login'>
                <FaArrowLeft /> Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='forgot-password-page'>
      <Toast 
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />
      <div className='forgot-password-wrapper'>
        <div className='forgot-password-container'>
          <div className='forgot-password-header'>
            <div className='email-icon'>
              <FaEnvelope />
            </div>
            <h2>Forgot Password?</h2>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
          </div>
          
          <form className='forgot-password-form' onSubmit={handleSubmit}>
            <div className='input-group'>
              <div className='input-wrapper'>
                <FaEnvelope className='input-icon' />
                <input 
                  type="email" 
                  name="email"
                  id="email-id" 
                  placeholder='Enter your email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button type="submit" className='send-reset-button' disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className='back-to-login-section'>
            <Link to="/login" className='back-to-login'>
              <FaArrowLeft /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
