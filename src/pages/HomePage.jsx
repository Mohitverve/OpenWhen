// src/pages/HomePage.jsx
import React from 'react'
import { Layout, Typography } from 'antd'
import HomeCategoryList from '../components/HomeCategoryList';

const { Header, Content } = Layout
const { Title } = Typography

function HomePage() {
  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <Title level={2} style={styles.headerTitle}>
          Open When App
        </Title>
      </Header>

      <Content style={styles.content}>
        <Title level={3} style={{ textAlign: 'center' }}>Pick a Category</Title>
        <p style={{ textAlign: 'center' }}>
          Hover over a category card and click to see messages.
        </p>
        <HomeCategoryList />
      </Content>
    </Layout>
  )
}

export default HomePage;

const styles = {
  layout: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  header: {
    // Gradient background
    background: 'linear-gradient(90deg, #2980b9, #6dd5fa, #ffffff)',
    padding: '1rem',
  },
  headerTitle: {
    color: '#fff',
    margin: 0,
  },
  content: {
    padding: '2rem',
  },
}
