import {useEffect,useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { createRestaurantThunk,loadRestaurantsThunk  } from '../../redux/restaurant'
import './restaurant.css'


const RestaurantCreation = () => {


const dispatch = useDispatch()
const navigate = useNavigate()


const [address, setAddress] = useState('')
const [name, setName] = useState('')
const [phone_number, setPhoneNumber] = useState('')
const [cuisine, setCuisine] = useState('')
const [description, setDescription] = useState('')
const [hours_of_operation, setHoursOfOperation] = useState('')
const [delivery_radius, setDeliveryRadius] = useState('')
const [cover_image, setCoverImage] = useState('')
const [error, setError] = useState({})

const currentUser = useSelector(state => state.session.user)
// console.log(currentUser)


useEffect(() => {
  if(!currentUser) navigate("/")

}, [navigate,currentUser])

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData()

        formData.append('name', name)
        formData.append('address', address)
        formData.append('phone_number', phone_number)
        formData.append('cuisine', cuisine)
        formData.append('description', description)
        formData.append('hours_of_operation', hours_of_operation)
        formData.append('delivery_radius', delivery_radius)
        formData.append('cover_image', cover_image)
  // console.log(restaurant)
  try {
    const newRestaurant = await dispatch(createRestaurantThunk(formData));

    await dispatch(loadRestaurantsThunk(newRestaurant.id))
    console.log(newRestaurant)
    navigate(`/restaurants/${newRestaurant.id}`)
  } catch (error) {
    console.error("Error creating restaurant:", error);
  }
} 

useEffect(() => {
    const errObj = {}

    if(address.length < 5 || address.length > 100) errObj.address = "Address is Required and must be between 5 and 100 characters"
    if(name.length < 5 || name.length > 50) errObj.name = "Name is Required and must be between 5 and 50 characters"
    if(phone_number.length != 10 || phone_number.length > 10) errObj.phone_number = "Phone Number is Required and must be 10 digits "
    if(cuisine.length < 5 || cuisine.length > 20) errObj.cuisine = "Cuisine is required and must be between 5 and 20 characters"
    if(description.length < 30 || description.length > 255) errObj.description = "Description is required and must be between 30 and 255 characters"
    if(hours_of_operation.length < 5 || hours_of_operation.length > 255) errObj.hoursOfOperation = "Hours of operation required and must be between 5 and 255 characters"
    if(delivery_radius < 1) errObj.deliveryRadius = "Delivery Radius must be greater than 0"
    // if(!cover_image.length) errObj.cover_image = "CoverImage"
    if(cover_image.length && !(cover_image.endsWith('.png') || cover_image.endsWith('.jpg') || cover_image.endsWith('.jpeg') || cover_image.endsWith('.webp'))) errObj.cover_image = 'Image URL needs to end in png or jpg (or jpeg) and greater than 5 characters';


    setError(errObj)

}, [address,name,phone_number,cuisine,description,hours_of_operation,delivery_radius,cover_image])

// const hoursOptions = [
//   "8am-5pm", "9am-6pm", "10am-7pm", "11am-8pm",
//   "12pm-9pm", "1pm-10pm", "2pm-11pm", "3pm-12am",
//   "4pm-1am", "5pm-2am", "6pm-3am"
// ];
// const deliveryRadiusOptions = [
//   "1 mile", "2 miles", "3 miles", "5 miles", "10 miles", "15 miles", "20 miles"
// ];

  return (
    <div className='add-rest-con'>
      <h1 className='rest-h1'>Add a restaurant!!!</h1>
        <form style={{display: "flex", flexDirection: "column", gap: "8px"}} className='rest-form' onSubmit={handleSubmit}>
            <div className='rest-inputs-con'>
              <label>
                Address:{" "}
                <input
                type="text"
                name="address" placeholder='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            
            <div className="">
              {error.address && <p className='errors-res'>{error.address}</p>}
            </div>
            <div className=''>
              <label className='cui-text'>
                Restaurant Name:{" "}
                <input
                type="text"
                name="name" placeholder='Restaurant Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="" >
              {error.name && <p className='errors-res'>{error.name}</p>}
            </div>
            <div className=''>
              <label className='cui-text'>
                Phone Number:{" "}
                <input
                type="text"
                name="phoneNumber" placeholder='Phone Number'
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
            </div>
            <div className="">
              {error.phone_number && <p className='errors-res'>{error.phone_number}</p>}
            </div>
          <div className=''>
            <label className='cui-text'>
              Cuisine:{" "}
              <input
                name="cuisine"
                type='text'
                className='cui-input'
              value={cuisine}
              placeholder='What type of food do you serve?'
                onChange={(e) => setCuisine(e.target.value)}
                >
                {/* <option value="" disabled>Select Cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="French">French</option>
                <option value="Thai">Thai</option>
                <option value="Greek">Greek</option>
                <option value="Spanish">Spanish</option> */}
                </input>
              </label>
          </div>
          <div className="">
              {error.cuisine && <p className='errors-res'>{error.cuisine}</p>}
            </div>
          <div className=''>
          <p>Describe Your Restaurant:</p>
          <textarea placeholder="30 Characters are needed at minimum. What's something unique about your restaurant? Add details that will draw customers in."
                cols="45"
                rows="8"
                minLength={30}
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                >
          </textarea>
        </div>
        <div className="">
              {error.description && <p className='errors-res'>{error.description}</p>}
            </div>
        <div className=''>
          <label className='cui-text'>
              Hours of Operation:
              <input
                name="hoursOfOperation"
                type='text'
              value={hours_of_operation}
              placeholder="AM to PM and the days open"
                onChange={(e) => setHoursOfOperation(e.target.value)}
                >
                {/* <option value="" disabled>Select Hours of Operation</option>
                {hoursOptions.map((hours, index) => (
                <option key={index} value={hours}>{hours}</option>
              ))} */}
            </input>
          </label>
            <div className="">
              {error.hoursOfOperation && <p className='errors-res'>{error.hoursOfOperation}</p>}
            </div>
        </div>
          <div className=''>
              <label>
                Delivery Radius:{" "}
              <input
                name="deliveryRadius"
                type='number'
                value={delivery_radius}
                onChange={(e) => setDeliveryRadius(e.target.value)}
                />
                {/* <option value="" disabled>Select Delivery Radius</option>
                {deliveryRadiusOptions.map((radius, index) => (
                <option key={index} value={radius}>{radius}</option> */}
                {/* ))} */}
            {/* </input> */}
          </label>
          <div className="">
              {error.deliveryRadius && <p className='errors-res'>{error.deliveryRadius}</p>}
            </div>
          <div className=''>
              <label>
                Cover Image:{" "}
                <input
                type="text"
                name="address" placeholder='Image url'
                value={cover_image}
                onChange={(e) => setCoverImage(e.target.value)}
                />
              </label>
            </div>
            <div className="">
              {error.cover_image && <p className='errors-res'>{error.cover_image}</p>}
            </div>
          <div>
          </div>
          <div className='res-btn-con'>
          <button type="submit" disabled={Object.values(error).length > 0} className='restaurant-create-btn'>Submit</button>
          </div>
          </div>
        </div>

        </form>
    </div>
  )
}

export default RestaurantCreation
