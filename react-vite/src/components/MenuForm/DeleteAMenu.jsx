import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteAMenuBasedOffARestaurantThunk } from "../../redux/restaurant"
// import { useEffect } from "react";
// import { useParams } from "react-router-dom"





export const DeleteAMenu = ({menuId}) => {

    // const {spotId} = useParams()
    // console.log(spotId);
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    
    const deleteYourMenu = async(e) => {
        e.preventDefault()


        await dispatch(deleteAMenuBasedOffARestaurantThunk(menuId))
        closeModal()
    }


    

return (
    <div className="delete-your-menu-con">
        <form onSubmit={deleteYourMenu} className="delete-form-container">
        <h2 className="delete-warning">Are you sure you want to remove this menu from your restaurant?</h2>

        <div className="warning-message">
            <p className="warning">{'ARE YOU SURE YOUR WANT TO DELETE THIS MENU!'}</p>
            <p className="last-warning">{'(DELETED MENUS CANNOT BE UNDONE)'}</p>

        </div>

    <div className="button-delete-con">
        <button className="yes-btn-delete" type="submit">{`Yes(Delete Menu)`}</button>
        <button onClick={() => closeModal()} className="no-btn-del">{`No(Keep Menu)`}</button>
    </div>
        


        </form>
    </div>
  )
}



export default DeleteAMenu;