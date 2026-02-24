const fs = require("node:fs/promises");
const path = require("node:path");

const url = "https://api-gateway.siray.ai/api/model-verse/models";

async function getAllModels() {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  const payload = await response.json();

  if (!Array.isArray(payload?.data)) {
    throw new Error("Unexpected API response format: `data` array is missing.");
  }

  const modelData = payload.data.map((model) => ({
    id: model.id,
    name: model.name,
    model_name: model.model_name,
    description: model.description,
    tag: model.tag,
  }));

  const outputDir = __dirname;
  const fullResponsePath = path.join(outputDir, "allmodel.response.json");
  const modelListPath = path.join(outputDir, "allmodel.data.json");

  await fs.writeFile(fullResponsePath, JSON.stringify(payload, null, 2), "utf8");
  await fs.writeFile(modelListPath, JSON.stringify(modelData, null, 2), "utf8");

  return {
    count: modelData.length,
    fullResponsePath,
    modelListPath,
    data: modelData,
  };
}

getAllModels()
  .then((result) => {
    console.log("Saved model response files:");
    console.log(`- Full response: ${result.fullResponsePath}`);
    console.log(`- Model list:    ${result.modelListPath}`);
    console.log(`Total models: ${result.count}`);
  })
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
