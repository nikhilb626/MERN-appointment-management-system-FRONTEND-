import './App.css';
import NavRoute from './navRoute';
import Navbar from './components/navbar';
import axios from "axios";
import {AuthContextProvider} from "./context/authcontext";

axios.defaults.withCredentials=true;

function App() {
  return (
<>

<AuthContextProvider>
<Navbar />
<NavRoute />
</AuthContextProvider>

</>
  );
}

export default App;
