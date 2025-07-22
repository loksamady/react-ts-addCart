import { Card } from "primereact/card";
import { useShoppingCart } from "../hooks/useShoppingCart";
import formatCurrency from "../util/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  
  const quantity = getItemQuantity(id);

  return (
    <Card className="store-item-card" style={{ padding: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <img
          src={imgUrl}
          alt={name}
          style={{
            width: "100%",
            objectFit: "cover",
            maxHeight: 200,
            borderRadius: "8px 8px 0 0",
          }}
        />
        <div
          style={{
            flex: 1,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.2rem", margin: 0 }}>{name}</h2>
            <p style={{ fontWeight: "bold", margin: "0.5rem 0 0 0" }}>
              {formatCurrency(price)}
            </p>
          </div>

          <div style={{ marginTop: "1rem" }}>
            {/* Conditional rendering based on quantity */}
            {quantity === 0 ? (
              <button
                onClick={() => increaseCartQuantity(id)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                + Add To Cart
              </button>
            ) : (
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flex: 1,
                  }}
                >
                  {/* Decrease button to reduce quantity */}
                  <button
                    onClick={() => decreaseCartQuantity(id)}
                    style={{
                      width: "35px",
                      height: "35px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    -
                  </button>
                  {/* Display the current quantity */}
                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </span>
                  {/* Display the quantity in a span */}
                  <button
                    onClick={() => increaseCartQuantity(id)}
                    style={{
                      width: "35px",
                      height: "35px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>
                {/* Remove button to reset quantity */}
                <button
                  onClick={() => removeFromCart(id)}
                  style={{
                    padding: "0.5rem 0.75rem",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StoreItem;
