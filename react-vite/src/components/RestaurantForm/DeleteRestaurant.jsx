
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal'
import { deleteRestaurantThunk } from '../../redux/restaurant'
import { useDispatch } from 'react-redux';

const DeleteRestaurantModal = ({restaurantId}) => {
    console.log(restaurantId)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { closeModal } = useModal()

const handleDelete = async (e) => {
    e.preventDefault()
    try {
    

    await dispatch(deleteRestaurantThunk(restaurantId))
    closeModal()
    navigate('/')
    
    } catch (error) {
        console.error("Error deleting restaurant:", error);
    }
}



return (
    <div className="">
        <form onSubmit={handleDelete} className="">
            <div className="">
                <h2>Confirm Delete</h2>
            </div>
            <div className="">
                <p>Are you sure you want to remove this Restaurant?</p>
            </div>
            <div className="">
                <button onClick={handleDelete} type="submit" className="">Yes (Delete Restaurant)</button>
            <button onClick={() => closeModal()} className="">No (Keep Restaurant)</button>
            </div>
        </form>
    </div>
);
};



export default DeleteRestaurantModal