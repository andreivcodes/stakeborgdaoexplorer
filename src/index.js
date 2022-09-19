import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/home";
import Liquiditypools from "./pages/liquiditypools";
import Farmingpools from "./pages/farmingpools";
import Fees from "./pages/fees";
import Governance from "./pages/governance";
import ILSIStats from "./pages/ilsistats";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

//import SurpriseSanta from "surprise-santa";

//snowflakes.start();
ReactDOM.render(
  <ChakraProvider>
    {/*  <SurpriseSanta minTime={15} maxTime={25} /> */}
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/liquiditypools" element={<Liquiditypools />} />
        <Route path="/farmingpools" element={<Farmingpools />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/ilsistats" element={<ILSIStats />} />
      </Routes>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
