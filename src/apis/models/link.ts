import { BaseModel } from "./base";

export interface Link extends BaseModel {
  icon: string | File | FileList;
  link: string;
  title: string;
  description?: string;
}
