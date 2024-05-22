import React from 'react'
import { useModal } from '../../context/Modal'
import { deleteRestaurantThunk } from '../../redux/restaurant'

const DeleteRestaurant = ({restaurandId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

const handleDelete = async (e) => {
    e.preventdefault()
    try {
    

    await dispatch(deleteRestaurantThunk(restaurandId))
    closeModal()
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
                <button type="submit" className="">Yes (Delete Restaurant)</button>
            <button onClick={() => closeModal()} className="">No (Keep Restaurant)</button>
            </div>
        </form>
    </div>
);
};



export default DeleteRestaurant