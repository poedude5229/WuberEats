import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { postANewMenuForRestaurantThunk } from '../../redux/restaurant'


import './menuform.css'

const MenuForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

//   const user = useSelector(state => state.session.user)

  const {restaurantId} = useParams()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(1)
  const [category, setCategory] = useState('')
  // const [is_avaliable, setIs_avaliable] = useState(true)
  const [image_url, setImage_url] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit  = async (e) => {
    e.preventDefault()

    const formData = new FormData()

        formData.append('name', name)
        formData.append('description',description)
        formData.append('price', price)
        formData.append('category', category)
        // formData.append('is_avaliable', is_avaliable)
        formData.append('image_url', image_url)



    try {
        await dispatch(postANewMenuForRestaurantThunk(restaurantId, formData))
        navigate(`/restaurants/${restaurantId}`)

    } catch (error) {
        console.error("There was an error created a menu", error)
    }
  }


  useEffect(() => {
    const errorsObj = {}


        if(name.length < 3 || name.length > 55) errorsObj.name = 'Please provide a valid name between 3 and 55 characters'
        if(description.length < 10 || description.length > 255) errorsObj.description = 'Please provide a valid description between 10 and 255 characters'
        if(!isNaN(price) === false || price < 1) errorsObj.price = 'Please provide a price that is a number, greater than 0'
        if(!category) errorsObj.category = 'Please provide a valid category'
        if(image_url.length && !(image_url.endsWith('.png') || image_url.endsWith('.jpg') || image_url.endsWith('.jpeg') || image_url.endsWith('.webp'))) errorsObj.image_url = 'Image URL needs to end in png or jpg (or jpeg) and greater than 5 characters';

        setErrors(errorsObj)
  },[name, description, price, category, image_url])


    return (

        <div className='menu-form-con'>
        <h1 className='menu-form-h1'>Create a menu item!</h1>
        <div className='menu-item-description'>
            <h2 className='menu-item-h2'>What would you like people to be able to order from your restaurant?</h2>
            <p className='menu-item-desc'>Create a wonderful menu item that your customers can enjoy. Having a menu with more items gives you a better chance to get orders! </p>
        </div>

        <form className='menu-form' onSubmit={handleSubmit}>
            <p className='menu-name'>Name</p>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
            placeholder="name"
          />
          {errors.name && <p className='form-errors'>{errors.name}</p>}

            <p className='menu-name'>Description</p>
            <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
            placeholder="description"
          />
          {errors.description && <p className='form-errors'>{errors.description}</p>}

          <p className='menu-name'>Price</p>
            <input
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="price-input"
            placeholder="price"
          />
          {errors.price && <p className='form-errors'>{errors.price}</p>}




          <div className='catagories'>
            <div className='catagories-con'>
            <label>
              <p className='menu-name'>Categories:</p>
              <select
                name="category"
                className='select-field'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                <option value="" disabled>Select Category</option>
                <option value="Main Courses">Main Courses</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Sides">Sides</option>
                <option value="Beverages">Beverages</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Entrees">Entrees</option>
                </select>
              </label>

              {errors.category && <p className='form-errors'>{errors.category}</p>}
              </div>
          </div>

          <div className='catagories'>



            <p className='menu-name'>Menu Item Image</p>
            <input
            type="text"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
            className="image_url-input"
            placeholder="image url"
          />
          {errors.image_url && <p className='form-errors'>{errors.image_url}</p>}


          </div>
            <div className='btn-con'>
          <button disabled={Object.values(errors).length > 0} className="menu-submit" type="submit">
              Submit
            </button>
            </div>
    </form>
    </div>





  )
}





export default MenuForm
