var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/index.mjs
var functions_exports = {};
__export(functions_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(functions_exports);
async function handler(event) {
  const name = event.queryStringParameters?.name || "Bob";
  const unitSystem = event.queryStringParameters?.unitSystem || "us";
  const xItems = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
  const yItems = ["the soup kitchen", "Disneyland", "the White House"];
  const zItems = [
    "spontaneously combusted",
    "melted into a puddle on the sidewalk",
    "turned into a slug and crawled away"
  ];
  const randomValueFromArray = (array) => array[Math.floor(Math.random() * array.length)];
  const xItem = randomValueFromArray(xItems);
  const yItem = randomValueFromArray(yItems);
  const zItem = randomValueFromArray(zItems);
  const initialTemperature = 94;
  const initialWeight = 300;
  let temperature = initialTemperature;
  let weight = initialWeight;
  let tempType = "fahrenheit";
  let weightType = "pounds";
  if (unitSystem === "uk") {
    temperature = Math.round((initialTemperature - 32) * (5 / 9));
    weight = Math.round(initialWeight / 14);
    tempType = "celsius";
    weightType = "stone";
  }
  const story = `It was ${temperature} ${tempType} outside, so ${xItem} went for a walk. When they got to ${yItem}, they stared in horror for a few moments, then ${zItem}. ${name} saw the whole thing, but was not surprised \u2014 ${xItem} weighs ${weight} ${weightType}, and it was a hot day.`;
  return {
    statusCode: 200,
    body: JSON.stringify({ message: story })
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=index.js.map
