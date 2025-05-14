import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from '@mui/material';
import { ExpenseCalculation } from '../types/expense';

interface ExpenseSummaryProps {
  onCalculate: () => void;
  calculation: ExpenseCalculation | null;
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
  onCalculate,
  calculation,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={onCalculate}
        sx={{ mb: 2 }}
        fullWidth
      >
        Calculate
      </Button>

      {calculation && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Expense Summary
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Total Expenses"
                secondary={`$${calculation.total.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Average Daily Expense"
                secondary={`$${calculation.dailyAverage.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Top 3 Expenses"
                secondary={
                  <Box component="span" sx={{ display: 'block' }}>
                    {calculation.topExpenses.map((expense, index) => (
                      <Typography key={expense.id} variant="body2" component="div">
                        {index + 1}. {expense.category}: $
                        {expense.amount.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    ))}
                  </Box>
                }
              />
            </ListItem>
          </List>
        </Paper>
      )}
    </Box>
  );
}; 