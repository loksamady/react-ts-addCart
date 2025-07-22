import { useShoppingCart } from "../hooks/useShoppingCart";
import storeItems from "../data/items.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type ShoppingCartsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ShoppingCarts({ isOpen, onClose }: ShoppingCartsProps) {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    cartQuantity,
    clearCart,
  } = useShoppingCart();

  const total = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Content area */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            {/* Clear cart button section */}
            {cartQuantity > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Cart items list */}
            {cartQuantity === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart items display */}
                <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                  {cartItems.map((cartItem) => {
                    const item = storeItems.find((i) => i.id === cartItem.id);
                    if (!item) return null;

                    return (
                      <div
                        key={cartItem.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                      >
                        <img
                          src={item.imgUrl}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 text-xs">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => decreaseCartQuantity(cartItem.id)}
                              className="w-6 h-6 bg-blue-500 text-white rounded text-xs font-bold hover:bg-blue-600"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => increaseCartQuantity(cartItem.id)}
                              className="w-6 h-6 bg-blue-500 text-white rounded text-xs font-bold hover:bg-blue-600"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">
                            ${(item.price * cartItem.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(cartItem.id)}
                            className="text-red-500 text-xs hover:text-red-700 mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Footer with total and action buttons */}
                <div className="border-t border-gray-200 bg-white p-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg text-gray-800">
                      Total: ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={onClose}
                      className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      ← Continue Shopping
                    </button>
                    <button className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                      Checkout →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
