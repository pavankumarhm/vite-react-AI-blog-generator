import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import './styles.css';


const OPENAI_API_URL = "https://api.openai.com/v1/engines/text-davinci-003/completions";
const OPENAI_API_KEY = " "; // Remember to replace this with your key

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // Function to make a request to OpenAI and generate content
  const generateContent = async () => {
    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          prompt: `Write a blog post about ${title}`,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setContent(response.data.choices[0].text.trim());
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <div className="App">
        <h1 className="app-heading">AI Blog Generator</h1>
        <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={e => setTitle(e.target.value)}
        />
        <button onClick={generateContent}>Generate Content</button>
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    </div>
);


}

export default App;
