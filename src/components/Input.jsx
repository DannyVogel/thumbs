import React,{useState} from "react";


function Input() {
    const [clicked, setClicked] = useState({
        clickedL: false,
        clickedR: false,
        numThumb: 0
    })

    function handleClick(event) {
        const {name, value} = event.target 

        setClicked(prevState => ({
            ...prevState,
            [name]: !prevState[name],
            numThumb: (!prevState[name] ? prevState.numThumb+1 : prevState.numThumb-1)

        }))
    }

const styles1 = {
    backgroundColor: clicked.clickedL === true ? "blue" : "gray"
}
const styles2 = {
    backgroundColor: clicked.clickedR === true ? "blue" : "gray"
}

console.log(clicked)

    return (
        <div>
                <div>
                    <button onClick={handleClick} name="clickedL" value={clicked.clickedL} style={styles1}>Left Thumb</button>{' '}
                    <button onClick={handleClick} name="clickedR" value={clicked.clickedR} style={styles2}>Right Thumb</button>{' '}
                </div>
                <br />
                <div>
                    <label htmlFor="guess"><strong>How many thumbs do you think will be raised in total?</strong></label>
{/* use HTML Select element or create buttons for pressing number of thumbs up (2nd better for when 1 point won) */}
                    <input type="number" id="guess" maxLength="1" placeholder={clicked.numThumb} min={clicked.numThumb} max="4" required autoFocus/>
                </div>
                <br />
                <div>
                    <button type="submit">Play</button>
                </div>
        </div>
    )
}

export default Input;