import { useState } from "react";

export default function App() {
  const [name, setName] = useState(""); // 名前の状態
  const [unitSystem, setUnitSystem] = useState("us"); // 単位システム
  const [story, setStory] = useState(""); // ストーリー

  function handleNameChange(event) {
    setName(event.target.value); // 名前入力を反映
  }

  function handleUnitChange(event) {
    setUnitSystem(event.target.value); // 単位システム変更
  }

  async function generateStory(event) {
    event.preventDefault();

    const inputName = name.trim() || "Bob"; // 空白の場合デフォルト名
    console.log(`Name: ${inputName}, Unit System: ${unitSystem}`); // デバッグ

    const response = await fetch(
      `/.netlify/functions/silly_story?name=${encodeURIComponent(inputName)}&unitSystem=${unitSystem}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data); // サーバーレスポンスを確認
      setStory(data.message);
    } else {
      setStory("Error generating story");
    }
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
