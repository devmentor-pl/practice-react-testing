import React, {useState} from 'react';


const Card = () => {
    const [number, setNumber] = useState('');
    const [card, setCard] = useState('');
    const [err, setErr] = useState('');

    const checkCard = (num) => {
        setCard('');
        setErr('')
        const dataCard = [
           {reg: /(5[1-5]{1}[0-9]{14})/, length: 16, cardName: 'Mastercard'},
           {reg: /(3[4,7]{1}[0-9]{13})/, length: 15, cardName: 'American Express'},
           {reg: /(4[0-9]{12})/, length: 13, cardName: 'Visa'},
           {reg: /(4[0-9]{15})/, length: 15, cardName: 'Visa'},
           {reg: /(3[0,6,8]{1}[0-9]{12})/, length: 14, cardName: 'Diners Club Carte Blanche'},
        ]
        const [validDataCard] = dataCard.filter(({reg, length})=>reg.test(num)&& num.length===length) || '';
        const cardName = validDataCard && validDataCard.cardName;
        if (cardName) setCard(cardName)
        else setErr('Niewłaściwy numer karty')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (number) {
            checkCard(number);
            setNumber('');
        } 
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Numer karty:
                <input name="number" value={number} onChange={(e)=>setNumber(e.target.value)}/>
            </label>
            <div>
                <button>send</button>
            </div>
            {card && <p className="info">{`Karta: ${card}`}</p>}
            {err && <p className="err">{err}</p>}
        </form>
    )
}


export default Card;