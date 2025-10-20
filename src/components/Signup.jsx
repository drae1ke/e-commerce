import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import axiosClient from '../api/axiosClient'
import Toast from './Toast'

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        user: '',
        email: '',
        pwd: '',
        confirmPassword: ''
    })
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [toast, setToast] = useState({ visible: false, message: '', type: 'error' })
    const [submitting, setSubmitting] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!termsAccepted) {
            setToast({ visible: true, message: 'Please accept Terms and Privacy Policy.', type: 'error' })
            return
        }
        if (formData.pwd !== formData.confirmPassword) {
            setToast({ visible: true, message: 'Passwords do not match.', type: 'error' })
            return
        }
        try {
            setSubmitting(true)
            const payload = { user: formData.user, email: formData.email, pwd: formData.pwd }
            const response = await axiosClient.post('/register', payload)
            // success: navigate to login and maybe show success toast
            setToast({ visible: true, message: 'Account created. You can now log in.', type: 'success' })
            setTimeout(() => navigate('/login'), 800)
        } catch (err) {
            const message = err?.response?.data?.message || 'Signup failed. Try again.'
            setToast({ visible: true, message, type: 'error' })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <Toast
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, visible: false }))}
            />
            <div className='signup-container'>
                <div className='signup-header'>
                    <h1>Signup</h1>
                    <p>Create an account to get started</p>
                </div>
                <div className='signup-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <label htmlFor='user'>Name</label>
                            <input type='text' id='user' name='user' placeholder='Enter your name' value={formData.user} onChange={handleInputChange} required />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' name='email' placeholder='Enter your email' value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='pwd'>Password</label>
                            <input type='password' id='pwd' name='pwd' placeholder='Enter your password' value={formData.pwd} onChange={handleInputChange} required />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input type='password' id='confirmPassword' name='confirmPassword' placeholder='Confirm your password' value={formData.confirmPassword} onChange={handleInputChange} required />
                        </div>

                        <div className='terms'>
                            <input
                                id='terms'
                                type='checkbox'
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <label htmlFor='terms'>
                                I agree to the <a href="terms">Terms of Service</a> and <a href="privacy">Privacy Policy</a>.
                            </label>
                        </div>

                        <button type='submit' className='signup-button' disabled={submitting}>
                            {submitting ? 'Creating account…' : 'Continue'}
                        </button>
                    </form>
                    <div className='signup-link'>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup