import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// import Splash from "./components/Splash";
import Listings from "./components/Listings";

function App() {
  return (
    <Router>
      <div id="root">
        <Nav />
        {/* <Splash/> */}
        <Listings />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
