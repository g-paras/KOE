const ProductListItem = () => {
  return (
    <a href="/item/itemslug" className="border rounded-md hover:shadow-md">
      <img
        className="h-56 rounded-t-md m-auto"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREf48ilESASX02ivLsP2VyOz8O42vdYzc0uQ&usqp=CAU"
        alt=""
      />
      <div className="px-3 py-2 bg-gray-50 rounded-b-md">
        <div className="flex justify-between">
          <span> &#8377; 87</span>
          <span>Book</span>
        </div>
        <div className="text-lg font-semibold">My New Product</div>
        <div className="text-gray-700 truncate">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
          culpa laborum delectus dolore sit exercitationem ipsam nesciunt, nihil
          praesentium vero, minima dolorum magnam voluptatem corporis. Tempora
          ipsa accusamus laboriosam voluptate.
        </div>
      </div>
    </a>
  );
};

export default ProductListItem;
