require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Use the OpenAI API key from the environment variables
app.use(cors());

// POST endpoint for travel recommendations
app.post('/api/recommendations', async (req, res) => {
    const { destination } = req.body;

    // Create a prompt to send to OpenAI's API
    const prompt = `
        I am traveling to ${destination}. Can you recommend 3-4 popular attractions or things to do there, 
        in a structured format such as:
        - Attraction Name: [Name]
        - Description: [A short description of the attraction]
        - Why Visit: [A reason why it's a must-see]
    `;

    try {
        console.log("Requesting recommendations for:", destination);  // Log the destination
        
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',  // Model selection
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,  // Use the actual API key here
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("OpenAI Response:", response.data);  // Log the OpenAI response
        
        const recommendations = response.data.choices[0].message.content;
        res.json({ recommendations });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);  // Log any error details
        res.status(500).json({
            message: 'Failed to get recommendations',
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
