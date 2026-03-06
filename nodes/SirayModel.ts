import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type SirayModelType = {
  id: number;
  name: string;
  model_name: string;
  description: string;
  tag: string;
};

const modelFileCandidates = [
  path.resolve(__dirname, "../getAllModel/allmodel.data.json"),
  path.resolve(__dirname, "../../getAllModel/allmodel.data.json"),
];

const modelFilePath = modelFileCandidates.find((candidate) =>
  existsSync(candidate),
);

if (!modelFilePath) {
  throw new Error("Check Path");
}

const sirayAvailableModel = JSON.parse(
  readFileSync(modelFilePath, "utf8"),
) as SirayModelType[];

/* TODO:
  Test if [model.tag === "multi-model"] works im each model
  and produce expected results

*/

export const sirayChatModel: SirayModelType[] = sirayAvailableModel.filter(
  (model) => {
    return model.tag === "chat";
  },
).sort((a, b) => a.name.localeCompare(b.name));

export const sirayTextToImage: SirayModelType[] = sirayAvailableModel.filter(
  (models) => {
    return models.tag === "text-to-image" ;
  },
).sort((a, b) => a.name.localeCompare(b.name));

export const sirayImageToImage: SirayModelType[] = sirayAvailableModel.filter(
  (models) => {
    return models.tag === "image-to-video"  ;
  },
).sort((a, b) => a.name.localeCompare(b.name));
export const sirayTextToVideo: SirayModelType[] = sirayAvailableModel.filter(
  (models) => {
    return models.tag === "text-to-video"  ;
  },
).sort((a, b) => a.name.localeCompare(b.name));
export const sirayImageToVideo: SirayModelType[] = sirayAvailableModel.filter(
  (models) => {
    return models.tag === "image-to-image" ;
  },
).sort((a, b) => a.name.localeCompare(b.name));
export const sirayVideoToVideo: SirayModelType[] = sirayAvailableModel.filter(
  (models) => {
    return models.tag === "video-to-video" ;
  },
).sort((a, b) => a.name.localeCompare(b.name));
export const sirayEmbeddings: SirayModelType[] = sirayAvailableModel.filter(
  (models) => {
    return models.tag === "embedding" ;
  },
).sort((a, b) => a.name.localeCompare(b.name));
