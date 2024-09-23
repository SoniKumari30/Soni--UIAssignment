import React, { useState, useEffect, useMemo } from 'react';

function App() {
  // State variables to store transactions, rewards, loading, and error states
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track errors

  // Sample transaction data with customerId, purchase amount, and date
  const sampleData = [
    { customerId: 101, amount: 150, date: '2024-01-15' },
    { customerId: 101, amount: 175, date: '2024-02-15' },
    { customerId: 101, amount: 200, date: '2024-03-15' },
    { customerId: 202, amount: 250, date: '2024-04-10' },
    { customerId: 202, amount: 190, date: '2024-05-10' },
    { customerId: 202, amount: 300, date: '2024-06-10' },
  ];

  // Fetch transaction data on component mount with error and loading handling
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        setLoading(true); // Start loading
        // Simulating data fetch (in this case, using static sample data)
        setTransactions(sampleData);
        setLoading(false); // End loading after fetching data
      } catch (err) {
        setError("Failed to fetch transactions. Please try again later.");
        console.error("Error fetching transactions:", err);
        setLoading(false); // End loading even if an error occurs
      }
    };

    fetchTransactionData();
  }, []); // Run once after the component mounts

  // Calculate rewards points when transactions data is updated
  useEffect(() => {
    if (transactions.length > 0) {
      try {
        const rewardPoints = {}; // Object to store points for each customer

        // Calculate reward points for each transaction
        transactions.forEach(({ customerId, amount, date }) => {
          const month = new Date(date).getMonth() + 1; // Get month (1-based index)
          const points = calculateRewardPoints(amount); // Calculate points based on amount

          // Initialize reward points for the customer if not already done
          if (!rewardPoints[customerId]) {
            rewardPoints[customerId] = {};
          }

          // Initialize month for the customer if not already done
          if (!rewardPoints[customerId][month]) {
            rewardPoints[customerId][month] = 0;
          }

          // Add points for the transaction to the respective month
          rewardPoints[customerId][month] += points;
        });

        // Update the rewards state with calculated points
        setRewards(rewardPoints);
      } catch (err) {
        setError("Failed to calculate reward points. Please try again later.");
        console.error("Error calculating reward points:", err);
      }
    }
  }, [transactions]); // Runs whenever transactions data changes

  // Memoize the calculation of reward points to prevent unnecessary recalculations
  const memoizedRewards = useMemo(() => {
    return rewards;
  }, [rewards]);

  // Calculate reward points based on the purchase amount
  // Rules:
  // - 2 points for every dollar over $100
  // - 1 point for every dollar between $50 and $100
  const calculateRewardPoints = (amount) => {
    let points = 0;
    try {
      if (amount > 100) {
        points += (amount - 100) * 2; // Points for amount over $100
        points += 50; // Points for amount between $50 and $100
      } else if (amount > 50) {
        points += (amount - 50) * 1; // Points for amount over $50
      }
    } catch (err) {
      console.error("Error calculating points for amount:", err);
    }
    return points;
  };

  // Calculate total reward points earned by a customer across all months (memoized)
  const calculateTotalRewardPoints = (customerRewards) => {
    return Object.values(customerRewards).reduce((total, points) => total + points, 0);
  };

  // Show loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there is any error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1><u>Customer Reward Points</u></h1>

      {/* Display points for each customer */}
      {Object.keys(memoizedRewards).map((customerId) => (
        <div key={customerId}>
          <h2><u>Customer {customerId}</u></h2>

          {/* Display points earned per month for the customer */}
          {Object.keys(memoizedRewards[customerId]).map((month) => (
            <p key={month}>
              Month {month}: {memoizedRewards[customerId][month]} points
            </p>
          ))}

          {/* Display total reward points for the customer */}
          <p><strong><u>Total Points:</u> {calculateTotalRewardPoints(memoizedRewards[customerId])}</strong></p>
        </div>
      ))}
    </div>
  );
}

// Export the App component
export default App;
