import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

  useEffect(() => {
    // Fetch transaction data from the API endpoint
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of transactions
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const addTransaction = (e) => {
    e.preventDefault();
    // Assuming you have some validation logic here
    // before adding the new transaction
    if (newTransaction.date && newTransaction.description && newTransaction.category && newTransaction.amount > 0) {
      setTransactions([...transactions, newTransaction]);
      setNewTransaction({
        date: "",
        description: "",
        category: "",
        amount: 0,
      });
    }
  };

  return (
    <div>
      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Category</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
          </tr>
          {transactions.map((transaction, index) => (
            <Transaction
              key={index}
              date={transaction.date}
              description={transaction.description}
              category={transaction.category}
              amount={transaction.amount}
            />
          ))}
        </tbody>
      </table>
      
      {/* Form for adding new transactions */}
      <form onSubmit={addTransaction}>
        <h2>Add New Transaction</h2>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={newTransaction.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransactionsList;

