
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GoalCard from '@/components/Goals/GoalCard';
import GoalForm from '@/components/Goals/GoalForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Goal, mockGoals } from '@/data/mockData';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddOrUpdateGoal = (data: Partial<Goal>) => {
    if (data.id) {
      // Update existing goal
      const updatedGoals = goals.map(g => 
        g.id === data.id ? { ...g, ...data } as Goal : g
      );
      setGoals(updatedGoals);
      toast({
        title: "Goal updated",
        description: "Your savings goal has been updated successfully.",
      });
    } else {
      // Add new goal
      const newGoal: Goal = {
        id: `goal-${Date.now()}`,
        name: data.name || '',
        targetAmount: data.targetAmount || 0,
        currentAmount: data.currentAmount || 0,
        deadline: data.deadline || new Date().toISOString(),
        category: data.category || '',
      };
      setGoals([...goals, newGoal]);
      toast({
        title: "Goal created",
        description: "Your new savings goal has been created successfully.",
      });
    }
    setIsFormOpen(false);
    setEditingGoal(null);
  };

  const handleDeleteGoal = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setGoals(goals.filter(g => g.id !== deletingId));
      toast({
        title: "Goal deleted",
        description: "The savings goal has been removed.",
      });
      setDeletingId(null);
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
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
        {goals.length === 0 ? (
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
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
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
