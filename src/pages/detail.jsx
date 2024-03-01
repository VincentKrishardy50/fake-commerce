import { Link, useParams } from "react-router-dom";
import "../App.css";
import { IoArrowBackCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function Details() {
  const [detail, setDetail] = useState({});
  const [hide, setHide] = useState("-right-full")
  const[dataCart, setDataCart] = useState(JSON.parse(localStorage.getItem("items")));
  const [payment, setPayment] = useState(0);
  const id = ((Number(useParams().id)-1)%20)+1 
  const realId = useParams().id

  const url = "https://fakestoreapi.com/products/" + id;

  useEffect(() => {
    axios.get(url).then(
      (response) => {
        setDetail(response.data);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    if(localStorage.getItem("cartOpen")){
      setHide("right-0");
    }
  }, [realId]);

  function clickCart(e) {
    setHide("right-0");
    localStorage.setItem("cartOpen", "opened");
  }

  function backClicked(e) {
    setHide("-right-full");
    localStorage.removeItem("cartOpen");
  }

  function addItem(e){
    alert("Product added to cart!")
    let amount = document.getElementById("amount")
    amount.textContent = Number(localStorage.getItem("itemAmount")) + 1
    localStorage.setItem("itemAmount", amount.textContent)

    let items = [];
    let isExists = false;

    if(localStorage.getItem("items")){
        items = JSON.parse(localStorage.getItem("items"))
        for(let item of items){
            if(item.id == realId){
                item.count = item.count + 1;
                isExists = true;
                break;
            }
        }
    }
    
    if (isExists === false) {
        const detailAdded = { ...detail };
        detailAdded.count = 1;
        detailAdded.id = realId;
        items.push(detailAdded);
      }
      localStorage.setItem("items", JSON.stringify(items));
      setDataCart(items)
      totalPayment(items)
  }

  function totalPayment(data) {
    let total = 0;
      for (let item of data) {
        total = total + item.count * item.price;
      }
      setPayment(total)
  }

  return (
    <>
      <Header clickCart={clickCart}/>
      <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 max-h-screen flex flex-col items-center relative">
        <div className="w-[100vw] pl-20">
          <Link to={".."}>
            <IoArrowBackCircle
              className="text-primary cursor-pointer"
              size={40}
            />
          </Link>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img
                className="max-w-[200px] lg:max-w-xs"
                src={detail.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {detail.title}
              </h1>
              <div className="text-2xl text-red-500 font-medium mb-6">
                ${detail.price}
              </div>
              <p className="mb-8">{detail.description}</p>
              <button onClick={addItem} className="bg-primary py-4 px-8 text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Sidebar hide={hide} backClicked={backClicked} dataCart={dataCart} payment={payment} setDataCart={setDataCart} setPayment={setPayment} totalPaymentLogic={totalPayment}/>
    </>
  );
}
