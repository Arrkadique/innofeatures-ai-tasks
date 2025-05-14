export interface Expense {
  id: string;
  category: string;
  amount: number;
}

export interface ExpenseCalculation {
  total: number;
  dailyAverage: number;
  topExpenses: Expense[];
} 