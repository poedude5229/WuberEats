from app.models import Menu, db, environment, SCHEMA
from sqlalchemy.sql import text



def seed_menus():


    menu_items = [
    {
        "restaurant_id": 1,
        "name": "Mikita Burger",
        "description": "Creamy. Cheesy. Got that ranch on there. Maybe also some bacon on there. You decide how you want it",
        "price": 25,
        "category": "Main Courses",
        "is_available": True,
        "image_url": "https://static.wikia.nocookie.net/spongebob/images/b/b9/Nasty_Patty_061.png/revision/latest/scale-to-width-down/1200?cb=20200805135150"
    },
    {
        "restaurant_id": 1,
        "name": "Bruh Fries",
        "description": "Freezer Fresh. Never from scratch. We buy these from Sysco, and you buy them for 4 vbucks. We carefully add a pound of seasoned salt to each pound of fries straight out the fryer.",
        "price": 4,
        "category": "Sides",
        "is_available": True,
        "image_url": "https://sysconorth.ca/cdn/shop/files/00734730277318c_e227baf9-a153-4617-9fb4-04d2049a1ed8_2048x2048.jpg?v=1716531348"
    },
    {
        "restaurant_id": 1,
        "name": "Cup of Ranch",
        "description": "Crispy. Crunchy. Ranch. We offer this",
        "price": 1,
        "category": "Sides",
        "is_available": True,
        "image_url": "https://assets.usfoods.com/Product/Image/692883/6cf6a3d77d3acb70e9596145040efcf8.jpg"
    },
    {
        "restaurant_id": 1,
        "name": "Dr. Thunder",
        "description": "We love Dr. Thunder around here. We love it so much that it's the only beverage we have.",
        "price": 0,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://i5.walmartimages.com/asr/db486999-c71a-45a6-9f6b-8f988ac0bfb9.edd849a47fb7fa980eeb8b608caae97b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
    },
    {
        "restaurant_id": 2,
        "name": "Plywood",
        "description": "Mmmm plywood... Normally you build a house out of this, but today you can tear down your hunger and take a bite.",
        "price": 12,
        "category": "Main Courses",
        "is_available": True,
        "image_url": "https://images.thdstatic.com/productImages/e293cf6a-e31e-462a-8518-80437e97f66f/svn/oriented-strand-board-osb-512977-64_600.jpg"
    },
    {
        "restaurant_id": 2,
        "name": "Milkwaukee M18 Compact Cordless Drill Kit",
        "description": "This drill can deliver a whopping 500 in/lb of torque to your hunger. Try it for your lunch today",
        "price": 211,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://fandfind.com/wp-content/uploads/2019/10/336378-600x600.jpg"
    },
    {
        "restaurant_id": 2,
        "name": "Masterforce® 14'' Iron Pipe Wrench",
        "description": "Designed to withstand commercial and residential jobs. Made from durable material to be a durable lunch. Get greater leverage on your appetite.",
        "price": 20,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://cdn.menardc.com/main/items/media/JSPRO001/ProductXLarge/65393-14in-Iron-Pipe-Wrench-5.jpg"
    },
    {
        "restaurant_id": 2,
        "name": "Masterforce® 24in. Crowbar",
        "description": "It's a crowbar. But it's also a great snack.",
        "price": 13,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://cdn.menardc.com/main/items/media/BLACK001/ProductXLarge/243-4652.jpg"
    },
    {
        "restaurant_id": 3,
        "name": "Quarter Pounder",
        "description": "Featuring a 1/4lb of fresh beef that's been expertly grilled, this is one of our best sellers",
        "price": 4,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202201_0007-005_QuarterPounderwithCheese_832x472:product-header-desktop?wid=830&hei=458&dpr=off"
    },
    {
        "restaurant_id": 3,
        "name": "Southern Style Sweet Tea",
        "description": "Brewed sweet and fresh, this ice cold homestyle tea will have you singing songs about the south land in four different sizes",
        "price": 2,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202105_3429_SweetTea_Glass_A1_832x472:product-header-desktop?wid=830&hei=458&dpr=off"
    },
    {
        "restaurant_id": 3,
        "name": "Spicy McChicken",
        "description": "Spicy McChicken is the greatest of both worlds. The already fantastic McChicken blended with spice makes our collective WuberMouth drip with excitement",
        "price": 2,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202012_0116_SpicyCrispyChicken_PotatoBun_832x472:product-header-desktop?product-header-desktop&wid=830&hei=458&dpr=off"
    },
    {
        "restaurant_id": 3,
        "name": "Spicy McNuggets",
        "description": "Spicy McNuggets are like our classic nuggets but add a little bit of spice✨ These come in a four pack, a six pack, a ten piece, 20 piece and a 40 piece",
        "price": 2,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/Header_Menu_20McNuggets_Stacked_832x472:product-header-desktop?wid=830&hei=458&dpr=off"
    },
    {
        "restaurant_id": 4,
        "name": "Chick-n-Minis",
        "description": "Bite-sized Chick-fil-A® Nuggets nestled in warm, mini yeast rolls that are lightly brushed witha  honey butter spread.",
        "price": 2,
        "category": "Breakfast",
        "is_available": True,
        "image_url": "https://www.cfacdn.com/img/order/COM/Menu_Refresh/Breakfast/Breakfast%20PDP/_0000s_0014_%5BFeed%5D_0000s_0024_Breakfast_Chicken-Mini-4ct.png"
    },
    {
        "restaurant_id": 4,
        "name": "Spicy Deluxe Sandwich",
        "description": "A boneless chicken breast. A spicy blend of pepper seasoning. A breading by hand. And a piece of pepperjack cheese. These four come together in a buttered bun with pickle chips and the optional wet lettuce and tomato",
        "price": 5,
        "category": "Main Course",
        "is_available": True,
        "image_url": "https://d1fd34dzzl09j.cloudfront.net/Images/CFACOM/PLP%20updates/Spicy%20Deluxe/CFA14300_Winter24_SpicyDeluxe-OnWhite_PLP_Hero_D_710x580.jpg_master.jpg?h=580&w=710&la=en"
    },
    {
        "restaurant_id": 4,
        "name": "Mac & Cheese",
        "description": "Classic mac n cheese featuring Parmesan, Cheddar, and Romano cheese. Baked to perfection forming a crispy top layer.",
        "price": 3,
        "category": "Appetizer",
        "is_available": True,
        "image_url": "https://www.cfacdn.com/img/order/COM/Menu_Refresh/Sides/Sides%20PDP/MacnCheese_5oz_pdp.png"
    },
    {
        "restaurant_id": 4,
        "name": "Chick-fil-A Lemonade",
        "description": "Classic lemonade made from real lemon juice, concentrate, cane sugar and water. Comes in three classic sizes",
        "price": 2,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://www.cfacdn.com/img/order/menu/Online/Drinks/lemonade_pdp.png"
    },

    {
        "restaurant_id": 5,
        "name": "Mountain Dew Baja Blast",
        "description": "Like drinking an intense tropical storm. Containing no fruit juice, this electrifying drink was formerly exclusive to Taco Bell, and is the better choice over regular Dew.",
        "price": 1,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://www.tacobell.com/images/1027_mountain_dew_baja_blast_269x269.jpg"
    },
    {
        "restaurant_id": 5,
        "name": "Quesarito",
        "description": "A combination of a quesadilla, and a burrito with seasoned beef, rice, cheese and other ingredients, this is the best thing we have ever produced, and the hardest thing to order as it's no longer on the menu",
        "price": 4,
        "category": "Main Courses",
        "is_available": False,
        "image_url": "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-03/taco-bell-fan-favorite-item-zz-230310-01-3344e3.jpg"
    },
    {
        "restaurant_id": 5,
        "name": "Grilled Cheese Burrito",
        "description": "The successor to the quesarito. All good things must come to an end. Packed full of cholesterol, this is enough sodium to make a horse drink water.",
        "price": 5,
        "category": "Main Courses",
        "is_available": True,
        "image_url": "https://www.tacobell.com/images/22963_beef_grilled_cheese_burrito_269x269.jpg"
    },
    {
        "restaurant_id": 5,
        "name": "Brisk Mango Fiesta",
        "description": "This hidden gem is on par with the greatness of our Baja Blast. Mango flavored sweet tea. No natural flavors. All goodness",
        "price": 1,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://www.tacobell.com/images/1219_brisk_mango_fiesta_new_269x269.jpg"
    },
    {
        "restaurant_id": 6,
        "name": "Whopper",
        "description": "America's Favorite Burger.A quarter pound patty, tomatos, lettuce, mayo, ketchup, pickles and onions all on a toasted sesame seed bun",
        "price": 8,
        "category": "Main Courses",
        "is_available": True,
        "image_url": "https://cdn.sanity.io/images/czqk28jt/prod_bk_us/70faefbd88821e96bb3c473df7c57da383b821cb-1333x1333.png?w=1203&q=80&fit=max&auto=format"
    },
    {
        "restaurant_id": 6,
        "name": "Chicken Fries",
        "description": "Breaded, crispy chicken perfect for dipping in any of our delicious BK sauces",
        "price": 5,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://cdn.sanity.io/images/czqk28jt/prod_bk_us/634669afa40de124966b27fb705b2a139e7dd535-1333x1333.png?w=1203&q=80&fit=max&auto=format"
    },
    {
        "restaurant_id": 6,
        "name": "HI-C Fruit Punch",
        "description": "A tasty red punch made by the Coca-Cola company. Also the best drink. Thanks Coca-Cola!",
        "price": 3,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://cdn.sanity.io/images/czqk28jt/prod_bk_us/06ba11805696e20db91f8c655526dd758b1c85cc-1333x1333.png?w=1203&q=80&fit=max&auto=format"
    },
    {
        "restaurant_id": 6,
        "name": "Mocha Iced Coffee",
        "description": "Our BK® Joe Iced Coffee starts with 100% Arabica beans combined with silky cream and your choice of flavored syrups - Vanilla, Mocha and Plain",
        "price": 3,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://cdn.sanity.io/images/czqk28jt/prod_bk_us/caf792d8628121dda45a1ec98e8afa2114cc6b07-1333x1333.png?w=1203&q=80&fit=max&auto=format"
    },
    {
        "restaurant_id": 7,
        "name": "SmokeShack",
        "description": "Angus beef cheeseburger",
        "price": 9,
        "category": "Main Courses",
        "is_available": True,
        "image_url": "https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Burgers_SmokeShack_1500x920_lg1694786383.jpeg"
    },
    {
        "restaurant_id": 7,
        "name": "'Shroom Burger",
        "description": "*Vegetarian* Crisp-fried portobello mushroom filled with melted muenster",
        "price": 9,
        "category": "Main Courses",
        "is_available": True,
        "image_url": "https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Burgers_ShroomBurger_1500x920_lg1663589675.jpeg"
    },
    {
        "restaurant_id": 7,
        "name": "Fountain Soda",
        "description": "Shake Shack Fountain Soda",
        "price": 4,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://d2luv1saso99wi.cloudfront.net/2022_Digital-Menu_Drinks_FountainSoda_1500x920_lg1663591154.jpeg"
    },
    {
        "restaurant_id": 7,
        "name": "Sunset Lemonade",
        "description": "Real strawberry and Meyer lemon juice mixed with orange zest",
        "price": 4,
        "category": "Beverages",
        "is_available": True,
        "image_url": "https://d2luv1saso99wi.cloudfront.net/2024-01_Q1-Bevs_Menu-Product-Photo_1500x920_Sunset_lg1704482625.jpeg"
    },
    {
        "restaurant_id": 8,
        "name": "8 PC Wing Combo",
        "description": "8 Boneless or Classic (Bone-In) wings with up to 2 flavors, regular fries or veggie sticks, 1 dip and a 20oz drink",
        "price": 10,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://cdn.bfldr.com/NDQASMJ1/as/t5mmkgvtg3ctggr5chrsm9/8_pc_Mix__Match_Combo?auto=webp&format=png&width=675"
    },
    {
        "restaurant_id": 8,
        "name": "10 PC Wing Combo",
        "description": "10 Boneless or Classic (Bone-In) wings with up to 2 flavors, regular fries or veggie sticks, 1 dip and a 20oz drink",
        "price": 14,
        "category": "Main Courses",
        "is_available": True,
        "image_url": "https://cdn.bfldr.com/NDQASMJ1/as/7tng9c8qc7vzjbjkxfhwqc/10_Mix__Match_Combo?auto=webp&format=png&width=675"
    },
    {
        "restaurant_id": 8,
        "name": "Seasoned Fries",
        "description": "Our fries are cut fresh, tossed in our signature seasoning, and served hot",
        "price": 5,
        "category": "Sides",
        "is_available": True,
        "image_url": "https://cdn.bfldr.com/NDQASMJ1/as/r5js3kn8xrjs6p3nkcwfns98/Seasoned_Fries?auto=webp&format=png&width=675"
    },
    {
        "restaurant_id": 8,
        "name": "Chicken Sandwich",
        "description": "1 crispy, juicy chicken sandwich with pickles in your choice of flavor and dip",
        "price": 10,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://cdn.bfldr.com/NDQASMJ1/as/hhbb6w7v86cf986gq36tqt4v/Chicken_Sandwich?auto=webp&format=png&width=675"
    },
    {
        "restaurant_id": 9,
        "name": "Miso Soup",
        "description": "Come and get it , it's piping hot. It's miso soup. Your favorite",
        "price": 3,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-148422000000000000/menu/items/6/item-400000028471777266_1679987380.png?size=large"
    },
    {
        "restaurant_id": 9,
        "name": "Rainbow",
        "description": "TOP: Salmon, Tuna, Ebi, Tai, Avocado IN: Imitation Crab, Avocado",
        "price": 17,
        "category": "Main Courses",
        "is_available": True,
        "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-148422000000000000/menu/items/2/item-400000028471785362_1681778433.jpg?size=large"
    },
    {
        "restaurant_id": 9,
        "name": "Agedashi Tofu",
        "description": "Fried Tofu w/Tempura Sauce topped w/bonito flakes",
        "price": 12,
        "category": "Appetizers",
        "is_available": True,
        "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-148422000000000000/menu/items/3/item-400000028471777293_1679987483.png?size=large"
    },
    {
        "restaurant_id": 9,
        "name": "Lion King",
        "description": "TOP: Baked Salmon, Spicy Mayo, Unagi Sauce, Masago and Green Onion IN: Imitation Crab, Avocado",
        "price": 18,
        "category": "Main Courses",
        "is_available": True,
        "image_url": "https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-148422000000000000/menu/items/6/item-400000028471785356_1687858486.jpg?size=large"
    }

]

    for item in menu_items:
        menu = Menu(
            restaurant_id=item["restaurant_id"],
            name=item["name"],
            description=item["description"],
            price=item["price"],
            category=item["category"],
            is_available=item["is_available"],
            image_url=item["image_url"]
        )
        db.session.add(menu)
    db.session.commit()


def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu"))

    db.session.commit()
