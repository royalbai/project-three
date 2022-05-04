// Components
import Header from "./Components/Header";
import About from "./Components/About";
import Planner from "./Components/Planner";
import Footer from "./Components/Footer";


const App = () => {
  
  return(
    <div className="wrapper">
      <Header />
      <About />
      <Planner />
      <Footer />
    </div>
  );
}

export default App;
