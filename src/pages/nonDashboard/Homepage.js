import React from "react";

// components
import Topnav from "../../components/Topnav";
import Footer from "../../components/Footer";

// icon
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function Homepage() {
  return (
    <div className="w-full justify-center items-center min-h-screen flex flex-col">
      <div className="w-full flex justify-center shadow">
        <div className="container flex flex-col">
          <Topnav />
        </div>
      </div>
      <section className="flex flex-1 justify-center items-center container">
        <div className="flex md:flex-row flex-col w-full justify-center items-center h-rm-nav">
          <div className="md:w-1/2 w-full bg-secondary h-full flex justify-center items-center relative">
            <img
              className="rounded-lg h-80 w-4/5 object-cover shadow-md absolute md:top-36 left-8 top-8 md:block hidden"
              src="assets/img/patio-awning.png"
              alt=""
            />
            <img
              className="rounded-lg h-80 w-4/5 object-cover shadow-md absolute md:bottom-40 md:right-8 top-18 md:block"
              src="assets/img/retracable-awning.jpeg"
              alt=""
            />
          </div>
          <div className="md:w-1/2 w-full h-full flex flex-col justify-center items-center">
            <h1 className="font-bold text-7xl w-full text-center text-primary drop-shadow-lg">
              Transform Your Outdoor Space
            </h1>
            <p className="mt-5 text-text">
              Stay Cool and Comfortable in Your Outdoor Haven
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col flex-1 justify-center items-center container p-4 md:mt-20 mt-8">
        <h1 className="text-4xl font-bold text-accent text-center">
          Read what our customer say
        </h1>

        <div className="flex flex-wrap container justify-between md:p-32 items-center">
          {/* testimonial 1 */}
          <div className="w-custom-50 h-80 p-10 mt-8 md:mt-0 shadow-lg rounded-lg bg-primary">
            <FormatQuoteIcon style={{ fontSize: "3rem", color: "white" }} />
            <p className="mt-5 text-background italic">
              The awnings have transformed my outdoor space into a comfortable
              oasis. Highly recommended!
            </p>
            <div className="flex w-full flex-row mt-10">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="assets/img/user1.jpeg"
                alt=""
              />
              <div className="flex flex-col items-start justify-center ml-8">
                <h1 className="text-background text-lg font-medium">
                  Celia Almeda
                </h1>
                <p className="text-background text-sm font-light">
                  Kuala Lumpur
                </p>
              </div>
            </div>
          </div>

          {/* testimonial 2 */}
          <div className="w-custom-50 h-80 md:mt-10 mt-8 p-10 shadow-lg rounded-lg bg-primary">
            <FormatQuoteIcon style={{ fontSize: "3rem", color: "white" }} />
            <p className="mt-5 text-background italic">
              These awnings added elegance to my deck and created a perfect
              space for entertaining guests.
            </p>
            <div className="flex w-full flex-row mt-10">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="assets/img/user2.jpeg"
                alt=""
              />
              <div className="flex flex-col items-start justify-center ml-8">
                <h1 className="text-background text-lg font-medium">
                  John Ryan
                </h1>
                <p className="text-background text-sm font-light">Perlis</p>
              </div>
            </div>
          </div>

          {/* testimonial 3 */}
          <div className="w-custom-50 h-80 md:mt-10 mt-8 p-10 shadow-lg rounded-lg bg-primary">
            <FormatQuoteIcon style={{ fontSize: "3rem", color: "white" }} />
            <p className="mt-5 text-background italic">
              Awnings on my storefront have boosted foot traffic and improved
              the overall ambiance.
            </p>
            <div className="flex w-full flex-row mt-10">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="assets/img/user3.png"
                alt=""
              />
              <div className="flex flex-col items-start justify-center ml-8">
                <h1 className="text-background text-lg font-medium">
                  Sarah Mendoza
                </h1>
                <p className="text-background text-sm font-light">Kelantan</p>
              </div>
            </div>
          </div>

          {/* testimonial 4*/}
          <div className="w-custom-50 h-80 md:mt-10 mt-8 p-10 shadow-lg rounded-lg bg-primary">
            <FormatQuoteIcon style={{ fontSize: "3rem", color: "white" }} />
            <p className="mt-5 text-background italic">
              The awnings reduced heat and glare, making my living space more
              comfortable and energy-efficient.
            </p>
            <div className="flex w-full flex-row mt-10">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="assets/img/user4.jpeg"
                alt=""
              />
              <div className="flex flex-col items-start justify-center ml-8">
                <h1 className="text-background text-lg font-medium">
                  Elizabeth Keth
                </h1>
                <p className="text-background text-sm font-light">
                  Kuala Lumpur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;

{
  /* <div className="w-full flex md:flex-row flex-col justify-center items-center">
  <div className="md:w-1/2 w-full bg-secondary md:h-full flex justify-center items-center md:relative">
    <img
      className="rounded-lg h-80 w-4/5 object-cover shadow-md md:absolute md:-bottom-10 md:left-8"
      src="assets/img/patio-awning.png"
      alt=""
    />
    <img
      className="rounded-lg h-80 w-4/5 object-cover shadow-md md:absolute md:-top-20 md:right-8"
      src="assets/img/retracable-awning.jpeg"
      alt=""
    />
  </div>
  <div className="md:w-1/2 w-full md:h-full flex flex-col justify-center items-center px-4">
    <h1 className="font-bold text-7xl w-full text-center text-primary drop-shadow-lg">
      Transform Your Outdoor Space
    </h1>
    <p className="mt-5 text-text">
      Stay Cool and Comfortable in Your Outdoor Haven
    </p>
  </div>
</div>; */
}
