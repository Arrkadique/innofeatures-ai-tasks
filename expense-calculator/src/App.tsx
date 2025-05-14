import React, { useState } from 'react';
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseSummary } from './components/ExpenseSummary';
import { Expense, ExpenseCalculation } from './types/expense';
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [calculation, setCalculation] = useState<ExpenseCalculation | null>(null);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expenseWithId = {
      ...newExpense,
      id: uuidv4(),
    };
    setExpenses([...expenses, expenseWithId]);
  };

  const calculateExpenses = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const dailyAverage = total / 30;
    const topExpenses = [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    setCalculation({
      total,
      dailyAverage,
      topExpenses,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Expense Calculator
          </Typography>
          <ExpenseForm expenses={expenses} onAddExpense={handleAddExpense} />
          <ExpenseSummary onCalculate={calculateExpenses} calculation={calculation} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
