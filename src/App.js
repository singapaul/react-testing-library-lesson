import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>Register your interest</h1>
      <p>Something very very exciting is happening shortly!</p>
      <form>
        <div>
          <label>Name</label>
          <input type="text" placeholder="e.g. John Doe" />
        </div> 
        <div>
          <label>Email</label>
          <input type="text" placeholder="e.g. test@test.com" />
        </div>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default App;
