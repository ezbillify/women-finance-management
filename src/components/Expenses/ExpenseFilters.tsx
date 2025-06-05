
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ExpenseFiltersProps {
  onMonthChange: (month: string) => void;
  onCategoryChange: (category: string) => void;
  onAddNew: () => void;
  onSearch: (term: string) => void;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
  onMonthChange,
  onCategoryChange,
  onAddNew,
  onSearch,
}) => {
  const currentYear = new Date().getFullYear();
  const months = [
    { value: '', label: 'All Months' },
    { value: `${currentYear}-01`, label: 'January' },
    { value: `${currentYear}-02`, label: 'February' },
    { value: `${currentYear}-03`, label: 'March' },
    { value: `${currentYear}-04`, label: 'April' },
    { value: `${currentYear}-05`, label: 'May' },
    { value: `${currentYear}-06`, label: 'June' },
    { value: `${currentYear}-07`, label: 'July' },
    { value: `${currentYear}-08`, label: 'August' },
    { value: `${currentYear}-09`, label: 'September' },
    { value: `${currentYear}-10`, label: 'October' },
    { value: `${currentYear}-11`, label: 'November' },
    { value: `${currentYear}-12`, label: 'December' },
  ];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Dining', label: 'Dining' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Education', label: 'Education' },
    { value: 'Salary', label: 'Salary' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Investments', label: 'Investments' },
    { value: 'Gifts', label: 'Gifts' },
  ];

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Card className="rose-card">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
            <div>
              <Select onValueChange={onMonthChange}>
                <SelectTrigger className="rose-input">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select onValueChange={onCategoryChange}>
                <SelectTrigger className="rose-input">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 h-4 w-4" />
              <Input
                className="pl-9 rose-input"
                placeholder="Search transactions..."
                onChange={handleSearchInput}
              />
            </div>
          </div>
          <Button onClick={onAddNew} className="rose-button shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseFilters;
