import { useEffect, useState } from "react";
import map from "../../../public/map.png";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const [showTip, setShowTip] = useState(true);
  const [tip, setTip] = useState(0);
  const subtotal = parseFloat(localStorage.getItem("totalPrice")) || 0;
  const [final, setFinal] = useState(subtotal);
  const [navigationMessage, setNavigationMessage] = useState("");
  const [countdown, setCountdown] = useState(5);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setShowTip(true);
  }, []);

  const handleTipChange = (e) => {
    const val = e.target.value;
    // Check if the input is a valid number
    if (val === "" || (/^\d*\.?\d*$/.test(val) && !isNaN(parseFloat(val)))) {
      setTip(val);
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const handleInputFocus = (e) => {
    if (e.target.value === "0") {
      setTip("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tipValue = parseFloat(tip);
    if (!isNaN(tipValue) && tipValue > 0) {
      const newTotal = subtotal + tipValue;
      setFinal(newTotal.toFixed(2));
      setShowTip(false);
      setNavigationMessage(
        `You will be navigated back to the home page in ${countdown} seconds...`
      );
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(interval);
            navigate("/");
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      setError("Please leave a valid tip amount");
    }
  };

  useEffect(() => {
    if (tip === "" || parseFloat(tip) < 0 || isNaN(parseFloat(tip))) {
      setError("Please leave a valid tip amount");
    } else {
      setError("");
    }
  }, [tip]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>
        Thanks for your order!
      </h1>
      <h3 id="final-cost" style={{ marginLeft: "50px" }}>Your order cost was ${final}</h3>
      <p id="est-time">
        Your estimated delivery time will be after you fall asleep, leave the
        house, or have something else to do. You may want to try ordering from
        your kitchen next time.
      </p>
      {!showTip && (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: "900",
          }}
        >
          Thanks for your tip! We don&apos;t pay our drivers, so 25% of your tips
          go directly to them
        </div>
      )}
      <img src={map} alt="deliverymap" id="mapIMG" />

      {showTip && (
        <>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "12px",
            }}
          >
            <span
              
              id="plstip"
            >
              Make sure to tip your WuberDriver
            </span>
            <div id="tipbox-holder"

            >
              <div className="tipBox">
                <p className="tipLabel">13%</p>
                <input
                  type="radio"
                  name="tip"
                  onClick={handleTipChange}
                  value={(subtotal * 0.13).toFixed(2)}
                  readOnly
                />
                <p className="tipValue">${(subtotal * 0.13).toFixed(2)}</p>
              </div>
              <div className="tipBox">
                <p className="tipLabel">56%</p>
                <input
                  type="radio"
                  name="tip"
                  onClick={handleTipChange}
                  value={(subtotal * 0.56).toFixed(2)}
                  readOnly
                />
                <p className="tipValue">${(subtotal * 0.56).toFixed(2)}</p>
              </div>
              <div className="tipBox">
                <p className="tipLabel">100%</p>
                <input
                  type="radio"
                  name="tip"
                  onClick={handleTipChange}
                  value={subtotal}
                  readOnly
                />
                <p className="tipValue">${subtotal}</p>
              </div>
              <div className="tipBox">
                <p className="tipLabel">Custom</p>
                <label
                  style={{ marginLeft: "10px", paddingBottom: "4px" }}
                  htmlFor="tipInput"
                >
                  Tip Amount:{" "}
                  <input
                    style={{ marginLeft: "10px" }}
                    id="tipInput"
                    type="number"
                    value={tip}
                    min={0}
                    onFocus={handleInputFocus}
                    onChange={handleTipChange}
                  />
                  {error && <p className="error-message">{error}</p>}
                </label>
              </div>
            </div>
          </div>
          <button
            style={{
              marginTop: "14px",
              width: "100px",
              marginLeft: "auto",
              marginRight: "auto",
              height: "50px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "900",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
            disabled={Object.values(error).length > 0}
          >
            Submit Tip!
          </button>
        </>
      )}
      {navigationMessage && (
        <div
          style={{
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: "600",
            color: "red",
          }}
        >
          {navigationMessage} {countdown}
        </div>
      )}
    </div>
  );
}
