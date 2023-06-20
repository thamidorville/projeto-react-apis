import React from "react";
import { PokedexProvider } from "./context/PokedexContext";
import { Router } from "./router/Router";



const App = () => {
  return (
    <PokedexProvider>

   <Router>
   </Router>

    </PokedexProvider>
  );
};

export default App;


