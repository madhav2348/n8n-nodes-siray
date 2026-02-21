import { NodeConnectionTypes, NodeOperationError } from "n8n-workflow";
import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { sirayImageOperation } from "./imageProperties";

export class Siray implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Siray",
    name: "siray",
    icon: {
      light: "file:../../icons/siray.svg",
      dark: "file:../../icons/siray.svg",
    },
    group: ["input"],
    version: 1,
    description: "Siray Node",
    defaults: {
      name: "Siray",
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: "sirayApi",
        required: true,
        displayOptions: {
          show: {
            authentication: ["sirayApiKey"],
          },
        },
      },
    ],
    properties: [...sirayImageOperation],
  };
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();

    let item: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const model = this.getNodeParameter("model", itemIndex) as string;
        const prompt = this.getNodeParameter("prompt",itemIndex,) as string;
        const image = this.getNodeParameter("image",itemIndex,) as string;

        
        let url: string = "https://api.siray.ai/v1/images/generations/async";

        const body: { model: string; prompt: string; image?: string } = {
          model,
          prompt,
        };

        if (image) {
          body.image = image;
        }

        const response = await this.helpers.httpRequest({
          method: "POST",
          url,
          
          body,
          json: true,
        });
        const content = response.choices?.[0]?.message?.content;
      
        item.push({
          json: {
            id: response.code,
            object: response.object,
            created: response.created,
            model: response.model,

            content,

            usage: {
              input_tokens: response.usage?.input_tokens,
              output_tokens: response.usage?.output_tokens,
              total_tokens: response.usage?.total_tokens,
            },
          },
        });
      } catch (error) {
        // This node should never fail but we want to showcase how
        // to handle errors.
        if (this.continueOnFail()) {
          item.push({
              json: this.getInputData(itemIndex)[0].json,
              error,
              pairedItem: itemIndex,
            });
        } else {
          // Adding `itemIndex` allows other workflows to handle this error
          if (error.context) {
            // If the error thrown already contains the context property,
            // only append the itemIndex
            error.context.itemIndex = itemIndex;
            throw error;
          }
          throw new NodeOperationError(this.getNode(), error, {
            itemIndex,
          });
        }
      }
    }

    return [item];
  }
}
