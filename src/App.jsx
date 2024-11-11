import { useState } from "react";

export default function App() {
    const [showStory, setShowStory] = useState(false);
    const [inputName, setInputName] = useState("Bob");
    const [unitSystem, setUnitSystem] = useState("us");
    const [story, setStory] = useState("");

    async function fetchStory() {
        const response = await fetch(
            `http://localhost:3001/api/story?name=${inputName}&unitSystem=${unitSystem}`
        );
        const data = await response.json();
        setStory(data.story);
        setShowStory(true);
    }

    function handleGenerateStory(event) {
        event.preventDefault();
        fetchStory();
    }

    return (
        <div>
            <div>
                <label htmlFor="customname">Enter custom name:</label>
                <input
                    type="text"
                    placeholder="Bob"
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
                <button onClick={handleGenerateStory}>Generate random story</button>
            </div>
            {showStory && <p>{story}</p>}
        </div>
    );
}
