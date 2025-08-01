const axios = require('axios');

const getAiResponse = async (req, res) => {
  const userQuery = req.body.query;

  if (!userQuery) {
    return res.status(400).json({ error: 'Query is required for AI assistant.' });
  }

  console.log("Received query from frontend:", userQuery);

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      {
        inputs: `<s>[INST] ${userQuery} [/INST]`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    console.log("Hugging Face response:", response.data);

    const aiText = response.data[0]?.generated_text || "AI didn't return a valid response.";
    res.status(200).json({ response: aiText });

  } catch (error) {
    console.error("❌ Hugging Face API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from AI assistant." });
  }
};

module.exports = { getAiResponse };
