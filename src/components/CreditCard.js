import useCreditCardValidator from "../components/hooks/useCreditCardValidator";

const CreditCard = () => {
  const [updateCardNumber, cardNum, isCorrect, provider] =
    useCreditCardValidator();

  return (
    <section>
      <form>
        <div>
          <label>
            Credit Card Number
            <input
              name="cc-number"
              value={cardNum}
              onChange={(e) => updateCardNumber(e.target.value)}
            />
            {provider && <small>{provider}</small>}
            {!isCorrect && <strong>Nieprawidłowe dane!</strong>}
          </label>
          <input type="submit" />
        </div>
      </form>
    </section>
  );
};

export default CreditCard;
