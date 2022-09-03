import React from "react";

function Instructions(){
    return (
        <div>
          <h2 className="text-center">Challenge the hands to a thumb game!</h2>
            <h4>
                <ul>
                    <li>First, choose how many thumbs you want to raise.</li>
                    <li>Next, guess how many thumbs will be raised in total (yours + your opponent's).</li>
                    <li>If you guess the total correctly, you remove one hand! Guess correctly twice to win!</li>
                </ul>
            </h4>  
        </div>
    )
};

export default Instructions;