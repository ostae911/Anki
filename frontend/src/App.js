import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "rsuite/dist/rsuite.min.css";

import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Homepage from './components/navbar'
import KarteHochladen from "./pages/createcard";
import Bearbeiten from "./pages/edit";
import Kartenstapel from "./pages/stack";
import UeberUns from "./pages/aboutus";
function App() {
  return (

      <div className="App">
        <div>
          <div className="Container">
            {/*Hier werden durch die im React-Router-Dom importierten Routingfunktionalitäten, übergeordnete Pfade zu den einzelnen Seiten
        deklariert, welche somit auf den Seiten, in der Navbar, dem Footer etc. aufgerufen werden können.*/}
            <BrowserRouter>
              <Routes>

                    <Route path="/" element={<Homepage />}> </Route>
                    <Route path="/upload" element={<KarteHochladen/>}> </Route>
                    <Route path="/edit/:id" element={<Bearbeiten/>}> </Route>
                    <Route path="/stack" element={<Kartenstapel/>}> </Route>
                    <Route path="/aboutus" element={<UeberUns/>}> </Route>

              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>

  );
}

export default App;
