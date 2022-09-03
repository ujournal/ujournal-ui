import { FC } from "react";

export type EmbedComponentType = FC<{
  src: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}>;
