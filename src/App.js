import logo from './logo.svg';
import './App.css';

const hirokubase = 'https://mo-hackathon.herokuapp.com/'

const getHello = () => {
  fetch(hirokubase, {method: 'GET'}).then(response => {
    console.log(response);
    return response;
  }).catch(error => {
    console.log(error);
  })
}

function App() {

  const response = getHello();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. HELLO MAX!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {response}
    </div>
  );
}

export default App;
