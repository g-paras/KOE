import {
  BookmarkIcon,
  TagIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";

import chickenImage from "src/shared/assets/chicken.png";

// portrait
// const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKaYxE1NXMNGvcuMAE5xaqMBTxHT4yD4YUZA&usqp=CAU'
//square
const image =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREf48ilESASX02ivLsP2VyOz8O42vdYzc0uQ&usqp=CAU";
// const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8J1l-rceZJyefqnMdLtIaqX2q72MoEZJJ4Q&usqp=CAU'
// const image = 'https://images.ctfassets.net/hrltx12pl8hq/4f6DfV5DbqaQUSjw0uo0mWi/6fbcf889bdef65c5b92ffee86b13fc44/shutterstock_376532611.jpg?fit=fill&w=800&h=300'
// const image = 'https://www.bookgeeks.in/wp-content/uploads/2023/02/Finding-Manmeet-by-Anuj-Tikku-Book-Review.jpg'
// const image = 'https://thumbs.dreamstime.com/b/gold-banner-design-vector-beautifull-illustration-your-108300362.jpg'

const Product = () => {
  return (
    <div className="block md:flex p-5 md:space-x-4">
      <div className="w-full mb-4 md:mb-0 md:w-1/2 lg:w-2/3 border rounded-md min-h-96 max-h-screen">
        <img
          className="object-scale-down m-auto rounded-md h-full"
          src={image}
          alt="product detail"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 flex-col space-y-3">
        {/* TODO: add owner actions  */}
        <div className="bg-gray-100 p-3 rounded-md flex-col space-y-3 border">
          <div className="flex justify-between">
            <span className="text-4xl font-semibold">&#8377; 87</span>
            <span>
              <BookmarkIcon className="color-black w-6" />
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <TagIcon className="h-8" />
              <div className="flex-col">
                <p className="text-sm text-gray-700">Category</p>
                <p className="font-semibold text-gray-800">BOOK</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDaysIcon className="h-8" />
              <div className="flex-col">
                <p className="text-sm text-gray-700">Posted</p>
                <p className="font-semibold text-gray-800">5 days ago</p>
              </div>
            </div>
          </div>
          <button className="border w-full rounded-md px-3 py-2 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold cursor-pointer">
            Make Offer
          </button>
        </div>
        <div className="bg-gray-100 p-3 rounded-md border">
          <p className="text-sm font-semibold text-gray-700 mb-1">Title</p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-md border">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Description
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            laborum dolor sed excepturi. Quidem, a iure! Modi dolore temporibus
            odio!
          </p>
        </div>
        <div className="bg-gray-100 p-3 rounded-md flex items-center space-x-4 border">
          <img src={chickenImage} alt="owner" className="w-24" />
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Seller Information
            </p>
            <p>Paras Gupta</p>
            <p>paras.1923ec1161@kiet.edu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
