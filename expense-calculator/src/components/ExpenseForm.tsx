import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Expense } from '../types/expense';

interface ExpenseFormProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ expenses, onAddExpense }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && amount) {
      onAddExpense({
        category,
        amount: parseFloat(amount),
      });
      setCategory('');
      setAmount('');
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Amount ($)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: { sm: '200px' } }}
        >
          Add Expense
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.category}</TableCell>
                <TableCell align="right">
                  {expense.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}; 