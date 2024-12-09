import useCardValidator from "./hooks/useCardValidator";

export const CreditCard = () => {
  const [updateCard, cardNumber, isCorrect, provider] = useCardValidator();

  return (
    <form>
      <div>
        <label>
          Card Number
          <input
            name="cc-number"
            value={cardNumber}
            onChange={(e) => updateCard(e.target.value)}
          />
          {provider && <i>{provider}</i>}
          {!isCorrect && <strong>Wrong date</strong>}
        </label>
        <div>
          <input type="submit" />
        </div>
      </div>
    </form>
  );
};
