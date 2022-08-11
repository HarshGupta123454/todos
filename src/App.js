import Welcome from "./Welcome";
import { Routes ,Route } from "react-router-dom"
import Homepage from "./Homepage"

function App() {


  

  return (
   <>

   <Routes>
    <Route path="/" element={<Welcome/>}/>
    <Route path="/homepage" element={<Homepage/>}/>


   </Routes>
   



   
   </>
  );
  }

export default App;
