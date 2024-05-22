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

const hoursOptions = [
  "8am-5pm", "9am-6pm", "10am-7pm", "11am-8pm",
  "12pm-9pm", "1pm-10pm", "2pm-11pm", "3pm-12am",
  "4pm-1am", "5pm-2am", "6pm-3am"
];
const deliveryRadiusOptions = [
  "1 mile", "2 miles", "3 miles", "5 miles", "10 miles", "15 miles", "20 miles"
];

  return (
    <div>
      <h1>Add a restaurant now!!!</h1>
        <form className='' onSubmit={handleSubmit}>
            <div className=''>
              <label>
                Address:
                <input
                type="text"
                name="address" placeholder='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            </div>
            <div className="">
              {error.address && <p>{error.address}</p>}
            </div>
            <div className=''>
              <label>
                Restaurant Name:
                <input
                type="text"
                name="name" placeholder='Restaurant Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="" >
              {error.name && <p>{error.name}</p>}
            </div>
            <div className=''>
              <label>
                Phone Number:
                <input
                type="number"
                name="phoneNumber" placeholder='Phone Number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
            </div>
            <div className="">
              {error.phoneNumber && <p>{error.phoneNumber}</p>}
            </div>
          <div className=''>
            <label>
              Cuisine:
              <select
                name="cuisine"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                >
                <option value="" disabled>Select Cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="French">French</option>
                <option value="Thai">Thai</option>
                <option value="Greek">Greek</option>
                <option value="Spanish">Spanish</option>
                </select>
              </label>
          </div>
          <div className="">
              {error.cuisine && <p>{error.cuisine}</p>}
            </div>
          <div className=''>
            <p>Describe You're Restaurant Nicely!!!!!!!!</p>
          <textarea placeholder="30 Characters are needed at minimun"
                cols="45"
                rows="8"
                minLength={30}
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                >
          </textarea>
        </div>
        <div className="">
              {error.description && <p>{error.description}</p>}
            </div>
        <div className=''>
          <label>
              Hours of Operation:
              <select
                name="hoursOfOperation"
                value={hoursOfOperation}
                onChange={(e) => setHoursOfOperation(e.target.value)}
                >
                <option value="" disabled>Select Hours of Operation</option>
                {hoursOptions.map((hours, index) => (
                <option key={index} value={hours}>{hours}</option>
              ))}
            </select>
          </label>
            <div className="">
              {error.hoursOfOperation && <p>{error.hoursOfOperation}</p>}
            </div>
        </div>
          <div className=''>
              <label>
                Delivery Radius:
              <select
                name="deliveryRadius"
                value={deliveryRadius}
                onChange={(e) => setDeliveryRadius(e.target.value)}
                >
                <option value="" disabled>Select Delivery Radius</option>
                {deliveryRadiusOptions.map((radius, index) => (
                <option key={index} value={radius}>{radius}</option>
                ))}
            </select>
          </label>
          <div className="">
              {error.deliveryRadius && <p>{error.deliveryRadius}</p>}
            </div>
          <div className=''>
              <label>
                Cover Image:
                <input
                type="text"
                name="address" placeholder='Image url'
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                />
              </label>
            </div>
            <div className="">
              {error.coverImage && <p>{error.coverImage}</p>}
            </div>
          <div>
          <button type="submit" disabled={Object.values(error).length > 0}>Submit</button>
          </div>
        </div>

        </form>
    </div>
  )
}

export default RestaurantCreation