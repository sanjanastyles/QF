import React, { useState, useRef } from "react";
import "./chatBox.css";
import { postData } from "../utils/utils";

const ChatBox = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const userInputRef = useRef(null);
  const chatboxRef = useRef(null);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const handleSend = () => {
    const userMessage = userInputRef.current.value;
    if (userMessage.trim() !== "") {
      addUserMessage(userMessage);
      respondToUser(userMessage);
      userInputRef.current.value = "";
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const addUserMessage = (message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2", "text-right");
    messageElement.innerHTML = `<p class="user-msg-container">${message}</p>`;
    chatboxRef.current.appendChild(messageElement);
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };

  const addBotMessage = (message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2");
    messageElement.innerHTML = `<p class="msg-container">${message}
    
<br/>
    Here's the link to checkout all the services
    <a href="http://localhost:3000/Categories">
      http://localhost:3000/Categories
    </a>
  
    </p>`;

    chatboxRef.current.appendChild(messageElement);
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };

  const respondToUser = async (userMessage) => {
    let botResponse = "";
    const matchingResponse = await postData("http://localhost:8080/bot/enya", {
      msg: userMessage.toLocaleLowerCase(),
    });

    if (matchingResponse.error) {
      botResponse =
        "I'm still in prototype phase. Please contact customer support for assistance. Here's the link";
    }
    botResponse = matchingResponse?.response
      ? matchingResponse.response
      : "I'm still in prototype phase. Please contact customer support for assistance. Here's the link";

    setTimeout(() => {
      addBotMessage(botResponse);
    }, 500);
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <div
        id="chat-container"
        className={`fixed bottom-16 right-4 w-96 ${
          isChatboxOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">Admin Bot</p>
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={toggleChatbox}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-4 border-t flex">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={userInputRef}
              onKeyPress={handleKeyPress}
            />
            <button
              id="send-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              onClick={handleSend}
            >
              Send
            </button>
          </div>

          <div
            id="chatbox"
            className="p-4 h-80 overflow-y-auto"
            ref={chatboxRef}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
