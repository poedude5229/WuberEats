import {useEffect,useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { createRestaurantThunk,loadRestaurantsThunk  } from '../../redux/restaurant'

const RestaurantCreation = () => {

const dispatch = useDispatch()
const navigate = useNavigate()


const [address, setAddress] = useState('')
const [name, setName] = useState('')
const [phoneNumber, setPhoneNumber] = useState('')
const [cuisine, setCuisine] = useState('')
const [description, setDescription] = useState('')
const [hoursOfOperation, setHoursOfOperation] = useState('')
const [deliveryRadius, setDeliveryRadius] = useState('')
const [coverImage, setCoverImage] = useState('')
const [error, setError] = useState({})

const currentUser = useSelector(state => state.session['user'])


useEffect(() => {
  if(!currentUser) navigate("/")

}, [navigate,currentUser])

const handleSubmit = async (e) => {
  try {
    const restaurant = {
      ownerId: currentUser.id,
      address,
      name,
      phoneNumber,
      cuisine,
      description,
      hoursOfOperation,
      deliveryRadius,
      coverImage
    }
    const newRestaurant = await dispatch(createRestaurantThunk(restaurant));

    await dispatch(loadRestaurantsThunk(newRestaurant.id))

    navigate(`/restaurants/${restaurant.id}`)
  } catch (error) {
    console.error("Error creating restaurant:", error);
  }
}

useEffect(() => {
    const errObj = {}
    
    if(!address.length) errObj.address = "Address Required"
    if(!name.length) errObj.name = "Name Required"
    if(!phoneNumber.length) errObj.phoneNumber = "Phone Number Required"
    if(!cuisine.length) errObj.cuisine = "Cuisine required"
    if(!description.length) errObj.description = "Description required"
    if(!hoursOfOperation.length) errObj.hoursOfOperation = "Hours of operation required"
    if(!deliveryRadius.length) errObj.deliveryRadius = "Delivery Radius required"
    if(!coverImage.length) errObj.coverImage = "CoverImage"


    setError(errObj)

}, [address,name,phoneNumber,cuisine,description,hoursOfOperation,deliveryRadius,coverImage])



  return (
    <div>
      
    </div>
  )
}

export default RestaurantCreation