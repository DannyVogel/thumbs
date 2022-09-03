import React,{useState} from "react";

function Input() {
    const [clickedL, setclickedL] = useState(false)
    const [clickedR, setclickedR] = useState(false)
    const [inputMinL, setInputMinL] = useState(0)
    const [inputMinR, setInputMinR] = useState(0)
    
    const inputMin = inputMinL + inputMinR

    function handleClickL() {
        console.log(clickedL)
        setclickedL((prevState) => !prevState)
        setInputMinL(inputMinL === 0? 1 : 0) 
    }

    function handleClickR() {
        setclickedR((prevState) => !prevState)
        setInputMinR(inputMinR === 0? 1 : 0) 
    }

    return (
        <div className="container text-center">
                <div>
                    <button onClick={handleClickL} className={clickedL === true ? "btn btn-primary" : "btn btn-secondary"}>Left Thumb</button>{' '}
                    <button onClick={handleClickR} className={clickedR === true ? "btn btn-primary" : "btn btn-secondary"}>Right Thumb</button>{' '}
                </div>
                <br />
                <div className="d-grid gap-2">
                    <label htmlFor="guess"><strong>How many thumbs do you think will be raised in total?</strong></label>
{/* use HTML Select element or create buttons for pressing number of thumbs up (2nd better for when 1 point won) */}
                    <input className="col-2 align-center mx-auto" type="number" id="guess" maxlength="1" placeholder={inputMin === 0 ? "Total" : inputMin} min={inputMin} max="4" required autoFocus/>
                </div>
                <br />
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success">Play</button>
                </div>
        </div>
    )
}

export default Input;