import { useDispatch } from "react-redux";
import Button from "./Button";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "../featuers/cart/cartSlice";

function UpdateItemQuantity({ quantity, id }) {
  const dispatch = useDispatch();

  function handleDec() {
    quantity > 1
      ? dispatch(decreaseItemQuantity(id))
      : dispatch(deleteItem(id));
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button onClick={handleDec} type="round">
        -
      </Button>
      <p>{quantity}</p>
      <Button onClick={() => dispatch(increaseItemQuantity(id))} type="round">
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
