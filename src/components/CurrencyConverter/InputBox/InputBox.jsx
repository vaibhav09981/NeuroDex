import React from "react";
import "./inputBox.css";
function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  amountDisable = false,
  currencyDisable = false,
  currencyOptions = [],
  selectCurrency = "usd",
}) {
  return (
    <div className="container">
      <div className="input-section">
        <label className="label-text">{label}</label>
        <input
          type="number"
          placeholder="0"
          className="input-field"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>

      <div className="currency-section">
        <p className="label-text">Currency Type</p>
        <select
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
          className="currency-select"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;