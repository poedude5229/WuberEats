import { useEffect, useState } from "react";
import map from "../../../public/map.png";
import "./Checkout.css";
export function Checkout() {
  let [showTip, setShowTip] = useState(true);
  let [tip, setTip] = useState(0);
  let subtotal = parseFloat(localStorage.getItem("totalPrice"));
  const [final, setFinal] = useState(subtotal);
  useEffect(() => {
    setShowTip(true);
  }, []);

  const handleTipChange = (e) => {
    let val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setTip(val);
    }
  };

  const handleSubmit = (e) => {
    let newTotal = subtotal + +tip;
    setFinal((+newTotal).toFixed(2));
    setShowTip(false);
  };
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
      <h3 style={{ marginLeft: "50px" }}>Your order cost was ${final}</h3>
      <p style={{ marginLeft: "50px" }}>
        Your estimated delivery time will be after you fall asleep, leave the
        house or have something else to do. You may want to try ordering from
        your kitchen next time.
      </p>
      {showTip === false && (
        <>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: "900",
            }}
          >
            Thanks for your tip!
          </div>
        </>
      )}
      <img
        src={map}
        alt="deliverymap"
        style={{
          width: "800px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "23px",
          borderRadius: "12px",
        }}
      />

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
              style={{
                fontWeight: "600",
                marginLeft: "100px",
              }}
            >
              Make sure to tip your WuberDriver
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "12px",
              }}
            >
              <div className="tipBox">
                <p className="tipLabel">13%</p>
                <input
                  type="radio"
                  name="tip"
                  onClick={handleTipChange}
                  value={(subtotal * 0.13).toFixed(2)}
                />
                <p>${(subtotal * 0.13).toFixed(2)}</p>
              </div>
              <div className="tipBox">
                <p className="tipLabel">56%</p>
                <input
                  type="radio"
                  name="tip"
                  onClick={handleTipChange}
                  value={(subtotal * 0.56).toFixed(2)}
                />
                <p>${(subtotal * 0.56).toFixed(2)}</p>
              </div>
              <div className="tipBox">
                <p className="tipLabel">100%</p>
                <input
                  type="radio"
                  name="tip"
                  onClick={handleTipChange}
                  value={subtotal}
                />
                <p>${subtotal}</p>
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
                    onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
                  />
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
            onClick={() => handleSubmit}
          >
            Submit Tip!
          </button>
        </>
      )}
    </div>
  );
}
