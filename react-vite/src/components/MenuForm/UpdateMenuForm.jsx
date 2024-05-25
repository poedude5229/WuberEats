import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateAMenuForARestaurantThunk } from "../../redux/restaurant";

import "./menuform.css";

const UpdateMenuForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const user = useSelector(state => state.session.user)

  const { menuId, restaurantId } = useParams();
  const menuItem = useSelector(
    (state) => state.restaurantReducer[restaurantId].menu_items[0]
  );
  // console.log('menu', menuItem);
  // console.log(menuId)
  const [name, setName] = useState(menuItem?.name);
  const [description, setDescription] = useState(menuItem?.description);
  const [price, setPrice] = useState(menuItem?.price);
  const [category, setCategory] = useState(menuItem?.category);
  const [is_avaliable, setAvaliable] = useState(menuItem?.is_avaliable);
  const [image_url, setImage_url] = useState(menuItem?.image_url);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (menuItem) {
      setName(menuItem.name || "");
      setDescription(menuItem.description || "");
      setPrice(menuItem.price || "");
      setCategory(menuItem.category || "");
      setAvaliable(menuItem.is_avaliable || "");
      setImage_url(menuItem.image_url || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData();

    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("price", price);
    // formData.append("category", category);
    // formData.append("is_avaliable", is_avaliable);
    // formData.append("image_url", image_url);
    const formData = {
      name,
      description,
      price,
      category,
      is_avaliable,
      image_url,
    };
    console.log(formData);
    dispatch(updateAMenuForARestaurantThunk(restaurantId, formData, menuId));
    navigate(`/restaurants/${restaurantId}`);
  };

  useEffect(() => {
    const errorsObj = {};

    if(name.length < 3 || name.length > 55) errorsObj.name = 'Please provide a valid name between 3 and 55 characters'
    if(description.length < 10 || description.length > 255) errorsObj.description = 'Please provide a valid description between 10 and 255 characters'
    if(!isNaN(price) === false || price < 1) errorsObj.price = 'Please provide a price that is a number, greater than 0'
    if(!category) errorsObj.category = 'Please provide a valid category'
    if(image_url.length && !(image_url.endsWith('.png') || image_url.endsWith('.jpg') || image_url.endsWith('.jpeg') || image_url.endsWith('.webp'))) errorsObj.image_url = 'Image URL needs to end in png or jpg (or jpeg) and greater than 5 characters';

    setErrors(errorsObj);
  }, [name, description, price, category, is_avaliable, image_url]);

  return (
    <div className="menu-form-con">
      <h1 className="menu-form-h1">Update your menu item!</h1>
      <div className="menu-item-description">
        <h2 className="menu-item-h2">
          Did you make a mistake or did something change?
        </h2>
        <p className="menu-item-desc">
          Update your menu item to whatever you may change keep in mind the more
          menu items you have the better chance to get orders!{" "}
        </p>
      </div>

      <form className="menu-form" onSubmit={handleSubmit}>
        <p className="menu-name">Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
          placeholder="name"
        />
        {errors.name && <p className="form-errors">{errors.name}</p>}

        <p className="menu-name">Description</p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description-input"
          placeholder="description"
        />
        {errors.description && (
          <p className="form-errors">{errors.description}</p>
        )}

        <p className="menu-name">Price</p>
        <input
          type="number"
          min={1}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="price-input"
          placeholder="price"
        />
        {errors.price && <p className="form-errors">{errors.price}</p>}

        <div className="catagories">
          <div className="catagories-con">
            <label>
              <p className="menu-name">Categories:</p>
              <select
                name="category"
                className="select-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Main Courses">Main Courses</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Sides">Sides</option>
                <option value="Beverages">Beverages</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Entrees">Entrees</option>
              </select>
            </label>

            {errors.category && (
              <p className="form-errors">{errors.category}</p>
            )}
          </div>
        </div>

        <div className="catagories">
          <p className="menu-name">Menu Item Image</p>
          <input
            type="text"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
            className="image_url-input"
            placeholder="image url"
          />
          {errors.image_url && (
            <p className="form-errors">{errors.image_url}</p>
          )}
        </div>
        <div className="btn-con">
          <button
            disabled={Object.values(errors).length > 0}
            className="menu-submit"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMenuForm;
