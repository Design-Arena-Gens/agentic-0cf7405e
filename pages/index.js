import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm your sales assistant. I'm here to help you find the perfect product. What are you looking for today?",
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const productCatalog = {
    electronics: ['Smartphone - $699', 'Laptop - $1299', 'Wireless Earbuds - $149', 'Smart Watch - $399'],
    clothing: ['T-Shirt - $29', 'Jeans - $79', 'Sneakers - $129', 'Jacket - $199'],
    home: ['Coffee Maker - $89', 'Vacuum Cleaner - $249', 'Air Purifier - $179', 'Desk Lamp - $49']
  }

  const getAgentResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()

    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      return "Hi there! 😊 Great to chat with you! We have amazing deals today on electronics, clothing, and home appliances. What interests you?"
    }

    if (msg.includes('electronic') || msg.includes('phone') || msg.includes('laptop') || msg.includes('gadget')) {
      return `📱 Great choice! Here are our top electronics:\n\n${productCatalog.electronics.join('\n')}\n\nAll items come with a 2-year warranty! Which one catches your eye?`
    }

    if (msg.includes('cloth') || msg.includes('shirt') || msg.includes('jean') || msg.includes('fashion')) {
      return `👕 Awesome! Check out our clothing collection:\n\n${productCatalog.clothing.join('\n')}\n\nFree shipping on orders over $50! What's your style?`
    }

    if (msg.includes('home') || msg.includes('appliance') || msg.includes('house')) {
      return `🏠 Perfect! Here are our home essentials:\n\n${productCatalog.home.join('\n')}\n\nAll energy-efficient and eco-friendly! Interested in any?`
    }

    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
      return "💰 All our prices are listed with each product! Plus, we're running a special promotion - use code SAVE10 for 10% off your first order! Ready to make a purchase?"
    }

    if (msg.includes('buy') || msg.includes('purchase') || msg.includes('order')) {
      return "🎉 Excellent! To complete your order, I'll need:\n\n1. Product name\n2. Quantity\n3. Delivery address\n4. Payment method\n\nWe accept all major credit cards and PayPal. Our delivery time is 3-5 business days. What would you like to order?"
    }

    if (msg.includes('warranty') || msg.includes('return') || msg.includes('guarantee')) {
      return "✅ We offer:\n\n• 30-day money-back guarantee\n• 2-year warranty on electronics\n• Free returns within 30 days\n• 24/7 customer support\n\nYour satisfaction is our priority! Any other questions?"
    }

    if (msg.includes('shipping') || msg.includes('delivery')) {
      return "🚚 Shipping Info:\n\n• Free shipping on orders over $50\n• Express delivery available ($15)\n• Standard delivery: 3-5 business days\n• Express delivery: 1-2 business days\n\nWe ship worldwide! Where should we deliver?"
    }

    if (msg.includes('thanks') || msg.includes('thank you')) {
      return "You're very welcome! 😊 It's my pleasure to help! Is there anything else you'd like to know about our products?"
    }

    if (msg.includes('bye') || msg.includes('goodbye')) {
      return "Thank you for chatting with me! 👋 Feel free to come back anytime. Have a wonderful day! 🌟"
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! 🤔 We have products in electronics, clothing, and home appliances. Which category would you like to explore?",
      "I'd love to help you with that! 💡 Could you tell me more about what you're looking for? We have great deals today!",
      "Great question! 🌟 We specialize in electronics, clothing, and home goods. What can I show you?",
      "I'm here to help! 😊 Browse our electronics, clothing, or home collections. What catches your interest?"
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = () => {
    if (inputValue.trim() === '') return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        text: getAgentResponse(inputValue),
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, agentMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <Head>
        <title>WhatsApp Sales Agent</title>
        <meta name="description" content="AI-powered WhatsApp sales assistant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💬</text></svg>" />
      </Head>

      <div className="container">
        <div className="chat-header">
          <div className="header-content">
            <div className="avatar">🤖</div>
            <div className="header-info">
              <h1>Sales Agent</h1>
              <span className="status">● Online</span>
            </div>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-bubble">
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.timestamp}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message agent">
              <div className="message-bubble typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="message-input"
          />
          <button onClick={handleSend} className="send-button">
            ➤
          </button>
        </div>
      </div>
    </>
  )
}
