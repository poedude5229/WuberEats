import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import { postANewMenuForRestaurantThunk } from '../../redux/restaurant'

import './menuform.css'

const MenuForm = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.session.user)
  
  const {restaurantId} = useParams() 

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [is_avaliable, setIs_avaliable] = useState('')
  const [image_url, setImage_url] = useState('')
  const [errors, setErrors] = useState({})
  
  const handleSubmit  = async (e) => {
    e.preventDefault()
    

    try {
        await dispatch(postANewMenuForRestaurantThunk(restaurantId))
        redirect(`/restaurants/${restaurantId}`)

    } catch (error) {
        console.error("There was an error created a menu", error)
    }
  }
  

  useEffect(() => {
    const errorsObj = {}


        if(!name) errorsObj.name = 'Please provide a valid name'
        if(!description) errorsObj.description = 'Please provide a valid description'
        if(!isNaN(price) === false || price.length < 1) errorsObj.price = 'Please provide a price that is a number'
        if(!category) errorsObj.category = 'Please provide a valid category'
        if(!is_avaliable) errorsObj.is_avaliable = 'Please provide a valid avaliabliliy'

        setErrors(errorsObj)
  },[name, description, price, category, is_avaliable])
  
  
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

            <p className='menu-description'>Description</p>
            <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
            placeholder="description"
          />
          {errors.description && <p className='form-errors'>{errors.description}</p>}
        
          <p className='menu-price'>Price</p>
            <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="price-input"
            placeholder="price"
          />
          {errors.price && <p className='form-errors'>{errors.price}</p>}

          

         
          <div className='catagories'>
            <label>
              Catagories:
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
        </form>

        
        
        
        
    </div>
  )
}





export default MenuForm
