import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cotizador from "./components/Cotizador";
import Historial from "./components/Historial";
import HistorialContext from "./context/HistorialContext";
import CotizadorContext from "./context/CotizadorContext";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [elementos, setElementos] = useState ({metros2:20, propiedad:0, ubicacion:0});
  const [historial, setHistorial] = useLocalStorage("historial", [])
 return (
 <>
 <HistorialContext.Provider value = {{historial, setHistorial}}>
 <CotizadorContext.Provider value = {{elementos, setElementos}}> 
 <BrowserRouter>
 <Routes>
    <Route path="/" element={<Cotizador />}> </Route> 
    <Route path="/Historial" element={<Historial/>}></Route>   
</Routes>   
</BrowserRouter>  
</CotizadorContext.Provider>
</HistorialContext.Provider>

  </>
 );
};
export default App;
