
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProfile {
  id: string;
  auth_user_id: string;
  name: string;
  email: string;
  category: 'student' | 'working' | 'non-working' | 'entrepreneur';
  income_frequency: 'monthly' | 'weekly' | 'yearly';
  income_amount: number;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  goal_name: string;
  target_amount: number;
  saved_amount: number;
  deadline: string;
}

export interface AISuggestion {
  id: string;
  user_id: string;
  suggestion_text: string;
  category: string;
  is_read: boolean;
  created_at: string;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [aiSuggestions, setAISuggestions] = useState<AISuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return;
    }

    setUserProfile(data);
  };

  const fetchTransactions = async () => {
    if (!userProfile) return;

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userProfile.id)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching transactions:', error);
      return;
    }

    setTransactions(data || []);
  };

  const fetchSavingsGoals = async () => {
    if (!userProfile) return;

    const { data, error } = await supabase
      .from('savings')
      .select('*')
      .eq('user_id', userProfile.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching savings goals:', error);
      return;
    }

    setSavingsGoals(data || []);
  };

  const fetchAISuggestions = async () => {
    if (!userProfile) return;

    const { data, error } = await supabase
      .from('ai_suggestions')
      .select('*')
      .eq('user_id', userProfile.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching AI suggestions:', error);
      return;
    }

    setAISuggestions(data || []);
  };

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
      setTransactions([]);
      setSavingsGoals([]);
      setAISuggestions([]);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (userProfile) {
      Promise.all([
        fetchTransactions(),
        fetchSavingsGoals(),
        fetchAISuggestions()
      ]).finally(() => setLoading(false));
    }
  }, [userProfile]);

  const addTransaction = async (transactionData: Omit<Transaction, 'id' | 'user_id'>) => {
    if (!userProfile) return;

    const { data, error } = await supabase
      .from('transactions')
      .insert([{ ...transactionData, user_id: userProfile.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding transaction:', error);
      return;
    }

    setTransactions(prev => [data, ...prev]);
    return data;
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating transaction:', error);
      return;
    }

    setTransactions(prev => prev.map(t => t.id === id ? data : t));
    return data;
  };

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting transaction:', error);
      return;
    }

    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addSavingsGoal = async (goalData: Omit<SavingsGoal, 'id' | 'user_id'>) => {
    if (!userProfile) return;

    const { data, error } = await supabase
      .from('savings')
      .insert([{ ...goalData, user_id: userProfile.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding savings goal:', error);
      return;
    }

    setSavingsGoals(prev => [data, ...prev]);
    return data;
  };

  const updateSavingsGoal = async (id: string, updates: Partial<SavingsGoal>) => {
    const { data, error } = await supabase
      .from('savings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating savings goal:', error);
      return;
    }

    setSavingsGoals(prev => prev.map(g => g.id === id ? data : g));
    return data;
  };

  const deleteSavingsGoal = async (id: string) => {
    const { error } = await supabase
      .from('savings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting savings goal:', error);
      return;
    }

    setSavingsGoals(prev => prev.filter(g => g.id !== id));
  };

  const getTotals = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { totalIncome, totalExpenses };
  };

  const getCategoryExpenses = () => {
    const expenseCategories = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(expenseCategories).map(([category, amount]) => ({
      category,
      amount
    }));
  };

  return {
    userProfile,
    transactions,
    savingsGoals,
    aiSuggestions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    getTotals,
    getCategoryExpenses,
    refetch: () => {
      fetchTransactions();
      fetchSavingsGoals();
      fetchAISuggestions();
    }
  };
};
