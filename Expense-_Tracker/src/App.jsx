import { useState, useEffect } from 'react';
import './App.css';
import DonutChart from './components/DonutChart';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { exportToCSV } from './utils/csvExport';

function App() {
  // State
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('expense-tracker-data');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default initial data to match screenshot somewhat
    return [
      { id: '1', title: 'House rent', amount: 250, category: 'Expense', date: new Date().toISOString().split('T')[0] },
      { id: '2', title: 'Stocks', amount: 350, category: 'Investment', date: new Date().toISOString().split('T')[0] },
      { id: '3', title: 'Electricity', amount: 100, category: 'Expense', date: new Date().toISOString().split('T')[0] },
      { id: '4', title: 'Salary', amount: 1000, category: 'Income', date: new Date().toISOString().split('T')[0] },
      { id: '5', title: 'Bitcoin', amount: 500, category: 'Investment', date: new Date().toISOString().split('T')[0] },
    ];
  });
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('expense-tracker-theme') || 'light';
  });

  const [filterCategory, setFilterCategory] = useState('All');

  // Effects
  useEffect(() => {
    localStorage.setItem('expense-tracker-data', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('expense-tracker-theme', theme);
  }, [theme]);

  // Handlers
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleExport = () => {
    exportToCSV(filteredTransactions);
  };

  // Derived state
  const filteredTransactions = transactions.filter(t => {
    return filterCategory === 'All' || t.category === filterCategory;
  });

  const totalBalance = transactions.reduce((acc, t) => {
    if (t.category === 'Income') return acc + Number(t.amount);
    return acc - Number(t.amount);
  }, 0);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Expense Tracker</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <div className="controls">
        <div className="filter-group">
          <label>Filter:</label>
          <select 
            className="filter-input" 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Expense">Expense</option>
            <option value="Investment">Investment</option>
            <option value="Savings">Savings</option>
            <option value="Income">Income</option>
          </select>
        </div>
        
        <button className="btn-export" onClick={handleExport}>
          Export CSV
        </button>
      </div>

      <main className="main-content">
        <div className="left-column">
          <DonutChart 
            transactions={transactions} 
            totalBalance={totalBalance} 
          />
        </div>
        
        <div className="right-column">
          <TransactionForm onAddTransaction={handleAddTransaction} />
          <TransactionList 
            transactions={filteredTransactions} 
            onDeleteTransaction={handleDeleteTransaction} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;
