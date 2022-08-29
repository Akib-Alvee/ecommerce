import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
const App = ()=>{
    return (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Login/>}/> */}
            <Route path="/" element={<HomePage/>}/>
            {/* <Route element={<PageNotFound/>}/> */}
        </Routes>
    </BrowserRouter>
    )
}

export default App;