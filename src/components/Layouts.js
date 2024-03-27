import React from "react";
import Head from "next/head";
import Link from "next/link";
export default function Layouts({ children, title }) {
  // const { state } = useContext(Store);
  // const { cart } = state;
  return (
    <div>
      <Head>
        <title>
          {title ? title + "Нүүр хуудас " : "Онлайн худалдааны систем"}
        </title>
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-[80px] p-12  items-center  justify-between  shadow-md ">
            <Link href="/" className="   text-lg sm:text-md font-bold ">
              Цэцэгийн танилцууллага
            </Link>
            <div className="">
              {/* <Link href="/cart" className="p-2">
                Сагс{" "}
                {cart.cartItems.length === 0 ? null : (
                  <span className=" ml-2 p-1  rounded-full  bg-slate-400">
                    {" "}
                    {cart.cartItems.length}
                  </span>
                )}{" "}
              </Link> */}
              <Link href="/login">Нэвтрэх</Link>
            </div>
          </nav>
        </header>
        <main className="  m-auto mt-4  px-4">{children}</main>
        <footer className=" flex h-12 justify-center items-center shadow-inner p-12 mt-12">
          Зохоигчийн эрхээр хамгаалагдсан rnaa llc
        </footer>
      </div>
    </div>
  );
}
