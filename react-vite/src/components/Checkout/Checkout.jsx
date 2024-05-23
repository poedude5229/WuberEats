export function Checkout() {
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
      <h3 style={{marginLeft: "50px"}}>Your total cost was ${localStorage.getItem("totalPrice")}</h3>
      <p style={{marginLeft: "50px"}}>
        Your estimated delivery time will be after you fall asleep, leave the
        house or have something else to do. You may want to try ordering from
        your kitchen next time.
      </p>
    </div>
  );
}
