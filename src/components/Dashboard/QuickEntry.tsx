
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
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const categories = [
    'Groceries', 'Dining', 'Shopping', 'Transportation', 
    'Utilities', 'Healthcare', 'Entertainment', 'Education',
    'Salary', 'Freelance', 'Investments', 'Gifts'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    const newTransaction = {
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      category,
      description,
      type,
    };

    onAddTransaction(newTransaction);
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <Card className="rose-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-comfortaa text-rose-600">Quick Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-rose-700">Type</Label>
            <Select value={type} onValueChange={(value: 'income' | 'expense') => setType(value)}>
              <SelectTrigger className="rose-input">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-rose-700">Amount (₹)</Label>
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
              placeholder="What was this for?"
            />
          </div>
          
          <Button type="submit" className="w-full rose-button">
            Add {type === 'expense' ? 'Expense' : 'Income'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickEntry;
