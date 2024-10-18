require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Use the OpenAI API key from the environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
app.use(cors());

// POST endpoint for travel recommendations
app.post('/api/recommendations', async (req, res) => {
    const { destination, time, interests } = req.body; // Destructure the required fields

    // Create a prompt to send to OpenAI's API
    // const prompt = `
    // I am traveling to ${destination} and have ${time} available. I enjoy ${interests}. Can you recommend a personalized route or 3-4 top attractions based on my preferences, formatted as:
    // - **Attraction Name:** [Name]
    // - **Description:** [A short, engaging description of the attraction]
    // - **Why Visit:** [A reason why it matches my interests]
    // - **Route Suggestion:** [How this fits into a tailored route for my time and interests]
    // Also, let me know if you'd like more historical or background info on any of these places.
    // `;

    // Construct the prompt using template literals
    const prompt = `
    I am traveling to ${destination} and have ${time} available. I enjoy ${interests}. 
    Can you create a **detailed day-by-day itinerary** for me? Please format it as follows:

    For **each day**, clearly label it as "Day 1," "Day 2," etc. Suggest 3-4 key attractions per day that match my interests. 
    Arrange them into a logical route, ensuring that the timing and flow of activities make sense.

    For each attraction, provide:
    - A short, engaging description of the attraction.
    - Why it fits with my interests.
    - Tips for optimizing my visit (such as the best times to go, whether to book tickets in advance, or nearby spots for a meal or coffee break).
    
    Include recommendations for meals or snack breaks, and make sure to leave time for rest and relaxation between activities.

    The itinerary should be friendly, informative, and well-structured so that I can easily follow it. 
    Be sure to **clearly separate each day** and structure the itinerary in a **day-by-day** format.
`;

    try {
        console.log("Requesting recommendations for:", destination);  // Log the destination for debugging
        console.log(prompt);
        
        // Send a request to the OpenAI API
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',  // Use the correct model (GPT-3.5 or GPT-4)
                messages: [{ role: 'user', content: prompt }]  // Send the user's prompt to the API
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Ensure the API key is stored in environment variables
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("OpenAI Response:", response.data);  // Log the raw response for debugging
        
        // Extract the generated itinerary from the response
        const recommendations = response.data.choices[0].message.content;
        
        // Send the recommendations as the response
        res.json({ recommendations });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);  // Log any errors encountered
        res.status(500).json({
            message: 'Failed to get recommendations',
            error: error.message,
        });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
