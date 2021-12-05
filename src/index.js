import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/home";
import Topholders from "./pages/topholders";
import Liquiditypools from "./pages/liquiditypools";
import Farmingpools from "./pages/farmingpools";
import Address from "./pages/address";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/address" element={<Address />} />
        <Route path="/topholders" element={<Topholders />} />
        <Route path="/liquiditypools" element={<Liquiditypools />} />
        <Route path="/farmingpools" element={<Farmingpools />} />
      </Routes>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
