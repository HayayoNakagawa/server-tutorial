import { useState } from "react";

export default function App() {
  const [name, setName] = useState(""); // 名前の状態
  const [unitSystem, setUnitSystem] = useState("us"); // 単位システム
  const [story, setStory] = useState(""); // 生成されたストーリー

  // 名前変更時の処理
  function handleNameChange(event) {
    setName(event.target.value);
  }

  // 単位変更時の処理
  function handleUnitChange(event) {
    setUnitSystem(event.target.value);
  }

  // ストーリー生成処理
  async function generateStory(event) {
    event.preventDefault();

    const inputName = name.trim() || "Bob";

    const response = await fetch(
      `/.netlify/functions/silly_story?name=${encodeURIComponent(inputName)}&unitSystem=${unitSystem}`
    );

    if (response.ok) {
      const data = await response.json();
      setStory(data.message);
    } else {
      setStory("Error generating story");
    }
  }

  return (
    <div>
      {/* 名前入力 */}
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

      {/* US/EU選択 */}
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

      {/* ストーリー生成ボタン */}
      <div>
        <button onClick={generateStory}>Generate random story</button>
      </div>

      {/* 生成されたストーリーの表示 */}
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
