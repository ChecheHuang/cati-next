'use client'

import { useSocket } from '@/components/providers/socketProvider'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect } from 'react'

export default function SocketExample() {
  const { isConnected, socket } = useSocket()
  console.log(isConnected)

  useEffect(() => {
    if (!socket) {
      return
    }

    socket.on('message', (message: any) => {
      console.log(message)
    })

    return () => {
      socket.off('message')
    }
  }, [socket])
  const handleSendMessage = async (): Promise<void> => {
    await axios.post('/api/socket/message')
  }
  return (
    <div className=" flex h-40 bg-slate-400">
      <Button onClick={handleSendMessage}>Button</Button>
    </div>
  )
}
