import rr from "../../../public/rr.mp4";
function RickModal() {
  return (
    <>
      <video
        style={{ pointerEvents: "none", }}
        src={rr}
        controls={false}
        autoPlay
      ></video>
    </>
  );
}

export default RickModal;
