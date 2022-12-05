import React from "react";
import Header from "./Header";
import Instructions from "./Instructions";
import Input from "./Input";
import Footer from "./Footer";



function App(){
    return (
        <div className="main">
            <Header />
                <div className="main-game">
                    <Instructions />
                    <Input />
                </div>
            <Footer />
        </div>
    )
};

export default App;