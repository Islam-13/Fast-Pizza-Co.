import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartItems, getTotalCartPrice } from "./cartSlice";

function CartOverview() {
  const totalItems = useSelector(getTotalCartItems);
  const totalPrice = useSelector(getTotalCartPrice);

  if (!totalItems) return;

  return (
    <div className=" bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-10 md:text-base">
      <div className="mx-auto flex justify-between md:max-w-[80%]">
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-7">
          <span>{totalItems} pizzas</span>
          <span>${totalPrice}</span>
        </p>
        <Link to="/cart">Open cart &rarr;</Link>
      </div>
    </div>
  );
}

export default CartOverview;
