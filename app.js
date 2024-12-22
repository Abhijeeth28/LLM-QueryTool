const express = require('express');
const llmApiClient = require('./llm_api2');
const config = require('./config');

const app = express();
app.use(express.json());


app.post('/query', async (req, res) => {

  const query = req?.body?.query;
  const text = req?.body?.text;
  // need to update the prompt for better result :)
  const prompt = `Query: ${query} \n for the Text: ${text}`; 
  try {
    const response = await llmApiClient.post(config.llmApiPath, {
        model: config.llmModel,
        messages: [
          { role: 'user', content: prompt },
        ],
      });
    // This is specific to the OpenAI API response format, need to handle other LLM providers
    if (response?.data?.choices && response?.data?.choices?.length > 0) {
      res.json(response?.data?.choices[0]?.message?.content);
    } else {
      res.status(500).json({ error: 'No response from OpenAI' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process query' });
  }
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
