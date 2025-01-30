// src/pages/Dashboard.jsx
import React from 'react'
import { Layout, Button, Typography } from 'antd'
import { useAuth } from '../context/AuthContext'
import CategoryList from '../components/CategoryList'

const { Header, Content } = Layout
const { Text } = Typography

function Dashboard() {
  const { currentUser, logout } = useAuth()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#1890ff',
        }}
      >
        <Text style={{ color: '#fff', fontSize: '1.25rem' }}>Open When Messages</Text>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {currentUser && (
            <Text style={{ color: '#fff' }}>
              Welcome, {currentUser.displayName}
            </Text>
          )}
          <Button onClick={logout}>Logout</Button>
        </div>
      </Header>
      <Content style={{ padding: '1rem' }}>
        <CategoryList />
      </Content>
    </Layout>
  )
}

export default Dashboard
