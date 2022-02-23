import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";
// import Splash from "./components/Splash";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        {/* <Splash/> */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
