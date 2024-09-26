import BestDeals from "@/components/BestDeals";
import CarsBrand from "@/components/CarsBrand";
import Cash from "@/components/Cash";
import Employe from "@/components/Employe";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import LeaveReview from "@/components/LeaveReview";
import MainForm from "@/components/MainForm";
import MainInfo from "@/components/MainInfo";
import MainNews from "@/components/MainNews";
import Reviews from "@/components/Reviews";
import React from "react";

const Home = () => {
  return (
    <div>
      <Header />
      <Filter btn={true} />
      {/* <Cash /> */}
      {/* <MainInfo /> */}
      {/* <BestDeals /> */}
      {/* <CarsBrand /> */}
      <Employe />
      <Reviews />
      {/* <MainNews /> */}
      <div className="container">
        <MainForm />
      </div>
    </div>
  );
};

export default Home;
