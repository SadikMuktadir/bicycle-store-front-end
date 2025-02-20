import { useParams } from "react-router-dom";
import { Spin, Button } from "antd";
import { useGetBicycleByIdQuery } from "@/redux/feacures/public/getBycleApi";

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
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{name}</h1>
            <p className="mb-5">{description}</p>
            <Button className="btn btn-primary">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
