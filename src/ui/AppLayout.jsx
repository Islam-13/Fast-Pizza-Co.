import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../featuers/cart/CartOverview";
import Navbar from "./Navbar";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Navbar />

      <div className="overflow-scroll">
        <main className="mx-auto md:max-w-[80%]">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
