// src/components/Cart.tsx
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartItems,
} from "@/redux/feacures/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex">
            <div className="mr-3">
              <ShoppingCart />
            </div>
            <div>
              <span>({cartItems.length})</span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <h2 className="text-lg font-bold mb-4">Your Cart</h2>
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-3 mb-3"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Price: ${item.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total: ${item.price * item.count}
                    </p>
                  </div>
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="p-1"
                      onClick={() => dispatch(decrementQuantity(item._id))}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="text-lg font-semibold">{item.count}</span>
                    <Button
                      variant="outline"
                      className="p-1"
                      onClick={() => dispatch(incrementQuantity(item._id))}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="p-1 text-red-600"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">
                  Total: ${totalPrice}
                </span>
                <Button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Pay Now
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
