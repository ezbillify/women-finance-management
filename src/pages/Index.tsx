
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Target, PieChart, Shield, Users, Award } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const features = [
    {
      icon: PieChart,
      title: 'Smart Expense Tracking',
      description: 'AI-powered categorization and insights for your spending habits'
    },
    {
      icon: Target,
      title: 'Goal Setting & Tracking',
      description: 'Set and achieve your financial goals with personalized recommendations'
    },
    {
      icon: TrendingUp,
      title: 'AI Financial Insights',
      description: 'Get personalized suggestions based on your spending patterns'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and completely secure'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with other women on their financial journey'
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Access to financial planning resources and expert tips'
    }
  ];

  const userTypes = [
    {
      title: 'Working Women',
      description: 'Manage salary, investments, and career growth expenses',
      color: 'from-rose-400 to-pink-400'
    },
    {
      title: 'Students',
      description: 'Budget your studies, part-time income, and future planning',
      color: 'from-purple-400 to-rose-400'
    },
    {
      title: 'Non-Working Women',
      description: 'Track household expenses and personal savings efficiently',
      color: 'from-rose-300 to-rose-400'
    },
    {
      title: 'Entrepreneurs',
      description: 'Separate business and personal finances with ease',
      color: 'from-orange-400 to-rose-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/80 to-rose-200/80" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-comfortaa font-bold text-rose-600 mb-6 animate-fade-in">
              BudgetBuddy
            </h1>
            <p className="text-xl lg:text-2xl text-rose-500 mb-4 animate-fade-in">
              Your AI-Powered Financial Companion
            </p>
            <p className="text-lg text-rose-400 mb-8 max-w-2xl mx-auto animate-fade-in">
              Designed specifically for women to take control of their finances with intelligent insights, 
              personalized recommendations, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Button 
                onClick={() => navigate('/signup')}
                className="rose-button text-lg px-8 py-3"
              >
                Get Started Free
              </Button>
              <Button 
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-rose-300 text-rose-600 hover:bg-rose-100 text-lg px-8 py-3"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* User Types Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-comfortaa font-bold text-center text-rose-600 mb-12">
            Perfect for Every Woman's Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((type, index) => (
              <Card key={index} className="rose-card hover:scale-105 transition-transform duration-200">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} mb-4`} />
                  <h3 className="text-xl font-semibold text-rose-700 mb-2">{type.title}</h3>
                  <p className="text-rose-500">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-comfortaa font-bold text-center text-rose-600 mb-12">
            Powerful Features for Financial Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="rose-card hover:scale-105 transition-transform duration-200">
                <CardContent className="p-6 text-center">
                  <feature.icon size={48} className="mx-auto text-rose-500 mb-4" />
                  <h3 className="text-xl font-semibold text-rose-700 mb-3">{feature.title}</h3>
                  <p className="text-rose-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-200 to-rose-300">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-comfortaa font-bold text-rose-700 mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-lg text-rose-600 mb-8 max-w-2xl mx-auto">
            Join thousands of women who are already taking control of their finances with BudgetBuddy.
          </p>
          <Button 
            onClick={() => navigate('/signup')}
            className="rose-button text-lg px-8 py-3"
          >
            Start Your Journey Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-600 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-comfortaa font-bold mb-4">BudgetBuddy</h3>
          <p className="text-rose-200 mb-4">Empowering women through financial literacy and smart budgeting.</p>
          <p className="text-rose-300 text-sm">© 2024 BudgetBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
