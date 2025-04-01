import React from 'react'

const ChatBubble = ({ message, isSender }) => {
    return (
        <div
            className={`flex items-start ${isSender ? "justify-end" : "justify-start"
                } mb-4`}
        >
            <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md transition-all duration-300 ${isSender
                        ? "bg-blue-500 text-white animate-slideInSender"
                        : "bg-gray-200 text-gray-800 animate-slideInReceiver"
                    }`}
            >
                {message}
            </div>
        </div>
    )
}

export default ChatBubble