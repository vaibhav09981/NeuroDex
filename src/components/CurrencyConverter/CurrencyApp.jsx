import { useState, useRef, useLayoutEffect } from 'react'
import InputBox from './InputBox/InputBox'
import useCurrencyInfo from '../../Hooks/useCurrencyInfo'
import swapIcon from '/assets/Images/swap.svg'
import './CurrencyApp.css'
import gsap from 'gsap'

function CurrencyApp() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmt, setConvertedamt] = useState(0)
  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  // Add refs for animation
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const fromBoxRef = useRef(null);
  const toBoxRef = useRef(null);
  const buttonRef = useRef(null);

  // Add animation effect
  useLayoutEffect(() => {
    // Set initial visibility
    gsap.set([headingRef.current, formRef.current, fromBoxRef.current, toBoxRef.current, buttonRef.current], {
      opacity: 0,
      y: 30
    });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.out',
      }
    });

    tl.to(headingRef.current, {
      duration: 1,
      opacity: 1,
      y: 0,
    })
    .to(formRef.current, {
      duration: 0.6,
      opacity: 1,
      y: 0,
    }, '-=0.5')
    .to(fromBoxRef.current, {
      duration: 0.6,
      opacity: 1,
      y: 0,
    }, '-=0.3')
    .to(toBoxRef.current, {
      duration: 0.6,
      opacity: 1,
      y: 0,
    }, '-=0.3')
    .to(buttonRef.current, {
      duration: 0.6,
      opacity: 1,
      y: 0,
    }, '-=0.3');

  }, []);

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedamt(Number((amount * currencyInfo[to]).toFixed(3)))
  }

  return (
    <>
      <div className="mainbody">
        {/* <div className="overlay">< */}
        <h1 className='heading' ref={headingRef}>Currency Convertor</h1>
        <div className='formbox'>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}>
            <div className="fromBox" ref={fromBoxRef}>
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="swapDiv">
              <button
                type="button"
                onClick={swap}
              >
                <img src={swapIcon} alt="swap" />
              </button>
            </div>
            <div className="toBox" ref={toBoxRef}>
              <InputBox
                label="To"
                amount={convertedAmt}
                currencyOptions={options}
                selectCurrency={to}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisable
              />
            </div>
            <button type="submit" className="convertBtn" ref={buttonRef}>
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CurrencyApp