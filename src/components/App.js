import React from "react";
import AccountContainer from "./AccountContainer";
import Transaction from "./Transaction";

function App() {
  return (
    <div className="ui raised segment">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Flatiron</h2>
      </div>
      <AccountContainer />
      <Transaction />
      
    </div>
  );
}

export default App;
