import { BaseModel } from "./base";

export interface Project extends BaseModel {
  title: string;
  description?: string;
  link: string;
  images: File[] | string[];
}
