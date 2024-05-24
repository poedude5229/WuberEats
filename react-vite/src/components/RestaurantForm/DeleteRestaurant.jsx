import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteRestaurantThunk } from "../../redux/restaurant";
import { useDispatch } from "react-redux";

const DeleteRestaurantModal = ({ restaurantId }) => {
  // console.log(restaurantId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteRestaurantThunk(restaurantId));
      closeModal();
      navigate("/");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <div style={{ borderRadius: "12px" }} className="">
        <div className="rest-modal">
      <form onSubmit={handleDelete} className="">
          <h2>Confirm Delete</h2>

        <div className="">
          <p>Are you sure you want to remove this Restaurant?</p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "space-around",
            marginBottom: "8px",
          }}
          className="btn-con"
        >
          <button
            style={{
              height: "50px",
              color: "black",
              backgroundColor: "red",
              cursor: "pointer",
                          border: "none",
              fontWeight: "600"
            }}
            onClick={handleDelete}
            type="submit"
            className=""
          >
            Yes (Delete Restaurant)
          </button>
          <button
            style={{
              height: "50px",
              color: "white",
              backgroundColor: "black",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => closeModal()}
            className=""
          >
            No (Keep Restaurant)
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default DeleteRestaurantModal;
