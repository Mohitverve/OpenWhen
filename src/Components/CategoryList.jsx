// src/components/CategoryList.jsx
import React, { useEffect, useState } from 'react'
import { db } from './Firebase'
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { List, Button, Modal, Input, Typography } from 'antd'
import MessageList from './MessageList'

const { Title } = Typography

function CategoryList() {
  const { currentUser } = useAuth()
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategoryTitle, setNewCategoryTitle] = useState('')

  useEffect(() => {
    if (!currentUser) return

    const q = query(
      collection(db, 'categories'),
      where('userId', '==', currentUser.uid)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const catArray = []
      snapshot.forEach((doc) => {
        catArray.push({ id: doc.id, ...doc.data() })
      })
      setCategories(catArray)
    })

    return () => unsubscribe()
  }, [currentUser])

  const handleCreateCategory = async () => {
    if (!newCategoryTitle.trim()) return

    try {
      await addDoc(collection(db, 'categories'), {
        title: newCategoryTitle.trim(),
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      })
      setNewCategoryTitle('')
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  return (
    <div style={{ background: '#fff', padding: '1rem', borderRadius: 4 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Categories
        </Title>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Add Category
        </Button>
      </div>

      <List
        bordered
        dataSource={categories}
        renderItem={(cat) => (
          <List.Item
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedCategoryId(cat.id)}
          >
            {cat.title}
          </List.Item>
        )}
      />

      {selectedCategoryId && (
        <MessageList categoryId={selectedCategoryId} />
      )}

      <Modal
        title="Create a New Category"
        open={isModalOpen}
        onOk={handleCreateCategory}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="Enter category title..."
          value={newCategoryTitle}
          onChange={(e) => setNewCategoryTitle(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default CategoryList;
