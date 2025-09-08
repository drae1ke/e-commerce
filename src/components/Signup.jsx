import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './signup.css'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [termsAccepted, setTermsAccepted] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!termsAccepted) {
            alert('Please accept the Terms of Service and Privacy Policy to continue.')
            return
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match')
            return
        }
        console.log('Signup attempt:', formData)
    }

    return (
        <div>
            <div className='signup-container'>
                <div className='signup-header'>
                    <h1>Signup</h1>
                    <p>Create an account to get started</p>
                </div>
                <div className='signup-form'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' id='name' name='name' placeholder='Enter your name' value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' name='email' placeholder='Enter your email' value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' name='password' placeholder='Enter your password' value={formData.password} onChange={handleInputChange} required />
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

                        <button type='submit' className='signup-button'>Continue</button>
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