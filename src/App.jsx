import { useState } from "react";

export default function App() {
  const [story, setStory] = useState(""); // ストーリー表示用
  const [inputName, setInputName] = useState(""); // 入力された名前
  const [unitSystem, setUnitSystem] = useState("us"); // USまたはEUの単位選択

  // サーバーからデータを取得する関数
  const generateStory = async () => {
    const name = inputName.trim() === "" ? "Bob" : inputName; // 名前が空ならBobを使用

    try {
      const response = await fetch(
        `/netlify/functions/randomStory?name=${encodeURIComponent(name)}&unitSystem=${unitSystem}`
      );
      if (!response.ok) throw new Error("Failed to fetch story.");
      const data = await response.json();
      setStory(data.story); // ストーリーのみ表示
    } catch (error) {
      console.error("Error generating story:", error);
      setStory("An error occurred while generating the story.");
    }
  };

  return (
    <div>
      {/* 名前入力フィールド */}
      <div>
        <label htmlFor="customname">Enter custom name:</label>
        <input
          type="text"
          placeholder="Enter name here"
          onChange={(event) => setInputName(event.target.value)}
        />
      </div>

      {/* 単位選択ラジオボタン */}
      <div>
        <label htmlFor="us">US</label>
        <input
          type="radio"
          id="us"
          value="us"
          checked={unitSystem === "us"}
          onChange={() => setUnitSystem("us")}
        />
        <label htmlFor="eu">EU</label>
        <input
          type="radio"
          id="eu"
          value="uk"
          checked={unitSystem === "uk"}
          onChange={() => setUnitSystem("uk")}
        />
      </div>

      {/* ストーリー生成ボタン */}
      <div>
        <button onClick={generateStory}>Generate random story</button>
      </div>

      {/* 生成されたストーリー表示 */}
      {story && <p>{story}</p>}
    </div>
  );
}
