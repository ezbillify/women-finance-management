
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

interface ExpenseTableProps {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ 
  transactions, 
  onEditTransaction, 
  onDeleteTransaction 
}) => {
  return (
    <div className="rose-card rounded-xl overflow-hidden border border-rose-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-rose-100">
            <TableRow>
              <TableHead className="text-rose-600">Date</TableHead>
              <TableHead className="text-rose-600">Description</TableHead>
              <TableHead className="text-rose-600">Category</TableHead>
              <TableHead className="text-rose-600">Type</TableHead>
              <TableHead className="text-rose-600 text-right">Amount</TableHead>
              <TableHead className="text-rose-600 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-rose-500">
                  No transactions found. Add your first transaction to get started!
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-rose-50">
                  <TableCell className="text-rose-600">
                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-rose-700 font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="text-rose-600">
                    {transaction.category}
                  </TableCell>
                  <TableCell className="text-rose-600 capitalize">
                    {transaction.type}
                  </TableCell>
                  <TableCell 
                    className={`text-right font-medium ${
                      transaction.type === 'expense' ? 'text-rose-700' : 'text-green-600'
                    }`}
                  >
                    {transaction.type === 'expense' ? '-' : '+'}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        onClick={() => onEditTransaction(transaction)}
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 border-rose-200 text-rose-600 hover:bg-rose-100"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        onClick={() => onDeleteTransaction(transaction.id)}
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 border-rose-200 text-rose-600 hover:bg-rose-100 hover:text-rose-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExpenseTable;
