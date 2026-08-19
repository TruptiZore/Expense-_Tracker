import { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Expense');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !amount) {
      alert('Please provide title and amount');
      return;
    }

    const newTransaction = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).substring(2, 9),
      title,
      category,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0] // current date YYYY-MM-DD
    };

    onAddTransaction(newTransaction);
    setTitle('');
    setAmount('');
  };

  return (
    <div className="section-container">
      <h3 className="section-title">Transactions</h3>
      <form className="form-container" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Title (e.g. Salary, House Rent, SIP)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <select 
          className="form-input" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Expense">Expense</option>
          <option value="Investment">Investment</option>
          <option value="Savings">Savings</option>
          <option value="Income">Income</option>
        </select>
        
        <input 
          type="number" 
          className="form-input" 
          placeholder="Amount" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <button type="submit" className="btn-submit">Make Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
