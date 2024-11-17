import { useState } from "react";

export default function App() {
  const [story, setStory] = useState("");
  const [inputName, setInputName] = useState("Bob");
  const [unitSystem, setUnitSystem] = useState("us");

  const generateStory = async () => {
    const response = await fetch(
      `/netlify/functions/randomStory?name=${encodeURIComponent(inputName)}&unitSystem=${unitSystem}`
    );
    const data = await response.json();
    setStory(data.story);
  };

  return (
    <div>
      <div>
        <label htmlFor="customname">Enter custom name:</label>
        <input
          type="text"
          placeholder=""
          onChange={(event) => setInputName(event.target.value || "Bob")}
        />
      </div>
      <div>
        <label htmlFor="us">US</label>
        <input
          type="radio"
          id="us"
          value="us"
          checked={unitSystem === "us"}
          onChange={() => setUnitSystem("us")}
        />
        <label htmlFor="uk">UK</label>
        <input
          type="radio"
          id="uk"
          value="uk"
          checked={unitSystem === "uk"}
          onChange={() => setUnitSystem("uk")}
        />
      </div>
      <div>
        <button onClick={generateStory}>Generate random story</button>
      </div>
      {story && <p>{story}</p>}
    </div>
  );
}
