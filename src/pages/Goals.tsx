
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GoalCard from '@/components/Goals/GoalCard';
import GoalForm from '@/components/Goals/GoalForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserData } from '@/hooks/useUserData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Goals = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { 
    savingsGoals, 
    loading, 
    addSavingsGoal, 
    updateSavingsGoal, 
    deleteSavingsGoal 
  } = useUserData();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading || loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-rose-600 font-comfortaa">Loading your goals...</p>
        </div>
      </div>
    );
  }

  const handleAddOrUpdateGoal = async (data: any) => {
    try {
      if (data.id) {
        // Update existing goal
        await updateSavingsGoal(data.id, data);
        toast({
          title: "Goal updated",
          description: "Your savings goal has been updated successfully.",
        });
      } else {
        // Add new goal
        await addSavingsGoal({
          goal_name: data.name,
          target_amount: data.targetAmount,
          saved_amount: data.currentAmount || 0,
          deadline: data.deadline,
        });
        toast({
          title: "Goal created",
          description: "Your new savings goal has been created successfully.",
        });
      }
      setIsFormOpen(false);
      setEditingGoal(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteGoal = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      try {
        await deleteSavingsGoal(deletingId);
        toast({
          title: "Goal deleted",
          description: "The savings goal has been removed.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete goal. Please try again.",
          variant: "destructive",
        });
      }
      setDeletingId(null);
    }
  };

  const handleEdit = (goal: any) => {
    const editData = {
      id: goal.id,
      name: goal.goal_name,
      targetAmount: goal.target_amount,
      currentAmount: goal.saved_amount,
      deadline: goal.deadline,
      category: goal.category || 'Savings',
    };
    setEditingGoal(editData);
    setIsFormOpen(true);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-comfortaa font-bold text-rose-600">Savings Goals</h1>
        <Button 
          onClick={() => {
            setEditingGoal(null);
            setIsFormOpen(true);
          }}
          className="rose-button"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-lg text-rose-500 mb-4">
              You don't have any savings goals yet.
            </p>
            <Button 
              onClick={() => {
                setEditingGoal(null);
                setIsFormOpen(true);
              }}
              className="rose-button"
            >
              Create Your First Goal
            </Button>
          </div>
        ) : (
          savingsGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={{
                id: goal.id,
                name: goal.goal_name,
                targetAmount: goal.target_amount,
                currentAmount: goal.saved_amount,
                deadline: goal.deadline || new Date().toISOString(),
                category: 'Savings'
              }}
              onEdit={handleEdit}
              onDelete={handleDeleteGoal}
            />
          ))
        )}
      </div>
      
      {/* Add/Edit Goal Form */}
      <GoalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddOrUpdateGoal}
        editingGoal={editingGoal}
      />
      
      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="rose-card border-rose-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-600">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this savings goal and all associated progress.
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

export default Goals;
