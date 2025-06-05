
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { formatCurrency } from '@/utils/currency';

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <Card className="rose-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-comfortaa text-rose-600">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-rose-500">Date</TableHead>
              <TableHead className="text-rose-500">Description</TableHead>
              <TableHead className="text-rose-500">Category</TableHead>
              <TableHead className="text-rose-500 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-rose-500">
                  No transactions yet. Add your first transaction using the quick entry form!
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-rose-600">
                    {format(new Date(transaction.date), 'MMM dd')}
                  </TableCell>
                  <TableCell className="text-rose-600 font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="text-rose-600">
                    {transaction.category}
                  </TableCell>
                  <TableCell 
                    className={`text-right font-medium ${
                      transaction.type === 'expense' ? 'text-rose-700' : 'text-green-600'
                    }`}
                  >
                    {transaction.type === 'expense' ? '-' : '+'}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
