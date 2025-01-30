// src/components/MessageList.jsx
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

const { Title } = Typography

function MessageList({ categoryId }) {
  const { currentUser } = useAuth()
  const [messages, setMessages] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    if (!categoryId || !currentUser) return

    const q = query(
      collection(db, 'messages'),
      where('userId', '==', currentUser.uid),
      where('categoryId', '==', categoryId)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgArray = []
      snapshot.forEach((doc) => {
        msgArray.push({ id: doc.id, ...doc.data() })
      })
      setMessages(msgArray)
    })

    return () => unsubscribe()
  }, [categoryId, currentUser])

  const handleCreateMessage = async () => {
    if (!newMessage.trim()) return

    try {
      await addDoc(collection(db, 'messages'), {
        content: newMessage.trim(),
        userId: currentUser.uid,
        categoryId: categoryId,
        createdAt: serverTimestamp(),
      })
      setNewMessage('')
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating message:', error)
    }
  }

  return (
    <div style={{ marginTop: '1rem', background: '#f9f9f9', padding: '1rem', borderRadius: 4 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          alignItems: 'center',
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          Messages
        </Title>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Add Message
        </Button>
      </div>

      <List
        bordered
        dataSource={messages}
        renderItem={(msg) => <List.Item>{msg.content}</List.Item>}
      />

      <Modal
        title="Add a New Message"
        open={isModalOpen}
        onOk={handleCreateMessage}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input.TextArea
          rows={4}
          placeholder="Write something heartfelt..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default MessageList
