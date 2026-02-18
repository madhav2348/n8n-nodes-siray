import type { INodeProperties } from "n8n-workflow";
import { sirayChatModel } from "../SirayModel";

const sirayChatModelOptions = sirayChatModel.map((model) => ({
  name: model.name,
  value: model.model_name,
  description: model.description,
}));

export const sirayChatOperation: INodeProperties[] = [
  {
    displayName: "message",
    name: "message",
    type: "string",
    noDataExpression: true,
    required: true,
    default: "",
  },
  {
    displayName: "API Key",
    name: "apiKey",
    type: "string",
    typeOptions: {
      password: true,
    },
    default: "",
    required: true,

    description: "Your Siray API key",
  },
  {
    displayName: "Filters",
    name: "filter",
    type: "collection",
    placeholder: "Add Field",
    required: true,
    default: "system",
    options: [
      {
        displayName: "Type",
        name: "type",
        type: "options",
        options: [
          {
            name: "assistance",
            value: "assistance",
          },
          {
            name: "user",
            value: "user",
          },
          {
            name: "system",
            value: "system",
          },
        ],
        default: "system",
      },
    ],
    displayOptions: {
      // the resources and operations to display this element with
      show: {
        resource: [
          // comma-separated list of resource names
        ],
        operation: [
          // comma-separated list of operation names
        ],
      },
    },
  },
  {
    displayName: "Model",
    name: "model",
    type: "options",
    required: true,
    default: sirayChatModelOptions[0]?.value ?? "",
    description: "Which LLM provider to use",
    options: [...sirayChatModelOptions],
  },
  {
    displayName: "frequency_penalty",
    name: "frequency_penalty",
    type: "number",
    default: "0",
    description: "Penalty for frequent tokens. Required range: -2 <= x <= 2",
  },
  {
    displayName: "max_tokens",
    name: "max_tokens",
    type: "number",
    default: "32768",
    description:
      "Maximum number of tokens to generate. Required range: 1 <= x <= 32768",
  },
  {
    displayName: "presence_penalty",
    name: "presence_penalty",
    type: "number",
    default: "0",
    description: "Penalty for new topics. Required range: -2 <= x <= 2",
  },
  {
    displayName: "stream",
    name: "stream",
    type: "boolean",
    default: "false",
    description: "Enable streaming response.",
  },
  {
    displayName: "temperature",
    name: "temperature",
    type: "number",
    default: "1",
    description:
      "Controls randomness in output (higher = more random). Required range: 0 <= x <= 2",
  },
  {
    displayName: "top_p",
    name: "top_p",
    type: "number",
    default: "1",
    description:
      "Nucleus sampling parameter (controls diversity). Required range: 0 <= x <= 1",
  },
];
