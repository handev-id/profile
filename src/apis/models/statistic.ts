type CategoryStats = {
    income: number;
    expense: number;
  };
  
export type Statistic = {
    total_income: number;
    total_expense: number;
    balance: number;
    by_category: Record<string, CategoryStats>;
  };
  