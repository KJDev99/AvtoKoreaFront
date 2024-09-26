import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";

const OrderSelect = ({ onOrderChange }) => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("Низкая цена");
  const orderRef = useRef(null);

  const orders = [
    { label: "Низкая цена", value: "price_yuan" },
    { label: "Высокая цена", value: "-price_yuan" },
    { label: "Mинимальный пробег", value: "probeg" },
    { label: "Mаксимальный пробег", value: "-probeg" },
  ];

  const toggleOrderDropdown = () => {
    setIsOrderOpen(!isOrderOpen);
  };

  const handleOrderChange = (order) => {
    setSelectedOrder(order.label);
    setIsOrderOpen(false);
    onOrderChange(order.value);
  };

  const handleClickOutside = (event) => {
    if (orderRef.current && !orderRef.current.contains(event.target)) {
      setIsOrderOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-md:w-full md:mt-2" ref={orderRef}>
      <div
        className="flex flex-col  rounded-[10px] cursor-pointer"
        onClick={toggleOrderDropdown}
      >
        <h2 className="text-[#050B20] max-md:text-sm">Порядок просмотра</h2>
        <div className="flex justify-between w-full my-2 items-center">
          <p className="text-sm text-[#050B20]">{selectedOrder}</p>
          <FaChevronLeft
            className={`text-sm transition-transform z-10 ${
              isOrderOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
      </div>
      {isOrderOpen && (
        <div className="absolute z-10 bg-white shadow-lg rounded-lg mt-2 w-full">
          {orders.map((order) => (
            <div
              key={order.value}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOrderChange(order)}
            >
              <p
                className={`text-sm ${
                  selectedOrder === order.label ? "font-medium" : "font-normal"
                }`}
              >
                {order.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSelect;
