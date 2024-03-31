import React, { useState, useEffect, useRef } from 'react';
import messageSound from '../../asset/sound/message.mp3';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../context/socket';
import { getCookie } from '../../utils/utils';
import { BASE_PATH } from '../../constants/constant';
import './chat.css';

const ChatPage = () => {
    const [userData, _] = useState(localStorage.getItem("response"));
    const param = useParams();
    const { socket, setSocketUserId, onlineUsers } = useSocket();
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to Cash on Delivery

    useEffect(() => {
        setSocketUserId(getCookie('userId')); // Set user ID when component mounts
    }, [setSocketUserId, param.s, param.c]);

    const [message, setMessage] = useState('');
    const inputMsg = useRef();
    const [conversations, setConversations] = useState([]);

    const handleInput = (e) => {
        setMessage(e.target.value.trim());
    };

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await fetch(`${BASE_PATH}/common/get/conversation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        participant: {
                            c: param.c,
                            s: param.s
                        },
                    }),
                });
                const data = await res.json();
                const messages = data
                    ? data[0].messages?.map((el) => ({
                        id: el._id,
                        sender: el.sender,
                        senderName: el.senderName,
                        message: el.text,
                    }))
                    : [];
                setConversations(messages);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };
        getConversations();
    }, [param.bookingId]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on("newMessage", (message) => {
            console.log("MESS", message);
            if (!document.hasFocus()) {
                const sound = new Audio(messageSound);
                sound.play();
            }
            if (message.sender !== getCookie('userId')) {
                setConversations((prevConversations) => [
                    ...prevConversations,
                    {
                        id: new Date() + '-' + Math.random(0.34),
                        sender: message.sender,
                        senderName: message.senderName,
                        message: message.text,
                    },
                ]);
            }
        });

        return () => socket.off('newMessage');
    }, [socket, conversations]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message) return; // Check if message is empty
        try {
            const res = await fetch(`${BASE_PATH}/common/post/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    senderId: getCookie('userId'),
                    participant: {
                        c: param.c,
                        s: param.s
                    },
                    bookingId: param.b,
                    senderName: userData.name,
                    paymentMethod: paymentMethod, // Include the selected payment method
                }),
            });
            const data = await res.json();
            setConversations((prevConversations) => [
                ...prevConversations,
                {
                    id: new Date() + '-' + Math.random(0.34),
                    senderName: userData.name,
                    message: message,
                },
            ]);
            setMessage(''); // Clear the input field after sending the message
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="chat-page-container">
            <div className="user-info">
                <p>{userData?.name}</p>

                <div className="payment-method-container">
                    <span>Payment Method:</span>
                    <label>
                        <input
                            type="radio"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={handlePaymentMethodChange}
                        />
                        COD
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={handlePaymentMethodChange}
                        />
                        Card
                    </label>

                    <a
                        href={paymentMethod === "cod" ? `/dashboard` : `/checkout/${getCookie('userId')}`}
                        className="confirm-pay-btn"
                        type="button"
                        title="Click here to chat and negotiate price or share other vital information"
                    >
                        Proceed
                    </a>
                </div>

            </div>
            <div className="chat-container">
                <div className="message-container">
                    {conversations.map((message) => (
                        <div key={message.id} className="message">
                            <span>
                                <strong>{message.senderName}:</strong> {message.message}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        ref={inputMsg}
                        className="message-input"
                        type="text"
                        value={message}
                        placeholder="Type your message..."
                        onChange={(e) => handleInput(e)}
                    />
                    <button
                        className="send-btn"
                        onClick={(e) => handleSendMessage(e)}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
