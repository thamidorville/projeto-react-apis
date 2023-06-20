import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Pokedex } from "../pages/Pokedex";
import { DetailsPage } from "../pages/DetailsPage";


export const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/pokedex" element={<Pokedex/>}/>
            <Route path="/pokemon/:id" element={<DetailsPage/>}/>
        </Routes>
        </BrowserRouter>
    )
}
