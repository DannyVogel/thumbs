import React, {useState, useEffect} from "react";
import Results from "./Results";


function Input() {
    const [clicked, setClicked] = useState({
        clickedL: false,
        clickedR: false,
        numThumb: 0,
        guess: 0
    })

    const [show, setShow] = useState(false)

    function handleClick(event) {
        const {name, value} = event.target 

        setClicked(prevState => ({
            ...prevState,
            [name]: !prevState[name],
            numThumb: (!prevState[name] ? prevState.numThumb+1 : prevState.numThumb-1),
            guess: (!prevState[name] ? prevState.numThumb+1 : prevState.numThumb-1)
        }))
    }

    // useEffect(() => {
    //     /* clicked.numThumb++ works (if i include an if or something to subtract too) but doesnt this modify state directly which is wrong?*/
    //     setClicked(prevState => ({
    //         ...prevState,
    //         numThumb: (clicked.clickedL ? prevState.numThumb+1 : prevState.numThumb-1)
    //     })) /*this creates infinite loop */
    // }), [clicked.clickedL, clicked.clickedR]

    function handleChange() {
        const {name, value} = event.target 
        setClicked(prevState => ({
            ...prevState,
            [name]: parseInt(value),
        }))
    }

    function handleSubmit (){
        setShow(prevState => !prevState)
    }

const styles1 = {
    backgroundColor: clicked.clickedL === true ? "#C060A1" : null
}
const styles2 = {
    backgroundColor: clicked.clickedR === true ? "#C060A1" : null
}

    return (
        <div>
                <div>
                    <button className="button" onClick={!show ? handleClick : undefined} name="clickedL" value={clicked.clickedL} style={styles1}>Left Thumb</button>{' '}
                    <button className="button" onClick={!show ? handleClick : undefined} name="clickedR" value={clicked.clickedR} style={styles2}>Right Thumb</button>{' '}
                </div>
                <br />
                <div>
                    <label htmlFor="guess"><strong>How many thumbs do you think will be raised in total? </strong></label>
{/* use HTML Select element or create buttons for pressing number of thumbs up (2nd better for when 1 point won) */}
                    <br />
                    <br />
                    <input type="number" name="guess" onChange={!show ? handleChange : undefined} value={clicked.guess} maxLength="1" placeholder={clicked.numThumb} min={clicked.numThumb} max="4" required autoFocus/>
                </div>
                <br />
                <div>
                    <button className="button submit" type="submit" onClick={handleSubmit}>{show ? "PLAY AGAIN" : "PLAY"}</button>
                </div>
                <br />
                {!show && <img className="fist-bump-img" src="../fist-bump.png" alt="fist bump" /> }
                {show ? <Results guess={clicked.guess} p1Total={clicked.numThumb} /> : <h1>Good luck!</h1>}
        </div>
    )
}

export default Input;