import React, { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import Layouts from "@/components/Layouts";

export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const [count, setCount] = useState(0);

  const updateCard = (item, value) => {
    // Use dispatch to update the state with the new quantity
    dispatch({
      type: "CART_ADD_ITEM", // You can use the same action type for updating quantity
      payload: { ...item, quantity: parseInt(value) },
    });
    setCount(!value ? item.price : value * item.price);
  };

  const remoteItem = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const {
    cart: { cartItems },
  } = state;

  return (
    <Layouts title="сагс">
      <h1 className="mb-4 text-xl">Сагс</h1>
      {cartItems.length === 0 ? (
        <div>
          {" "}
          Сагс хоосон байна <a href="/">Буцах</a>{" "}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Бараа</th>
                  <th className="px-5 text-right">Тоо ширхэг</th>
                  <th className="px-5 text-right">Үнэ</th>
                  <th className="px-5 text-right">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <tr className="border-b" key={i}>
                    <td>
                      <a href={`product/${item.slug}`} className="flex">
                        <img
                          className="w-[100px]"
                          src={item.image}
                          alt={item.name}
                        />
                      </a>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCard(item, e.target.value)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">
                      {count === 0 ? item.price : count}
                    </td>
                    <td className="p-5 text-right">
                      <button
                        type="button"
                        className="border p-2 rounded-md hover:bg-slate-400"
                        onClick={() => remoteItem(item)}
                      >
                        Устгах
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="card">
              <ul className="p-4">
                <li>
                  <div>
                    Нийт үнэ: ({cartItems.reduce((a, c) => a + c.quantity, 0)}):{" "}
                    {getTotalPrice()}
                  </div>
                  <button className="mt-4 p-2 border bg-yellow-300 rounded-lg">
                    {" "}
                    Төлбөр төлөх{" "}
                  </button>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layouts>
  );
}
