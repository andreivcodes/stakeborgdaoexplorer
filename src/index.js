import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/home";
import Topholders from "./pages/topholders";
import Liquiditypools from "./pages/liquiditypools";
import Farmingpools from "./pages/farmingpools";
import Address from "./pages/address";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="address" element={<Address />} />
        <Route path="topholders" element={<Topholders />} />
        <Route path="liquiditypools" element={<Liquiditypools />} />
        <Route path="farmingpools" element={<Farmingpools />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
