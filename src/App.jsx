// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import Dashboard from './pages/Dashboard'

// PrivateRoute for any logged-in user
function PrivateRoute({ children }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/signin" />
}

// Additional check to ensure it's *you*
function AdminRoute({ children }) {
  const { currentUser } = useAuth()

  // You can check by email or by UID
  const myEmail = 'youremail@example.com' // Or your actual email
  // If we want to use UID: const myUID = 'abc123...'

  if (!currentUser) {
    return <Navigate to="/signin" />
  }
  
  // Only allow if the user matches your email/UID
  if (currentUser.email === myEmail) {
    return children
  } else {
    // If someone else logs in, redirect to home
    return <Navigate to="/" />
  }
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page (public) */}
        <Route path="/" element={<HomePage />} />

        {/* Sign-in page (if you want sign-in) */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Dashboard (strictly for you) */}
       
      </Routes>
    </Router>
  )
}

export default App
