import React, { useState, useEffect } from 'react'
import { db } from './Firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { Row, Col, Card, Modal, List } from 'antd'
import { HeartFilled } from '@ant-design/icons'

// Define your gradient array
const GRADIENTS = [
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
  'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
  'linear-gradient(135deg, #f9f7d9 0%, #fac7e3 100%)',
  'linear-gradient(135deg, #b1ea4d 0%, #459522 100%)',
  'linear-gradient(135deg, #fdcbf1 0%, #fdcbf1 1%)',
  'linear-gradient(135deg, #24c6dc 0%, #514a9d 100%)',
]

function Home (){
  const [categories, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const catArray = []
      snapshot.forEach((doc) => {
        catArray.push({ id: doc.id, ...doc.data() })
      })
      setCategories(catArray)
    })
    return () => unsubscribe()
  }, [])

  const handleCardClick = (category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)

    const unsub = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const msgArray = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        if (data.categoryId === category.id) {
          msgArray.push({ id: doc.id, ...data })
        }
      })
      setMessages(msgArray)
    })
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
    setMessages([])
  }

  return (
    <>
      <style>{`
        .category-grid {
          margin-top: 2rem;
        }

        .category-card {
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .category-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        /* Animate the heart with a gentle pulsing glow */
        .heart-cover {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 120px;
          animation: pulseHeart 2s infinite;
        }
        @keyframes pulseHeart {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }

        /* Fade in text on hover */
        .card-text {
          opacity: 1;
          transition: opacity 0.3s, transform 0.3s;
        }
        .category-card:hover .card-text {
          opacity: 1;
          transform: translateY(-2px);
        }
      `}</style>

      <Row gutter={[16, 16]} className="category-grid">
        {categories.map((cat, idx) => {
          // Choose a gradient based on the index
          const bgGradient = GRADIENTS[idx % GRADIENTS.length]

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={cat.id}>
              <Card
                className="category-card"
                hoverable
                cover={
                  <div
                    className="heart-cover"
                    style={{ background: bgGradient }}
                  >
                    <HeartFilled style={{ fontSize: 40, color: '#e91e63' }} />
                  </div>
                }
                onClick={() => handleCardClick(cat)}
                bodyStyle={{ minHeight: 120 }}
              >
                <Card.Meta
                  title={cat.title}
                  description={
                    <p className="card-text" style={{ marginTop: '0.5rem' }}>
                      Open this category to see messages.
                    </p>
                  }
                />
              </Card>
            </Col>
          )
        })}
      </Row>

      <Modal
        title={selectedCategory ? selectedCategory.title : 'Messages'}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <List
            bordered
            dataSource={messages}
            renderItem={(msg) => <List.Item>{msg.content}</List.Item>}
          />
        )}
      </Modal>
    </>
  )
}

export default Home;