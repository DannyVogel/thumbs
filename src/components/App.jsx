import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Instructions from "./Instructions";
import Input from "./Input";
import Results from "./Results";



function App(){
    return (
        <div>
            <Header />
            <div className="main">
                <Nav />
                <div className="main-game">
                    <Instructions />
                    <Input />
                    <Results />
                </div>
            </div>
        </div>
    )
};

export default App;