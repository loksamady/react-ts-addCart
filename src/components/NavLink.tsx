// import Sign from "./Sign";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../hooks/useShoppingCart";
// import { ShoppingCartIcon } from "lucide-react";
const NavLinkComponent = () => {
  const { cartQuantity, openCart } = useShoppingCart();

  return (
    <ul className="flex justify-center items-center gap-4 ">
      <li className=" p-2 rounded-lg font-bold transition-colors cursor-pointer">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className=" p-2 rounded-lg font-bold transition-colors cursor-pointer">
        <NavLink to="about">About</NavLink>
      </li>
      <li className=" p-2 rounded-lg font-bold transition-colors cursor-pointer">
        <NavLink to="store">Store</NavLink>
      </li>
      {/* <Sign /> */}
      <div onClick={openCart} className="relative cursor-pointer">
        <FontAwesomeIcon
          className="border p-2 rounded-full hover:bg-gray-100 transition-colors"
          icon={faCartShopping}
        />
        {cartQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartQuantity}
          </span>
        )}
      </div>
    </ul>
  );
};

export default NavLinkComponent;
