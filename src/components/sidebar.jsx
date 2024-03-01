import "../App.css";
import {
  IoMdArrowForward,
  IoMdAdd,
  IoMdClose,
  IoMdRemove,
} from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Sidebar({ hide, backClicked, dataCart, payment, setDataCart, setPayment, totalPaymentLogic }) {


  function clickCheckout(e) {
    alert("Thank you for buying, your total is " + payment.toFixed(2));
    localStorage.removeItem("itemAmount");
    localStorage.removeItem("items");
    setDataCart([])
    setPayment(0)
  }

  function clickDelete(e) {
    localStorage.removeItem("itemAmount");
    localStorage.removeItem("items");
    setDataCart([])
    setPayment(0)
  }

  function addItem(e){
    for (let item of dataCart) {
      if (item.id == Number(e.target.id)) {
        item.count = item.count + 1;
        break;
      }
    }
    setDataCart(dataCart)
    totalPaymentLogic(dataCart)
    localStorage.setItem("items", JSON.stringify(dataCart));
    localStorage.setItem("itemAmount", getAllAmountItem());
  }

  function removeItem(e){
    for (let idx in dataCart) {
      if (dataCart[idx].id == Number(e.target.id)) {
        dataCart[idx].count = dataCart[idx].count - 1;
        if(dataCart[idx].count === 0){
          dataCart.splice(idx,1)
        }
        break;
      }
    }

    function getAllAmountItem(data){
      let count = 0;
      for (let item of dataCart) {
        count = count + item.count;
      }
      return count;
    }

    setDataCart(dataCart)
    totalPaymentLogic(dataCart)
    localStorage.setItem("items", JSON.stringify(dataCart));
    if(dataCart.length === 0){
      localStorage.removeItem("itemAmount");
    }else{
      localStorage.setItem("itemAmount", getAllAmountItem());
    }

  }

  return (
    <>
      <div
        className={`${hide} w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
      >
        <div className="flex items-center justify-between py-6 border-b">
          <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
            <IoMdArrowForward onClick={backClicked} className="text-2xl" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
          <div className="flex flex-col gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
            {(dataCart)
              ? dataCart.map((item, index) => (
                  <div className="w-full min-h-[150px] flex items-center gap-x-4">
                    <div>
                      <Link to={`../${item.id}`}>
                        <img className="max-w-[80px]" src={item.image} alt="" />
                      </Link>
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex justify-between mb-2">
                        <Link to={`../${item.id}`}>
                        <div className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline">
                          {item.title}
                        </div>
                        </Link>
                        <div className="text-xl cursor-pointer">
                          <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
                        </div>
                      </div>
                      <div className="flex gap-x-2 h-[36px] text-sm">
                        <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
                          <div id={item.id} onClick={removeItem} className="h-full flex-1 flex justify-center items-center cursor-pointer">
                            <IoMdRemove id={item.id}/>
                          </div>
                          <div className="h-full flex justify-center items-center px-2">
                            {item.count}
                          </div>
                          <div id={item.id} onClick={addItem} className="h-full flex flex-1 justify-center items-center cursor-pointer">
                            <IoMdAdd id={item.id}/>
                          </div>
                        </div>
                        <div className="flex flex-1 justify-around items-center">
                          $ {item.price}
                        </div>
                        <div
          
                          className="flex flex-1 justify-end items-center text-primary font-medium"
                        >{`$ ${parseFloat(item.count * item.price).toFixed(
                          2
                        )}`}</div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className="flex flex-col gap-y-3  mt-4">
          <div className="flex w-full justify-between items-center">
            <div className="font-semibold">
              <span id="price" className="mr-2">Subtotal:</span> ${" "}
              {payment.toFixed(2)}
            </div>
            <div
              onClick={clickDelete}
              className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            >
              <FiTrash2 />
            </div>
          </div>
          <button
            onClick={clickCheckout}
            className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
