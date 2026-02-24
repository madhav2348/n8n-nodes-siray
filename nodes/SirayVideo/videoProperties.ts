import type { INodeProperties } from "n8n-workflow";
import { sirayTextToVideo, sirayImageToVideo } from "../SirayModel";

const sirayTextToVideoModelOptions = sirayTextToVideo.map((model) => ({
  name: model.name,
  value: model.model_name,
  description: model.description,
}));

const sirayImageToVideoModelOptions = sirayImageToVideo.map((model) => ({
  name: model.name,
  value: model.model_name,
  description: model.description,
}));
export const sirayVideoOperation: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Video Generation",
        value: "videoGeneration",
        description: "Generate a video from text or image input",
        action: "Generate a video",
      },
    ],
    default: "videoGeneration",
  },
  {
    displayName: "Generation Type",
    name: "generationType",
    type: "options",
    options: [
      {
        name: "Text to Video",
        value: "textToVideo",
      },
      {
        name: "Image to Video",
        value: "imageToVideo",
      },
    ],
    default: "textToVideo",
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
    displayName: "Duration",
    name: "duration",
    type: "number",
    default: 8,
    typeOptions: {
      minValue: 8,
      maxValue: 8,
    },
    description: "Video duration in seconds. Fixed value: 8",
  },

  {
    displayName: "Model",
    name: "model",
    type: "options",
    required: true,
    default: sirayImageToVideoModelOptions[0]?.value ?? "",
    description: "Which LLM provider to use",
    options: [...sirayImageToVideoModelOptions],
    displayOptions: {
      show: {
        generationType: ["imageToVideo"],
      },
    },
  },
  {
    displayName: "Model",
    name: "model",
    type: "options",
    required: true,
    default: sirayTextToVideoModelOptions[0]?.value ?? "",
    description: "Which LLM provider to use",
    options: [...sirayTextToVideoModelOptions],
    displayOptions: {
      show: {
        generationType: ["textToVideo"],
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
        generationType: ["imageToVideo"],
      },
    },
    description: "Input image for generation, it can be data URL or image URL",
  },
];
