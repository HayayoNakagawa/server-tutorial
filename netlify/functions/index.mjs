export default async (req) => {
    // クエリパラメータを取得
    const url = new URL(req.url);
    const name = url.searchParams.get('name') || 'Bob';
    const unitSystem = url.searchParams.get('unitSystem') || 'us';
  
    // ストーリー生成用のデータ
    const xItems = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
    const yItems = ["the soup kitchen", "Disneyland", "the White House"];
    const zItems = [
      "spontaneously combusted",
      "melted into a puddle on the sidewalk",
      "turned into a slug and crawled away"
    ];
  
    // ランダムな選択を生成
    const randomValueFromArray = (array) => array[Math.floor(Math.random() * array.length)];
    const xItem = randomValueFromArray(xItems);
    const yItem = randomValueFromArray(yItems);
    const zItem = randomValueFromArray(zItems);
  
    // 温度と体重の処理
    const initialTemperature = 94; // °F
    const initialWeight = 300; // ポンド
    let temperature = initialTemperature;
    let weight = initialWeight;
    let tempType = "fahrenheit";
    let weightType = "pounds";
  
    if (unitSystem === "uk") {
      temperature = Math.round((initialTemperature - 32) * (5 / 9)); // 摂氏
      weight = Math.round(initialWeight / 14); // ストーン
      tempType = "celsius";
      weightType = "stone";
    }
  
    // ストーリー生成
    const story = `It was ${temperature} ${tempType} outside, so ${xItem} went for a walk. When they got to ${yItem}, they stared in horror for a few moments, then ${zItem}. ${name} saw the whole thing, but was not surprised — ${xItem} weighs ${weight} ${weightType}, and it was a hot day.`;
  
    // JSON形式で返す
    return new Response(JSON.stringify({ message: story }), {
      headers: { "Content-Type": "application/json" },
    });
  };
  