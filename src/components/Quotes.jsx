import React, { useState, useEffect } from "react";


const Quotes = () => {
  const [quote, setQuote] = useState("");

  const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
    "In the middle of every difficulty lies opportunity. - Albert Einstein",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "Do not watch the clock. Do what it does. Keep going. - Sam Levenson",
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []); // Runs once on component mount

  return (
    <div className="container mt-5">
      <div className="card text-center quotes-bg">
        <div className="card-body">
          <p className="card-text fs-1" style={{ fontStyle: "italic" }}>
            "{quote}"
          </p>
        </div>
        <div className="card-footer text-muted">happy Ugadi</div>
      </div>
    </div>
  );
};

export default Quotes