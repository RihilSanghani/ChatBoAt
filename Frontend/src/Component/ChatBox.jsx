import React, { useState } from 'react'
import ChatBubble from './ChatBubble';

const ChatBox = () => {

    const [messages, setMessages] = useState([
        { text: "Hello!", sender: false },
        { text: "Hi there! How can I help you?", sender: true },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages((prev) => [...prev, { text: newMessage, sender: true }]);
            setNewMessage("");
            setTimeout(() => {
                // Simulate a reply
                setMessages((prev) => [
                    ...prev,
                    { text: "Got it! Let me check that for you.", sender: false },
                ]);
            }, 1000);
        }
    };
    return (
        <div className="flex flex-col bg-gray-900 text-gray-200 w-full max-w-md mx-auto" style={{ height: "450px" }}>
            {/* Chat Header */}
            <div className="p-4 bg-gray-800 shadow-md text-center text-lg font-semibold">
                FriendBoAt
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 ">
                {messages.map((message, index) => (
                    <ChatBubble
                        key={index}
                        message={message.text}
                        isSender={message.sender}
                    />
                ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-gray-800 flex items-center gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-md bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors text-white font-semibold"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatBox