import React, { useContext } from "react";
import { useRouter } from "next/router";
import Layouts from "@/components/Layouts";
import data from "../../../utils/data";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../../utils/Store";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  const { slug } = query;
  const product = data.product.find((x) => x.slug === slug);
  const addCart = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("Барааны үлдэгдэл хүрэлцэхгүй байна");
    }
    dispatch({
      type: `CART_ADD_ITEM`,
      payload: { ...product, quantity },
    });
    router.push("/cart");
  };
  if (!product) {
    return (
      <Layouts>
        <div>Бараа олдсонгүй</div>
      </Layouts>
    );
  }

  return (
    <Layouts title={`${product.name}`}>
      <div className="py-2">
        <Link href="/">Буцах</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt="details img"
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg"> {product.name}</h1>
            </li>
            <li className="text-xl">Үнэлгээ: {product.rating}</li>
            <li className="text-xl">Тоо ширхэг: {product.numReviews}</li>
            <li className="text-xl">Тайлбар: {product.description}</li>
          </ul>
          <div className="my-12 ">
            <div className="border shadow-lg  p-6 ">
              <p>Үнэ: {product.price}</p>
              <div
                className={
                  product.countInStock > 0 ? "text-green-500" : "text-red-500"
                }
              >
                Төлөв: {product.countInStock > 0 ? "Боломжтой" : "Анги үлдсэн"}
              </div>
              <div>
                <button
                  type="button"
                  className="p-2 mt-4 w-full bg-yellow-500  rounded-md"
                  onClick={addCart}
                >
                  Сагсанд нэмэх
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
}
