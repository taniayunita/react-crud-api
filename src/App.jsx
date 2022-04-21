// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
