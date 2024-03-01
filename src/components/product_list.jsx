import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import "../App.css";

export default function ProductList({data, itemPerPage, addItem}){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-lg mx-auto">
                {data.map((item, index) => (
                  <div className="p-4">
                    <div
                      key={index}
                      className="border border-[#e4e4e4] mb-4 relative overflow-hidden group transition rounded-lg"
                    >
                      <div className="aspect-w-1 aspect-h-1 flex justify-center items-center p-[1rem]">
                        <div className="w-[200px] h-[200px] flex justify-center items-center px-3">
                          <img
                            className="object-cover max-w-full max-h-full group-hover:scale-110 transition duration-300 rounded-lg"
                            src={item.image}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="absolute top-1 -right-11 group-hover:right-2 flex flex-row justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          style={{
                            background: "transparent",
                            boxShadow: "none",
                          }}
                          className="border-none p-0"
                        >
                          <div
                            id={Number(localStorage.getItem("page")-1)*(itemPerPage)+(index+1)}
                            className="flex justify-center items-center text-white w-12 h-12 bg-teal-500 rounded-full"
                          >
                            <BsPlus
                              id={Number(localStorage.getItem("page")-1)*(itemPerPage)+(index+1)}
                              onClick={addItem}
                              className="text-3xl"
                            />
                          </div>
                        </button>
                        <div className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl rounded-full">
                          <Link to={`${(Number(localStorage.getItem("page")-1)*(itemPerPage)+(index+1))}`}>
                            <BsEyeFill />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm capitalize text-black mb-1">
                        {item.category}
                      </div>
                      <div>
                        <Link to={`${(Number(localStorage.getItem("page")-1)*(itemPerPage)+(index+1))}`}>
                          <h2 className="font-semibold mb-1">{item.title}</h2>
                        </Link>
                      </div>
                      <h2 className="font-semibold">${item.price}</h2>
                    </div>
                  </div>
                ))}
              </div>
    )
}