import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import Pagination from "../components/pagination";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "../components/landing_page";
import ProductList from "../components/product_list";

export default function Home() {
  const [data, setData] = useState([]);
  const [currPage, setPage] = useState(1);
  const itemPerPage = 8;
  const [hide, setHide] = useState("-right-full");
  const[dataCart, setDataCart] = useState(JSON.parse(localStorage.getItem("items")));
  const [payment, setPayment] = useState(0);

  function getDataPaging(data, page) {
    return data.slice((page - 1) * itemPerPage, page * itemPerPage);
  }

  function getPagination(data) {
    let pages = [];
    for (let i = 0; i < data.length / itemPerPage; i++) {
      pages.push(i + 1);
    }
    return pages;
  }

  function clickPage(e) {
    let page = e.target.textContent;
    let prevButtonContent = document.getElementById("page_"+currPage);
    prevButtonContent.className =
      "mx-1 px-6 py-4 rounded shadow text-black font-bold";
    let buttonContent = document.getElementById(e.target.id);
    buttonContent.className =
      "mx-1 px-6 py-4 rounded shadow text-white bg-black font-bold";
      localStorage.setItem("page", page);
    setPage(page);
  }

  function clickCart(e) {
    setHide("right-0");
    localStorage.setItem("cartOpen", "opened");
  }

  function backClicked(e) {
    setHide("-right-full");
    localStorage.removeItem("cartOpen");
  }

  function directToProduct() {
    let targetElement = document.getElementById("products");
    targetElement.scrollIntoView({ behavior: "smooth" });
  }

  function fetchData(){
    axios.get("https://fakestoreapi.com/products").then(
      (response) => {
        setData(response.data.concat(response.data).concat(response.data).concat(response.data));
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }


  useEffect(() => {
    if (localStorage.getItem("setToast")) {
      setTimeout(() => {
        toast('Signup Succesfull');
      }, 1)
      localStorage.removeItem("setToast");
    }

    fetchData();

    if(localStorage.getItem("cartOpen")){
      setHide("right-0");
    }
    localStorage.setItem("page", 1);
  }, []);

  function totalPayment(data) {
    let total = 0;
      for (let item of data) {
        total = total + item.count * item.price;
      }
      setPayment(total)
  }


  function addItem(e) {
    let id = ((Number(e.target.id)-1) % 20)+1;
    let amount = document.getElementById("amount");
    amount.textContent = Number(localStorage.getItem("itemAmount")) + 1;
    localStorage.setItem("itemAmount", amount.textContent);

    const url = "https://fakestoreapi.com/products/" + id;

    axios.get(url).then(
      (response) => {
        let detail = response.data;
        detail.id = e.target.id;
        let items = [];
        let isExists = false;
        if (localStorage.getItem("items")) {
          items = JSON.parse(localStorage.getItem("items"));
          for (let item of items) {
            if (item.id === detail.id) {
              item.count = item.count + 1;
              isExists = true;
              break;
            }
          }
        }

        if (isExists === false) {
          const detailAdded = { ...detail };
          detailAdded.count = 1;
          items.push(detailAdded);
        }
        localStorage.setItem("items", JSON.stringify(items));
        setDataCart(items)
        totalPayment(items)
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

  }

  return (
    <>
      <Header clickCart={clickCart} />
      <ToastContainer toastStyle={{ backgroundColor: "#0CDD08", color: "white" }}/>
      <div className="w-[100vw]">
        <LandingPage directToProduct={directToProduct}/>
        <section id="products" className="pt-[8rem]">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-10 text-center">
              Explore Our Products
            </h1>
            <div>
              <ProductList data={getDataPaging(data, currPage)} itemPerPage={itemPerPage} addItem={addItem}/>
              <Pagination paging={getPagination(data)} clickPage={clickPage} />
            </div>
          </div>
        </section>

        <Sidebar hide={hide} backClicked={backClicked} dataCart={dataCart} payment={payment} setDataCart={setDataCart} setPayment={setPayment} totalPaymentLogic={totalPayment}/>
      </div>
    </>
  );
}
