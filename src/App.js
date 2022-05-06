import logo from './logo.svg';
import './App.css';
import Login from '../src/Components/Login'
import StoreScreen from '../src/Components/StoreScreen'
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Login />
      {/* <StoreScreen /> */}
      {/* </BrowserRouter> */}

    </div>
  );
}

export default App;
