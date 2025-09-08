import service from "../axios";
import { Statistic } from "../models/statistic";
import { Transaction } from "../models/transaction";

export type TransactionParams = {
  date?: string;
  category?: string;
  type?: string;
  month?: string;
};

export const transactionIndexApi = (
  query: TransactionParams
): Promise<Transaction[]> => {
  return service
    .get("/transactions", {
      params: {
        ...query,
      },
    })
    .then((res) => res.data);
};

export const transactionStoreApi = (
  data: Partial<Transaction>
): Promise<Transaction> => {
  return service.post("/transactions", data).then((res) => res.data);
};

export const transactionUpdateApi = (
  data: Partial<Transaction>
): Promise<Transaction> => {
  return service.put("/transactions/" + data.id, data).then((res) => res.data);
};

export const transactionDestroyApi = (id: number): Promise<Transaction> => {
  return service.delete("/transactions/" + id).then((res) => res.data);
};

export const transactionStatisticsApi = ({
  month,
}: {
  month?: string;
}): Promise<Statistic> => {
  return service
    .get("/transactions/statistics", {
      params: {
        month,
      },
    })
    .then((res) => res.data);
};
