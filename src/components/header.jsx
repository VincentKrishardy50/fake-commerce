import { useState } from "react";
import "../App.css";
import { BsBag } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";

export default function Header({ clickCart }) {

    function logOut(e){
        localStorage.removeItem("itemAmount");
        localStorage.removeItem("items");
        localStorage.removeItem("isLogin");
    }
  return (
    <>
      <header
        id="headers"
        className={"bg-none py-6 fixed w-full z-10 lg:px-8 transition-all"}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <div>
            <div className="w-[40px]">
              <h1
                style={{ fontFamily: '"Satisfy", cursive', fontSize: "1.5rem" }}
              >
                Fakecommerce
              </h1>
            </div>
          </div>

          <div className="flex gap-6">
            <div onClick={clickCart} className="cursor-pointer flex relative">
              <BsBag className="text-2xl" />
              <div
                id="amount"
                className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center"
              >
                {Number(localStorage.getItem("itemAmount"))}
              </div>
            </div>
            <div className="cursor-pointer flex relative">
              <CiLogout onClick={logOut} className="text-3xl" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
