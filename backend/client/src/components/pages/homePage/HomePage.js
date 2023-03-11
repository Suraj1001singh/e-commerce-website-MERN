import React from "react";
import MainPages from "../../mainpages/MainPages";
import Featured from "../../features/Features";
import Collection from "../../collections/Collections";
import WomenCollection from "../../womenCollection/WomenCollection";
import OfferSection from "../../offerSection/OfferSection";
import NewCollections from "../../newCollection/NewCollection";
import NewsLetter from "../../newsLetter/NewsLetter";
import Footer from "../../footer/Footer";

const HomePage = () => {
  return (
    <>
      <MainPages></MainPages>
      <Featured></Featured>
      <Collection></Collection>
      <WomenCollection></WomenCollection>
      <OfferSection></OfferSection>
      <NewCollections></NewCollections>
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
