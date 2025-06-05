
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ExpenseTable from '@/components/Expenses/ExpenseTable';
import ExpenseFilters from '@/components/Expenses/ExpenseFilters';
import ExpenseForm from '@/components/Expenses/ExpenseForm';
import { useToast } from '@/hooks/use-toast';
import { useUserData } from '@/hooks/useUserData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Expenses = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { 
    transactions, 
    loading, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction 
  } = useUserData();
  
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

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

  const handleAddOrUpdateTransaction = async (data: any) => {
    try {
      if (data.id) {
        // Update existing transaction
        await updateTransaction(data.id, data);
        toast({
          title: "Transaction updated",
          description: "Your transaction has been successfully updated.",
        });
      } else {
        // Add new transaction
        await addTransaction(data);
        toast({
          title: "Transaction added",
          description: "Your new transaction has been successfully recorded.",
        });
      }
      setIsFormOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTransaction = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      try {
        await deleteTransaction(deletingId);
        toast({
          title: "Transaction deleted",
          description: "The transaction has been permanently removed.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete transaction. Please try again.",
          variant: "destructive",
        });
      }
      setDeletingId(null);
    }
  };

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  if (authLoading || loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-rose-600 font-comfortaa">Loading your expenses...</p>
        </div>
      </div>
    );
  }

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
