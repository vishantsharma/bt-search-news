function Header() {
    return (
      <header className="header">
        <div className="main-container">
          <img src="bt-icon.svg" alt="BT Logo" className="bt-logo" />
          <h1>BT News</h1>
        </div>
      </header>
    );
  }

function App() {
    return (
      <div className="app">
       <Header />
        <main>
          <h1> BT React Code Test - by Vishant Sharma - 15/05/21 </h1>
        </main>
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("root"));