import { useParams } from "react-router-dom";
import { Card, Spin, Button } from "antd";
import { useGetBicycleByIdQuery } from "@/redux/feacures/public/getBycleApi";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetBicycleByIdQuery(id);

  // Debugging the API response
  console.log("Fetched Product Data:", data);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center my-16">
        <Spin size="large" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <p className="text-red-500 text-center">
        Failed to load product details.
      </p>
    );
  }

  // Ensure data exists before rendering
  if (!data || !data.data) {
    return <p className="text-gray-500 text-center">Product not found.</p>;
  }

  // Destructure product details from the data
  const { name, brand, price, type, model, description, quantity } = data.data;

  return (
    <div className="my-12 px-4 lg:px-16">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
        Product Details
      </h1>
      <Card
        title={name}
        hoverable
        className="shadow-lg rounded-lg border border-gray-200"
      >
        <p className="text-gray-700 font-semibold">Brand: {brand}</p>
        <p className="text-gray-600">Price: ${price}</p>
        <p className="text-gray-600">Category: {type}</p>{" "}
        {/* Assuming 'type' is category */}
        <p className="text-gray-600">Model: {model || "N/A"}</p>{" "}
        {/* Optional field */}
        <p className="text-gray-500 text-sm">
          {description || "No description available."}
        </p>
        <p
          className={`text-gray-600 ${
            quantity > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {quantity > 0 ? "In Stock" : "Out of Stock"}
        </p>
        {/* Buy Now button that redirects to the checkout page */}
        <Link to={`/checkout/${id}`}>
          <Button type="primary" size="large" className="w-full mt-4">
            Buy Now
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default ProductDetails;
