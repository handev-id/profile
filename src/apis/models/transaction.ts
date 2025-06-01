import { BaseModel } from "./base";

export interface Transaction extends BaseModel {
  type: "income" | "expense";
  amount: number;
  category: string;
  description?: string;
  transaction_date: string;
}
