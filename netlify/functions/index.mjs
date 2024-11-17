export default async (req) => {
    // ランダム要素の定義
    const xItems = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
    const yItems = ["the soup kitchen", "Disneyland", "the White House"];
    const zItems = [
      "spontaneously combusted",
      "melted into a puddle on the sidewalk",
      "turned into a slug and crawled away"
    ];
  
    // ユーザー指定の名前と単位システムを取得
    const { name = "Bob", unitSystem = "us" } = req.query || {};
  
    // ランダム要素を選択
    const randomValueFromArray = (array) =>
      array[Math.floor(Math.random() * array.length)];
    const xItem = randomValueFromArray(xItems);
    const yItem = randomValueFromArray(yItems);
    const zItem = randomValueFromArray(zItems);
  
    // 温度と体重計算
    const initialTemperature = 94; // 華氏
    const initialWeight = 300; // ポンド
    let temperature = initialTemperature;
    let weight = initialWeight;
    let tempType = "fahrenheit";
    let weightType = "pounds";
  
    if (unitSystem === "uk") {
      temperature = Math.round((initialTemperature - 32) * (5 / 9)); // 華氏→摂氏
      weight = Math.round(initialWeight / 14); // ポンド→ストーン
      tempType = "celsius";
      weightType = "stone";
    }
  
    const story = `It was ${temperature} ${tempType} outside, so ${xItem} went for a walk. When they got to ${yItem}, they stared in horror for a few moments, then ${zItem}. ${name} saw the whole thing, but was not surprised — ${xItem} weighs ${weight} ${weightType}, and it was a hot day.`;
  
    const response = {
      story,
      details: { temperature, tempType, weight, weightType, xItem, yItem, zItem, name }
    };
  
    return new Response(JSON.stringify(response), { headers: { "Content-Type": "application/json" } });
  };
  