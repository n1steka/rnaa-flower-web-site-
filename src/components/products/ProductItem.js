import React, { useContext } from "react";
import Link from "next/link";
import { Store } from "../../../utils/Store";
import { toast } from "react-toastify";
import Image from "next/image";
export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);

  const addCart = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const notif = () => {
      toast("Барааны үлдэгдэл хүрэлцэхгүй байна");
    };
    if (product.countInStock < quantity) {
      notif();
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    toast("Сагсан амжилттай нэмэгдлээ", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
    });
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <Image
          width={500}
          height={300}
          src={`${product.image}`}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center p-5 border">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.slug}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="">{product.price}</p>
        <button
          onClick={addCart}
          className="primary-button mt-4 border p-2 rounded-md bg-yellow-300"
          type="button"
        >
          Сагсан хийх
        </button>
      </div>
    </div>
  );
}
