import type { INodeProperties } from "n8n-workflow";
import { sirayTextToImage, sirayImageToImage } from "../SirayModel";

const sirayTextToImageModelOptions = sirayTextToImage.map((model) => ({
  name: model.name,
  value: model.model_name,
  description: model.description,
}));

const sirayImageToImageModelOptions = sirayImageToImage.map((model) => ({
  name: model.name,
  value: model.model_name,
  description: model.description,
}));
export const sirayImageOperation: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Image Generation",
        value: "imageGeneration",
        description: "Generate an image from text or image input",
        action: "Generate an image",
      },
    ],
    default: "imageGeneration",
  },
  {
    displayName: "Generation Type",
    name: "generationType",
    type: "options",
    options: [
      {
        name: "Text to Image",
        value: "textToImage",
      },
      {
        name: "Image to Image",
        value: "imageToImage",
      },
    ],
    default: "textToImage",
  },
  {
    displayName: "Prompt",
    name: "prompt",
    type: "string",
    noDataExpression: true,
    required: true,
    default: "",
    description: "Text prompt for generation",
  },

  {
    displayName: "Model",
    name: "model",
    type: "options",
    required: true,
    default: sirayTextToImageModelOptions[0]?.value ?? "",
    description: "Which LLM provider to use",
    options: [...sirayTextToImageModelOptions],
    displayOptions: {
      show: {
        generationType: ["textToImage"],
      },
    },
  },
  {
    displayName: "Model",
    name: "model",
    type: "options",
    required: true,
    default: sirayImageToImageModelOptions[0]?.value ?? "",
    description: "Which LLM provider to use",
    options: [...sirayImageToImageModelOptions],
    displayOptions: {
      show: {
        generationType: ["imageToImage"],
      },
    },
  },

  {
    displayName: "Image",
    name: "image",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        generationType: ["imageToImage"],
      },
    },
    description: "Input image for generation, it can be data URL or image URL",
  },
];
