Customer Reward Points Calculator:-
This is a simple React app that calculates reward points for customers based on their purchases. 

The rules for earning points are:-
2 points for every dollar spent over $100
1 point for every dollar spent between $50 and $100

The app shows how many points each customer earned in different months and their total points.

Features:-
Shows reward points for each customer by month.
Calculates total points for each customer.
Handles errors with messages if something goes wrong.
Uses caching (memoization) to make the app faster.

Technologies Used:-
React: For building the app.
JavaScript: For the logic.
React Hooks: Uses useState, useEffect, and useMemo to manage the app.

How to Install and Run:-

Clone the project:-
git clone https://github.com/yourusername/Soni-UIAssignment.git

Go to the project folder:-
cd Soni-UIAssignment

Install the required packages:-
npm install

Run the app:-
npm start

The app will automatically open in your default browser. If not, open your browser and go to http://localhost:3000.

How the App Works:-
State Variables
transactions: Holds the purchase history of customers.
rewards: Stores reward points for each customer by month.
loading: Indicates if data is still loading.
error: Shows if there’s an error.

Reward Point Calculation:-
For purchases over $100, the customer earns:
2 points for every dollar above $100
50 points for the amount between $50 and $100
For purchases between $50 and $100, the customer earns:
1 point for every dollar above $50

Error Handling:-
If an error occurs (like issues with data or calculation), the app will show a message.

Performance Optimization:-
The app uses useMemo to remember (cache) reward points, so it doesn’t calculate them again unless the data changes.

