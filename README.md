# WuberEats

WuberEats is designed to offer a comprehensive food delivery service, emulating key functionalities of UberEats. Users can browse through a diverse range of restaurants, each featuring detailed profiles with menus and ratings. The platform supports user-generated content, allowing customers to read and write reviews, providing valuable feedback for both restaurants and future diners. With an intuitive interface, users can effortlessly view menus, customize their orders, and place them directly through the application. The service aims to streamline the food delivery process, ensuring a seamless and enjoyable experience for all users.

# Live Link
https://wubereats.onrender.com/

# Connect
[Andres Mercado](https://www.linkedin.com/in/andres-merc/) | [Joseph Rashid](https://www.linkedin.com/in/joe-rashid-3571a830a/) | [Veronica Flatto](https://www.linkedin.com/in/veronica-flatto/) | [Zachary Wood](https://www.linkedin.com/in/zach-wood-82a80b28b/)

---
## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

### Database:
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Hosting:
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Index
[Feature List](https://github.com/poedude5229/WuberEats/wiki/WuberEats-fEATure-List) | [Database Schema](https://github.com/poedude5229/WuberEats/wiki/WuberEats-Database-Schema) | [User Stories](https://github.com/poedude5229/WuberEats/wiki/User-Stories)


## Endpoints

### Log In User
- Method: POST
- URL: `/api/auth/login`
- Body:

    ```json
    {
      "email": "andres@gmail.com",
      "password": "password"
    }
    ```

- Successful Response:
  ```json
  {
    "address": "789 Oak Lane",
    "email": "andres@gmail.com",
    "firstname": "Andres",
    "id": 3,
    "lastname": "Mercado",
    "role": "owner",
    "username": "andres"
  }
  ```

---

## Restaurants
### Create a Restaurant
- Method: POST
- URL: `/api/restaurants/new`
- Body:

    ```json
    {  
    "name": "Pe King",
   "address": "peking street 459",
   "phone_number": "312321321",
   "cuisine": "chinese",
   "description": "A great place to get your chinese food",
   "hours_of_operation": "Sunday-Saturday: 8AM-9PM",
   "delivery_radius": 22,
   "cover_image": "dummy.url"
    }
    ```

- Successful Response:
  ```json
  {
    "address": "peking street 459",
    "cover_image": "dummy.url",
    "created_at": "Tue, 11 Jun 2024 14:15:49 GMT",
    "cuisine": "chinese",
    "delivery_radius": 22,
    "description": "A great place to get your chinese food",
    "hours_of_operation": "Sunday-Saturday: 8AM-9PM",
    "id": 10,
    "name": "Pe King",
    "owner_id": 3,
    "phone_number": "312321321",
    "reviews": [],
    "updated_at": "Tue, 11 Jun 2024 14:15:49 GMT"
  }
  ```

---

### View all Restaurants
- Method: GET
- URL: `/api/restaurants`
- Body: none

- Successful Response:
  ```json
  {
       "restaurants": [
       {
           "address": "19 Dollar Fornite Card Ave",
           "avgrating": 3.75,
           "cover_image": "https://res.cloudinary.com/dyr9v2ynr/image/upload/v1716311694/IMG_8321_ycn9zn.jpg",
           "created_at": "Fri, 24 May 2024 05:00:36 GMT",
           "cuisine": "Bad",
           "delivery_radius": 6,
           "description": "a noble belarussian man and a dream to make the finest chicken burger: the story about how this sigma with an entrepreneurial grindset deep fried a cream burger",
           "hours_of_operation": "Monday-Friday: 12AM-11:59PM",
           "id": 1,
           "menu_items": [
               {
                   "category": "Main Courses",
                   "created_at": "Fri, 24 May 2024 05:00:36 GMT",
                   "description": "Creamy. Cheesy. Got that ranch on there. Maybe also some bacon on there. You decide how you want it",
                   "id": 1,
                   "image_url": "https://img3.wikia.nocookie.net/__cb20120715163345/spongebob/images/2/2e/Synthetic-Krabby-Patties.jpg",
                   "is_available": true,
                   "name": "Mikita Burger",
                   "price": 25,
                   "restaurant": "Nikita Burger",
                   "restaurant_id": 1,
                   "updated_at": "Fri, 24 May 2024 05:00:36 GMT"
               },
              ]
       }
       ]
  }
  ```

---

### View an Individual Restaurant
- Method: GET
- URL: `/api/restaurants/:restaurantId`
- Body: none

- Successful Response:
  ```json
      [
      {
       "address": "19 Dollar Fornite Card Ave",
       "avgrating": 3.75,
       "cover_image": "https://res.cloudinary.com/dyr9v2ynr/image/upload/v1716311694/IMG_8321_ycn9zn.jpg",
       "created_at": "Fri, 24 May 2024 05:00:36 GMT",
       "cuisine": "Bad",
       "delivery_radius": 6,
       "description": "a noble belarussian man and a dream to make the finest chicken burger: the story about how this sigma with an entrepreneurial grindset deep fried a cream burger",
       "hours_of_operation": "Monday-Friday: 12AM-11:59PM",
       "id": 1,
       "menu_items": [
           {
               "category": "Main Courses",
               "created_at": "Fri, 24 May 2024 05:00:36 GMT",
               "description": "Creamy. Cheesy. Got that ranch on there. Maybe also some bacon on there. You decide how you want it",
               "id": 1,
               "image_url": "https://img3.wikia.nocookie.net/__cb20120715163345/spongebob/images/2/2e/Synthetic-Krabby-Patties.jpg",
               "is_available": true,
               "name": "Mikita Burger",
               "price": 25,
               "restaurant_id": 1,
               "updated_at": "Fri, 24 May 2024 05:00:36 GMT"
           },
           {
               "category": "Sides",
               "created_at": "Fri, 24 May 2024 05:00:36 GMT",
               "description": "Freezer Fresh. Never from scratch. We buy these from Sysco, and you buy them for 4 vbucks. We carefully add a pound of seasoned salt to each pound of fries straight out the fryer.",
               "id": 2,
               "image_url": "https://sysconorth.ca/cdn/shop/files/00734730277318c_e227baf9-a153-4617-9fb4-04d2049a1ed8_2048x2048.jpg?v=1716531348",
               "is_available": true,
               "name": "Bruh Fries",
               "price": 4,
               "restaurant_id": 1,
               "updated_at": "Fri, 24 May 2024 05:00:36 GMT"
           },
           {
               "category": "Sides",
               "created_at": "Fri, 24 May 2024 05:00:36 GMT",
               "description": "Crispy. Crunchy. Ranch. We offer this",
               "id": 3,
               "image_url": "https://assets.usfoods.com/Product/Image/692883/6cf6a3d77d3acb70e9596145040efcf8.jpg",
               "is_available": true,
               "name": "Cup of Ranch",
               "price": 1,
               "restaurant_id": 1,
               "updated_at": "Fri, 24 May 2024 05:00:36 GMT"
           },
           {
               "category": "Beverages",
               "created_at": "Fri, 24 May 2024 05:00:36 GMT",
               "description": "We love Dr. Thunder around here. We love it so much that it's the only beverage we have.",
               "id": 4,
               "image_url": "https://i5.walmartimages.com/asr/db486999-c71a-45a6-9f6b-8f988ac0bfb9.edd849a47fb7fa980eeb8b608caae97b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
               "is_available": true,
               "name": "Dr. Thunder",
               "price": 0,
               "restaurant_id": 1,
               "updated_at": "Fri, 24 May 2024 05:00:36 GMT"
           }
       ],

  ```

---

### Update a Restaurant
- Method: PUT
- URL: `/api/restaurants/:restaurantId`
- Body:

    ```json
    {  
   "name": "Pe King Updated",
  "address": "peking street 459",
  "phone_number": "312321321",
  "cuisine": "chinese",
  "description": "A great place to get your chinese food",
  "hours_of_operation": "Sunday-Saturday: 8AM-9PM",
  "delivery_radius": 22,
  "cover_image": "dummy.url"
  }
    ```

- Successful Response:
  ```json
  {
    "address": "peking street 459",
    "cover_image": "dummy.url",
    "created_at": "Tue, 11 Jun 2024 14:15:49 GMT",
    "cuisine": "chinese",
    "delivery_radius": 22,
    "description": "A great place to get your chinese food",
    "hours_of_operation": "Sunday-Saturday: 8AM-9PM",
    "id": 10,
    "name": "Pe King Updated",
    "owner_id": 3,
    "phone_number": "312321321",
    "reviews": [],
    "updated_at": "Tue, 11 Jun 2024 14:17:41 GMT"
  }
  ```

---

### Delete a Restaurant
- Method: DELETE
- URL: `/api/restaurants/:restaurantId`
- Body: none

- Successful Response:
  ```json
    {
    "message": "Succesfully Deleted your restaurant"
    }
  ```

---

## Menu Items
### Create a Menu Item
- Method: POST
- URL: `/api/restaurants/:restaurantId/menus/new`
- Body:

    ```json
    {
   "name": "Menu item",
   "description": "A crunchy tasty pocket filled with cream cheese",
   "price": 5,
   "category": "Appetizers",
   "is_available": "True",
   "image_url": "fakeimage.url"
    }
    ```

- Successful Response:
  ```json
  {
   "category": "Appetizers",
   "created_at": "Tue, 11 Jun 2024 15:37:38 GMT",
   "description": "A crunchy tasty pocket filled with cream cheese",
   "id": 40,
   "image_url": "fakeimage.url",
   "is_available": true,
   "name": "Menu item",
   "price": 6,
   "restaurant_id": 10,
   "updated_at": "Tue, 11 Jun 2024 15:37:38 GMT"
  }

  ```

---
### Get ALL Menu Items
- Method: GET
- URL: `/api/restaurants/:restaurantId/menus`
- Body: none

- Successful Response:
  ```json
       "menus": [
       {
           "category": "Appetizers",
           "created_at": "Tue, 11 Jun 2024 15:36:56 GMT",
           "description": "A crunchy tasty pocket filled with cream cheese",
           "id": 37,
           "image_url": "fakeimage.url",
           "is_available": true,
           "name": "Menu item",
           "price": 6,
           "restaurant_id": 10,
           "updated_at": "Tue, 11 Jun 2024 15:36:56 GMT"
       },
       {
           "category": "Appetizers",
           "created_at": "Tue, 11 Jun 2024 15:37:03 GMT",
           "description": "A crunchy tasty pocket filled with cream cheese",
           "id": 38,
           "image_url": "fakeimage.url",
           "is_available": true,
           "name": "Menu item",
           "price": 6,
           "restaurant_id": 10,
           "updated_at": "Tue, 11 Jun 2024 15:37:03 GMT"
       },
       {
           "category": "Appetizers",
           "created_at": "Tue, 11 Jun 2024 15:37:16 GMT",
           "description": "A crunchy tasty pocket filled with cream cheese",
           "id": 39,
           "image_url": "fakeimage.url",
           "is_available": true,
           "name": "Menu item",
           "price": 6,
           "restaurant_id": 10,
           "updated_at": "Tue, 11 Jun 2024 15:37:16 GMT"
       },
       {
           "category": "Appetizers",
           "created_at": "Tue, 11 Jun 2024 15:37:38 GMT",
           "description": "A crunchy tasty pocket filled with cream cheese",
           "id": 40,
           "image_url": "fakeimage.url",
           "is_available": true,
           "name": "Updated menu item",
           "price": 6,
           "restaurant_id": 10,
           "updated_at": "Tue, 11 Jun 2024 15:38:38 GMT"
       }
   ]
  ```

---

### Update a Menu Item
- Method: PUT
- URL: `/api/restaurants/:restaurantId/menu/:menuId`
- Body:

    ```json
    {
    "name": "Updated Menu item",
    "description": "A crunchy tasty pocket filled with cream cheese",
    "price": 6,
    "category": "Appetizers",
    "is_available": "True",
    "image_url": "fakeimage.url" 
    }
    ```

- Successful Response:
  ```json
  {
   "category": "Appetizers",
   "created_at": "Tue, 11 Jun 2024 15:37:38 GMT",
   "description": "A crunchy tasty pocket filled with cream cheese",
   "id": 40,
   "image_url": "fakeimage.url",
   "is_available": true,
   "name": "Updated menu item",
   "price": 6,
   "restaurant_id": 10,
   "updated_at": "Tue, 11 Jun 2024 15:38:38 GMT"
  }

  ```

---
### Delete a Menu Item
- Method: DELETE
- URL: `/api/restaurants/:restaurantId/menu/:menuId`
- Body: none

- Successful Response:
  ```json
    {
    "message": "Succesfully Deleted your menu item"
    }
  ```

---

## Reviews
### Create a Review
- Method: POST
- URL: `/api/restaurants/:restaurantId/reviews/new`
- Body:

    ```json
    {
    "review": "Great food, and fast delivery.",
    "rating": 5
    }

    ```

- Successful Response:
  ```json
  {
   "created_at": "Tue, 11 Jun 2024 14:18:29 GMT",
   "id": 27,
   "rating": 5,
   "restaurant_id": 10,
   "review": "Great food, and fast delivery.",
   "updated_at": "Tue, 11 Jun 2024 14:18:29 GMT",
   "user_firstname": "Andres",
   "user_id": 3
  }
  ```

---

### Update a Review
- Method: PUT
- URL: `/api/restaurants/:restaurantId/reviews/:reviewId`
- Body:

    ```json
    {
    "review": "Food was ok, and delivery was a little slow.",
    "rating": 3
    }

    ```

- Successful Response:
  ```json
  {
   "created_at": "Tue, 11 Jun 2024 14:18:29 GMT",
   "id": 27,
   "rating": 3,
   "restaurant_id": 10,
   "review": "Food was ok, and slow delivery.",
   "updated_at": "Tue, 11 Jun 2024 14:19:45 GMT",
   "user_firstname": "Andres",
   "user_id": 3
  }
  ```

---

### Delete a Review
- Method: DELETE
- URL: `/api/restaurants/:restaurantId/reviews/:reviewId`
- Body: none

- Successful Response:
  ```json
  {
    "message": "Succesfully deleted your review"
    }
  ```

---
