// src/pages/SignInPage.jsx
import React, { useEffect } from 'react'
import { Button, Typography } from 'antd'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

function SignInPage() {
  const { loginWithGoogle, currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      // If already logged in, go to home
      navigate('/')
    }
  }, [currentUser, navigate])

  const handleSignIn = async () => {
    try {
      await loginWithGoogle()
      // No need to navigate here if the useEffect handles it on state change
    } catch (error) {
      console.error('Google Sign-In error:', error)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Title level={3}>Open When App</Title>
      <Button type="primary" onClick={handleSignIn}>
        Sign In with Google
      </Button>
    </div>
  )
}

export default SignInPage;
