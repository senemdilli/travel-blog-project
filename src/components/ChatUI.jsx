
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ChatUI = () => {
    const [messages, setMessages] = useState([]); // Stores conversation history
    const [input, setInput] = useState({ destination: '', time: '', interests: '' }); // Stores user inputs
    const [isLoading, setIsLoading] = useState(false); // Loading state for API request
    // Function to convert **text** into bold and handle headers and empty lines
    const formatText = (text) => {
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, (match, p1) => `<strong>${p1}</strong>`) // Bold for **text**
            .replace(/__(.*?)__/g, (match, p1) => `<em>${p1}</em>`) // Italic for __text__
            .replace(/(?:\r\n|\r|\n)/g, '<br />') // Line breaks for new lines
            .replace(/^(\d+\.) (.+)/gm, '<h4>$1 $2</h4>') // Numbered headers
            .replace(/^- (.+)/gm, '<h4>$1</h4>') // Bullet headers (e.g., "- Brandenburg Gate")
            // Adding empty lines after the day and each attraction
            .replace(/Day 1: (.*?)/g, '<h3>Day 1: $1</h3><br /><br />') // Add line break after "Day 1"
            .replace(/(\d+\) \*\*Attraction Name:\*\* .+?)(\n|$)/g, '$1<br /><br />'); // Add line break after each attraction
        return { __html: formattedText };
    };
    // Use useEffect to send initial message when the component loads
    useEffect(() => {
        const initialMessage = {
            role: 'assistant',
            content: 'Hi, where do you want to travel, how much time do you have, and what are your interests?'
        };
        setMessages([initialMessage]);
    }, []); // Empty dependency array ensures this runs only once on component mount
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { destination, time, interests } = input;
        if (!destination.trim() || !time.trim() || !interests.trim()) return;
        const newMessages = [
            ...messages,
            { role: 'user', content: `Destination: ${destination}, Time: ${time}, Interests: ${interests}` }
        ];
        // Update messages with user input
        setMessages(newMessages);
        setInput({ destination: '', time: '', interests: '' });
        setIsLoading(true);
        // Call the backend API to fetch destination recommendations
        const response = await fetchDestinationRecommendations(destination, time, interests);
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
    const fetchDestinationRecommendations = async (destination, time, interests) => {
        try {
            // Change the URL to point to the correct backend port
            const res = await axios.post('http://localhost:5000/api/recommendations', { destination, time, interests });
    
            console.log('Backend Response:', res.data.recommendations);
            return res.data.recommendations;
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            return 'Sorry, I couldn’t find any recommendations for that destination due to an error.';
        }
    };
    // Handle input change for destination, time, and interests
    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    return (
        <div style={styles.container}>
            <div style={styles.chatBox}>
                {/* Messages Container */}
                <div style={styles.messages}>
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
                            {/* Render bot's response with bold/italic text conversion */}
                            {msg.role === 'assistant' ? (
                                <div dangerouslySetInnerHTML={formatText(msg.content)} />
                            ) : (
                                <div>{msg.content}</div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Input Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="destination"
                        value={input.destination}
                        onChange={handleInputChange}
                        placeholder="Enter destination"
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="time"
                        value={input.time}
                        onChange={handleInputChange}
                        placeholder="How much time do you have?"
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="interests"
                        value={input.interests}
                        onChange={handleInputChange}
                        placeholder="What are your interests?"
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
        width: '1200px',  // Adjusted width
        height: 'auto',   // Allow height to be auto
        maxHeight: '80vh',
        borderRadius: '20px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'  // Allow scrolling if content overflows
    },
    messages: {
        flexGrow: 1,
        padding: '20px',  // Increased padding for better spacing
        overflowY: 'auto'
    },
    userMessage: {
        backgroundColor: '#306F5D',
        justifyContent: 'flex-end',
        color: '#fff',
        padding: '10px',
        borderRadius: '15px',
        marginBottom: '10px',
        alignSelf: 'flex-end',
        maxWidth: '80%',
        fontSize: '14px'
    },
    botMessage: {
        backgroundColor: '#f8f9fa',
        color: '#333',
        padding: '15px',  // Larger padding for better readability
        borderRadius: '15px',
        marginBottom: '10px',
        alignSelf: 'flex-start',
        maxWidth: '90%',
        lineHeight: '1.5',
        fontSize: '16px'  // Slightly larger font for bot messages
    },
    form: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fff',
    },
    input: {
        flexGrow: 1,
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #e0e0e0',
        marginRight: '10px',
        fontSize: '16px'
    },
    button: {
        padding: '10px',
        backgroundColor: '#306F5D',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px'
    }
};
export default ChatUI;
