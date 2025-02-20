import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { useGetBicycleByIdQuery } from "@/redux/feacures/public/getBycleApi";
import { addToCart } from "@/redux/feacures/cart/cartSlice";
import { AppDispatch } from "@/redux/store";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, error } = useGetBicycleByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center my-16">
        <Spin size="large" />
      </div>
    );
  }
  if (error) {
    return (
      <p className="text-red-500 text-center">
        Failed to load product details.
      </p>
    );
  }

  if (!data || !data.data) {
    return <p className="text-gray-500 text-center">Product not found.</p>;
  }

  const { _id, name, brand, price, type, description, quantity, imageUrl } =
    data.data;

  const handleCart = () => {
    dispatch(
      addToCart({
        _id,
        name,
        brand,
        price,
        type,
        description,
        imageUrl,
        count: 1,
      })
    );
  };

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src={imageUrl}
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-full px-2">
                <button
                  onClick={handleCart}
                  className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {description}
            </p>
            <div className="flex flex-col mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  ${price}
                </span>
              </div>
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Type:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {type}
                </span>
              </div>
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Brand:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {brand}
                </span>
              </div>
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Quantity:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {quantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
