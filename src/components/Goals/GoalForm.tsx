
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Goal } from '@/data/mockData';

interface GoalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goal: Partial<Goal>) => void;
  editingGoal: Goal | null;
}

const GoalForm: React.FC<GoalFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingGoal,
}) => {
  const [formData, setFormData] = useState<Partial<Goal>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    category: '',
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        id: editingGoal.id,
        name: editingGoal.name,
        targetAmount: editingGoal.targetAmount,
        currentAmount: editingGoal.currentAmount,
        deadline: editingGoal.deadline,
        category: editingGoal.category,
      });
    } else {
      setFormData({
        name: '',
        targetAmount: 0,
        currentAmount: 0,
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
        category: '',
      });
    }
  }, [editingGoal, isOpen]);

  const handleChange = (field: keyof Goal, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rose-card border-rose-200 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-comfortaa text-rose-600">
            {editingGoal ? 'Edit Goal' : 'Add New Goal'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-rose-700">Goal Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="rose-input"
              placeholder="What are you saving for?"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="text-rose-700">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              required
              className="rose-input"
              placeholder="e.g. Travel, Education, Home"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetAmount" className="text-rose-700">Target Amount ($)</Label>
            <Input
              id="targetAmount"
              type="number"
              min="1"
              step="0.01"
              value={formData.targetAmount}
              onChange={(e) => handleChange('targetAmount', parseFloat(e.target.value))}
              required
              className="rose-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currentAmount" className="text-rose-700">Current Amount ($)</Label>
            <Input
              id="currentAmount"
              type="number"
              min="0"
              step="0.01"
              value={formData.currentAmount}
              onChange={(e) => handleChange('currentAmount', parseFloat(e.target.value))}
              required
              className="rose-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-rose-700">Goal Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => handleChange('deadline', e.target.value)}
              required
              className="rose-input"
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-rose-300 text-rose-600 hover:bg-rose-100"
            >
              Cancel
            </Button>
            <Button type="submit" className="rose-button">
              {editingGoal ? 'Update' : 'Add'} Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalForm;
