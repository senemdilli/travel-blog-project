import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatUI = () => {
    const [messages, setMessages] = useState([]); // Stores conversation history
    const [input, setInput] = useState(''); // Stores current user input
    const [isLoading, setIsLoading] = useState(false); // Loading state for API request

    // Use useEffect to send initial message when the component loads
    useEffect(() => {
        const initialMessage = {
            role: 'assistant',
            content: 'Hi, where do you want to travel?'
        };
        setMessages([initialMessage]);
    }, []); // Empty dependency array ensures this runs only once on component mount

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];

        // Update messages with user input
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        // Call the backend API to fetch destination recommendations
        const response = await fetchDestinationRecommendations(input);

        if (response) {
            // Log the response for debugging purposes
            console.log('Response from Backend:', response);

            // Update messages with chatbot's response
            setMessages([...newMessages, { role: 'assistant', content: response }]);
        } else {
            // Handle case when no response is received
            setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I couldn’t find any recommendations for that destination.' }]);
        }

        setIsLoading(false);
    };

    // Function to call the backend API
    const fetchDestinationRecommendations = async (destination) => {
        try {
            // Change the URL to point to the correct backend port
            const res = await axios.post('http://localhost:5000/api/recommendations', { destination });
    
            console.log('Backend Response:', res.data.recommendations);
            return res.data.recommendations;
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            return 'Sorry, I couldn’t find any recommendations for that destination due to an error.';
        }
    };       

    return (
        <div style={styles.container}>
            <div style={styles.chatBox}>
                <div style={styles.messages}>
                    {messages.map((msg, index) => (
                        <div key={index} style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
                            <p>{msg.content}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for travel recommendations..."
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0'
    },
    chatBox: {
        backgroundColor: '#fff',
        width: '400px',
        height: '600px',
        borderRadius: '20px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column'
    },
    messages: {
        flexGrow: 1,
        padding: '10px',
        overflowY: 'auto'
    },
    userMessage: {
        backgroundColor: '#306F5D',
        color: '#000',
        padding: '10px',
        borderRadius: '20px',
        marginBottom: '10px',
        alignSelf: 'flex-end',
        maxWidth: '80%'
    },
    botMessage: {
        backgroundColor: '#e0e0e0',
        padding: '10px',
        borderRadius: '20px',
        marginBottom: '10px',
        alignSelf: 'flex-start',
        maxWidth: '80%'
    },
    form: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #e0e0e0'
    },
    input: {
        flexGrow: 1,
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #e0e0e0',
        marginRight: '10px'
    },
    button: {
        padding: '10px',
        backgroundColor: '#306F5D',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer'
    }
};

export default ChatUI;
