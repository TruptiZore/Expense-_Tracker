// TransactionList.jsx

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="section-container">
      <h3 className="section-title">History</h3>
      
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions found.</p>
      ) : (
        <div className="history-list">
          {transactions.map(t => (
            <div key={t.id} className={`history-item ${t.category.toLowerCase()}`}>
              <div className="item-left">
                <button 
                  className="delete-btn" 
                  onClick={() => onDeleteTransaction(t.id)}
                  aria-label="Delete transaction"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
                <div className="item-details">
                  <span className="item-title">{t.title}</span>
                  <span className="item-date">{t.date}</span>
                </div>
              </div>
              <div className="item-amount">
                {t.category === 'Income' ? '+' : '-'}₹{t.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
