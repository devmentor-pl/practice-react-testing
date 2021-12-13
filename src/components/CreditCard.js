import React, { useState } from "react";
import {
    create16digitsCardNum,
    luhnAlg,
    checkCardType,
} from "./CreditCardValidation";

const CreditCard = () => {
    const [card, setCard] = useState("");
    const [msg, setMsg] = useState("");

    const validate = (num) => {
        const cardNum = create16digitsCardNum(num);
        if (cardNum !== undefined) {
            const output = luhnAlg(cardNum) % 10;
            const cardType = checkCardType(cardNum);
            if (output === 0) {
                setMsg(`Credit card is valid and it is ${cardType}`);
            } else {
                setMsg("Credit card is invalid");
            }
        } else {
            setMsg("Please enter at least 13 digits card number");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCard("");
        validate(card);
    };

    const handleChange = (e) => {
        setCard(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>
                    Credit card number:
                    <input
                        name="card"
                        type="number"
                        value={card}
                        onChange={(e) => handleChange(e)}
                    />
                    {<strong>{msg}</strong>}
                </label>
            </p>
            <p>
                <button>Check</button>
            </p>
        </form>
    );
};

export default CreditCard;