export const exportToCSV = (transactions) => {
  if (transactions.length === 0) {
    alert("No transactions to export");
    return;
  }

  // Define headers
  const headers = ['ID', 'Title', 'Amount', 'Category', 'Date'];
  
  // Map data to CSV rows
  const csvRows = transactions.map(t => [
    t.id,
    `"${t.title.replace(/"/g, '""')}"`, // escape quotes
    t.amount,
    t.category,
    t.date
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => row.join(','))
  ].join('\n');

  // Create a blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'transactions.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
