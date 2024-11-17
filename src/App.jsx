import { useState } from "react";

export default function App() {
  const [name, setName] = useState('');
  const [unitSystem, setUnitSystem] = useState('us');
  const [story, setStory] = useState('');

  async function generateStory(event) {
    event.preventDefault();

    const inputName = name.trim() || 'Bob';

    const response = await fetch(
      `/.netlify/functions/silly_story?name=${encodeURIComponent(inputName)}&unitSystem=${unitSystem}`
    );

    if (response.ok) {
      const data = await response.json();
      setStory(data.message);
    } else {
      setStory('Error generating story');
    }
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleUnitChange(event) {
    setUnitSystem(event.target.value);
  }

  return (
    <div>
      <div>
        <label htmlFor="customname">Enter custom name:</label>
        <input
          type="text"
          id="customname"
          value={name}
          onChange={handleNameChange}
          placeholder=""
        />
      </div>

      <div>
        <label htmlFor="us">US</label>
        <input
          type="radio"
          id="us"
          value="us"
          checked={unitSystem === "us"}
          onChange={handleUnitChange}
        />
        <label htmlFor="uk">UK</label>
        <input
          type="radio"
          id="uk"
          value="uk"
          checked={unitSystem === "uk"}
          onChange={handleUnitChange}
        />
      </div>

      <div>
        <button onClick={generateStory}>Generate random story</button>
      </div>

      <div>
        <p
          id="storyOutput"
          style={{
            whiteSpace: "pre-wrap",
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            display: story ? "block" : "none",
          }}
        >
          {story}
        </p>
      </div>
    </div>
  );
}
