
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ExpenseTable from '@/components/Expenses/ExpenseTable';
import ExpenseFilters from '@/components/Expenses/ExpenseFilters';
import ExpenseForm from '@/components/Expenses/ExpenseForm';
import { useToast } from '@/hooks/use-toast';
import { filterTransactions, Transaction, mockTransactions } from '@/data/mockData';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Expenses = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const applyFilters = () => {
    let result = transactions;
    
    if (selectedMonth) {
      result = result.filter(t => t.date.startsWith(selectedMonth));
    }
    
    if (selectedCategory) {
      result = result.filter(t => t.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(term) || 
        t.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredTransactions(
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  };

  // Apply filters whenever dependency changes
  React.useEffect(() => {
    applyFilters();
  }, [transactions, selectedMonth, selectedCategory, searchTerm]);

  const handleAddOrUpdateTransaction = (data: Partial<Transaction>) => {
    if (data.id) {
      // Update existing transaction
      const updatedTransactions = transactions.map(t => 
        t.id === data.id ? { ...t, ...data } as Transaction : t
      );
      setTransactions(updatedTransactions);
      toast({
        title: "Transaction updated",
        description: "Your transaction has been successfully updated.",
      });
    } else {
      // Add new transaction
      const newTransaction: Transaction = {
        id: `trans-${Date.now()}`,
        date: data.date || new Date().toISOString().split('T')[0],
        amount: data.amount || 0,
        category: data.category || '',
        description: data.description || '',
        type: data.type as 'expense' | 'income' || 'expense'
      };
      setTransactions([newTransaction, ...transactions]);
      toast({
        title: "Transaction added",
        description: "Your new transaction has been successfully recorded.",
      });
    }
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setTransactions(transactions.filter(t => t.id !== deletingId));
      toast({
        title: "Transaction deleted",
        description: "The transaction has been permanently removed.",
      });
      setDeletingId(null);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-comfortaa font-bold text-rose-600 mb-6">Expenses</h1>
      
      {/* Filters */}
      <ExpenseFilters
        onMonthChange={setSelectedMonth}
        onCategoryChange={setSelectedCategory}
        onAddNew={() => {
          setEditingTransaction(null);
          setIsFormOpen(true);
        }}
        onSearch={setSearchTerm}
      />
      
      <div className="mt-6">
        {/* Expenses Table */}
        <ExpenseTable
          transactions={filteredTransactions}
          onEditTransaction={handleEdit}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
      
      {/* Add/Edit Transaction Form */}
      <ExpenseForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddOrUpdateTransaction}
        editingTransaction={editingTransaction}
      />
      
      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="rose-card border-rose-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-600">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this transaction. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-rose-300 text-rose-600 hover:bg-rose-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="rose-button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Expenses;
