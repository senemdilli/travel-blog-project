import React, { useState } from 'react';
import axios from 'axios';
import '../css/ChatGPT.css';

const ChatGPT = () => {
    const [userInput, setUserInput] = useState('');
    const [chatResponse, setChatResponse] = useState('');

    const fetchChatGPTResponse = async (message) => {
        try {
            const response = await axios.post('/api/chat', { message });
            setChatResponse(response.data.reply);
        } catch (error) {
            console.error('Error fetching API response:', error);
            setChatResponse('Sorry, something went wrong.');
        }
    };    

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchChatGPTResponse(userInput);
    };

    return (
        <div className='wrapper'>
            <h1>Chat with GPT</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className='input-text'
                    placeholder="Ask something..."
                    rows="5"
                    cols="50"
                />
                <br />
                <button className="button" type="submit">Send</button>
            </form>
            <div>
                <h2>Response:</h2>
                <p>{chatResponse}</p>
            </div>
        </div>
    );
};

export default ChatGPT;
