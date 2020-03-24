import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
}

export default App;
