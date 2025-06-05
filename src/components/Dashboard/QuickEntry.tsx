
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuickEntryProps {
  onAddTransaction: (transaction: any) => void;
}

const QuickEntry: React.FC<QuickEntryProps> = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    'Groceries', 'Dining', 'Shopping', 'Transportation', 
    'Utilities', 'Healthcare', 'Entertainment', 'Education'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    const newTransaction = {
      id: `trans-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      category,
      description,
      type: 'expense' as const,
    };

    onAddTransaction(newTransaction);
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <Card className="rose-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-comfortaa text-rose-600">Quick Expense Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-rose-700">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="rose-input"
              placeholder="0.00"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="text-rose-700">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="rose-input">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-rose-700">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="rose-input"
              placeholder="What was this expense for?"
            />
          </div>
          
          <Button type="submit" className="w-full rose-button">
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickEntry;
