import { useCart } from "../context/CartContext";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <Card key={item.id} className="shadow-md rounded-lg p-4">
              <CardContent className="flex gap-4">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => updateQuantity(item.id, item.quantity - 1) } disabled={item.quantity <= 1 } className="cursor-pointer">
                      -
                    </Button>
                    <span className="px-3 py-1 border rounded-md">{item.quantity}</span>
                    <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="cursor-pointer">+</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <Button className="cursor-pointer">Buy</Button>
                <Button variant="destructive" onClick={() => removeFromCart(item.id)} className="cursor-pointer">Remove</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
