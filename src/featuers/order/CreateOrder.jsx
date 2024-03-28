import { useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { userName, address, position, status, error } = useSelector(
    (state) => state.user,
  );
  const isLoading = status === "loading";
  const cart = useSelector((state) => state.cart.cart);
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const [errPhone, setErrPhone] = useState(false);

  function handleBlur(e) {
    !isValidPhone(e.target.value)
      ? setErrPhone(
          "Phone isn't vaild.Please enter a correct number we might need to contact you.",
        )
      : setErrPhone("");
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              className="input"
              defaultValue={userName}
            />
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Phone number</label>
            <div className="grow">
              <input
                type="tel"
                name="phone"
                required
                className="input"
                onBlur={handleBlur}
              />
            </div>
          </div>
          {errPhone && (
            <p className="mb-5 w-fit rounded-md bg-red-200 p-2 text-xs text-red-700 sm:ml-[10rem]">
              {errPhone}
            </p>
          )}
        </div>

        <div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Address</label>
            <div className="relative grow">
              <input
                type="text"
                name="address"
                required
                className="input"
                defaultValue={address}
              />
              {!position.latitude && !position.longitude && (
                <div className="absolute right-[3px] top-[3px]  ">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                    type="small"
                    disabled={isLoading}
                  >
                    get position
                  </Button>
                </div>
              )}
            </div>
          </div>
          {status === "error" && (
            <p className="mb-5 w-fit rounded-md bg-red-200 p-2 text-xs text-red-700 sm:ml-[10rem]">
              {error}
            </p>
          )}
        </div>

        <div className="mb-7 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring
             focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting || isLoading}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData(request);
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Phone isn't vaild.Please enter a correct number we might need to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
