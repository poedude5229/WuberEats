import {useEffect,useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { loadRestaurantsThunk,editRestaurantThunk  } from '../../redux/restaurant'

const UpdatingRestaurant = () => {


const dispatch = useDispatch()
const navigate = useNavigate()
const {restaurantId} = useParams()


const restaurant = useSelector(state => state.restaurantReducer[+restaurantId])
console.log(restaurant);

const [address, setAddress] = useState(restaurant?.address || '')
const [name, setName] = useState(restaurant?.name || '')
const [phone_number, setPhoneNumber] = useState(restaurant?.phone_number || '')
const [cuisine, setCuisine] = useState(restaurant?.cuisine || '')
const [description, setDescription] = useState(restaurant?.description || '')
const [hours_of_operation, setHoursOfOperation] = useState(restaurant?.hours_of_operation || '')
const [delivery_radius, setDeliveryRadius] = useState(restaurant?.delivery_radius || '')
const [cover_image, setCoverImage] = useState(restaurant?.cover_image || '')
const [error, setError] = useState({})

const currentUser = useSelector(state => state.session.user)




useEffect(() => {
  if (restaurant) {
    setAddress(restaurant.address || '')
    setName(restaurant.name || '')
    setPhoneNumber(restaurant.phone_number || '')
    setCuisine(restaurant.cuisine || '')
    setHoursOfOperation(restaurant.hours_of_operation || '')
    setDeliveryRadius(restaurant.delivery_radius || '')
    setCoverImage(restaurant.cover_image || '')
  }
}, [restaurant])

useEffect(() => {
  if(!currentUser) navigate("/")

}, [navigate,currentUser])

const handleSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData()

  formData.append('name', name)
  formData.append('address', address)
  formData.append('phone_number', phone_number)
  formData.append('cuisine', cuisine)
  formData.append('description', description)
  formData.append('hours_of_operation', hours_of_operation)
  formData.append('delivery_radius', delivery_radius)
  formData.append('cover_image', cover_image)
  try {
    
    const updateRestaurant = await dispatch(editRestaurantThunk(restaurantId, formData));
    await dispatch(loadRestaurantsThunk(updateRestaurant))
    // console.log(`line 44, ${updateRestaurant}`)
    navigate(`/`)
    } catch (error) {
    console.error("Error updating restaurant:", error);
  }
}

useEffect(() => {
    const errObj = {}
    
    if(!address.length) errObj.address = "Address Required"
    if(!name.length) errObj.name = "Name Required"
    if(!phone_number.length) errObj.phone_number = "Phone Number Required"
    if(!cuisine.length) errObj.cuisine = "Cuisine required"
    if(!description.length) errObj.description = "Description required"
    if(!hours_of_operation.length) errObj.hours_of_operation = "Hours of operation required"
    if(!delivery_radius) errObj.delivery_radius = "Delivery Radius is required"
    if(!cover_image.length) errObj.cover_image = "CoverImage"


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
    <div>
      <h1>Update your restaurant now!!!</h1>
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
                type="text"
                name="phoneNumber" placeholder='Phone Number'
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
            </div>
            <div className="">
              {error.phone_number && <p>{error.phone_number}</p>}
            </div>
          <div className=''>
            <label>
              Cuisine:
              <input
                name="cuisine"
                type='text'
                value={cuisine}
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
              {/* {error.cuisine && <p>{error.cuisine}</p>} */}
            </div>
          <div className=''>
          <p>Describe You&apos;re Restaurant Nicely!!!!!!!!</p>
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
              <input
                name="hoursOfOperation"
                type='text'
                value={hours_of_operation}
                onChange={(e) => setHoursOfOperation(e.target.value)}
                >
                {/* <option value="" disabled>Select Hours of Operation</option>
                {hoursOptions.map((hours, index) => (
                <option key={index} value={hours}>{hours}</option>
              ))} */}
            </input>
          </label>
            <div className="">
              {error.hours_of_operation && <p>{error.hours_of_operation}</p>}
            </div>
        </div>
          <div className=''>
              <label>
                Delivery Radius:
              <input
                name="deliveryRadius"
                type='number'
                value={delivery_radius}
                onChange={(e) => setDeliveryRadius(e.target.value)}
                >
                {/* <option value="" disabled>Select Delivery Radius</option>
                {deliveryRadiusOptions.map((radius, index) => (
                <option key={index} value={radius}>{radius}</option> */}
                {/* ))} */}
            </input>
          </label>
          <div className="">
              {error.delivery_radius && <p>{error.delivery_radius}</p>}
            </div>
          <div className=''>
              <label>
                Cover Image:
                <input
                type="text"
                name="address" placeholder='Image url'
                value={cover_image}
                onChange={(e) => setCoverImage(e.target.value)}
                />
              </label>
            </div>
            <div className="">
              {error.cover_image && <p>{error.cover_image}</p>}
            </div>
          <div>
          <button type="submit" disabled={Object.values(error).length > 0}>Submit</button>
          </div>
        </div>

        </form>
    </div>
  )
  
}

export default UpdatingRestaurant