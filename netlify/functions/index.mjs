import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();

app.use(cors());

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

function calculateTemperatureAndWeight(unitSystem) {
    const initialTemperature = 94;
    const initialWeight = 300;

    let newTemperature = initialTemperature;
    let newWeight = initialWeight;
    let tempType = "fahrenheit";
    let weightType = "pounds";

    if (unitSystem === "uk") {
        newTemperature = Math.round((initialTemperature - 32) * (5 / 9));
        newWeight = Math.round(initialWeight / 14);
        tempType = "celsius";
        weightType = "stone";
    }

    return { newTemperature, newWeight, tempType, weightType };
}

app.get('/api/story', (req, res) => {
    const unitSystem = req.query.unitSystem || 'us';
    const inputName = req.query.name || 'Bob';

    const xItems = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
    const yItems = ["the soup kitchen", "Disneyland", "the White House"];
    const zItems = [
        "spontaneously combusted",
        "melted into a puddle on the sidewalk",
        "turned into a slug and crawled away"
    ];

    const xItem = randomValueFromArray(xItems);
    const yItem = randomValueFromArray(yItems);
    const zItem = randomValueFromArray(zItems);

    const { newTemperature, newWeight, tempType, weightType } =
        calculateTemperatureAndWeight(unitSystem);

    const story = `It was ${newTemperature} ${tempType} outside, so ${xItem} went for a walk. When they got to ${yItem}, they stared in horror for a few moments, then ${zItem}. ${inputName} saw the whole thing, but was not surprised — ${xItem} weighs ${newWeight} ${weightType}, and it was a hot day.`;

    res.json({ story });
});

export const handler = serverless(app);
