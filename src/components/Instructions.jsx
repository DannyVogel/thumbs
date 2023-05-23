import React from "react";

function Instructions(){
    return (
        <div className="instructionContainer">
            <h2>Challenge the hands to a thumb game!</h2>
            <ul>
                <li>First, choose how many thumbs you want to raise.</li>
                <li>Next, guess how many thumbs will be raised in total (yours + your opponent's).</li>
                <li>If you guess the total correctly, you remove one hand! Guess correctly twice to win!</li>
            </ul>
        </div>
    )
};

export default Instructions;