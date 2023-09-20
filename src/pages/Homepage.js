import React from "react";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

function Homepage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1st column */}
      <div className="flex flex-row w-full h-rm-nav">
        <div className="w-1/2 bg-secondary h-full flex justify-center items-center relative">
          <img className="rounded-lg h-80 w-4/5 object-cover shadow-md absolute top-10 left-8" src="assets/img/patio-awning.png" alt="" />
          <img className="rounded-lg h-80 w-4/5 object-cover shadow-md absolute bottom-10 right-8" src="assets/img/retracable-awning.jpeg" alt="" />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <h1 className="font-bold text-7xl w-full text-center text-primary drop-shadow-lg">Transform Your Outdoor Space</h1>
          <p className="mt-5 text-text">Stay Cool and Comfortable in Your Outdoor Haven</p>
        </div>
      </div>

      {/* 2nd column */}
      <div className="flex flex-col w-full h-screen justify-start items-center mt-20">
        <h1 className="text-4xl font-bold text-accent">Read what our customer say</h1>

        <div className="flex flex-wrap container justify-between p-16 items-center">
          {/* testimonial 1 */}
          <div className="w-custom-50 h-80 m-8 p-10 shadow-lg rounded-lg bg-primary">
            <FormatQuoteIcon style={{ fontSize: '3rem', color: 'white' }} />
            <p className="mt-5 text-background italic">The awnings have transformed my outdoor space into a comfortable oasis. Highly recommended!</p>
            <div className="flex w-full flex-row mt-10">
              <img className="w-20 h-20 rounded-full object-cover" src="assets/img/user1.jpeg" alt="" />
              <div className="flex flex-col items-start justify-center ml-8">
                <h1 className="text-background text-lg font-medium">Celia Almeda</h1>
                <p className="text-background text-sm font-light">Kuala Lumpur</p>
              </div>
            </div>
          </div>

          {/* testimonial 2 */}
          <div className="w-custom-50 h-80 m-8 p-10 shadow-lg rounded-lg bg-primary">
            <FormatQuoteIcon style={{ fontSize: '3rem', color: 'white' }} />
            <p className="mt-5 text-background italic">These awnings added elegance to my deck and created a perfect space for entertaining guests.</p>
            <div className="flex w-full flex-row mt-10">
              <img className="w-20 h-20 rounded-full object-cover" src="assets/img/user2.jpeg" alt="" />
              <div className="flex flex-col items-start justify-center ml-8">
                <h1 className="text-background text-lg font-medium">John Ryan</h1>
                <p className="text-background text-sm font-light">Perlis</p>
              </div>
            </div>
          </div>

          {/* testimonial 3 */}
          <div className="w-custom-50 h-80 m-8 p-10 shadow-lg rounded-lg bg-primary">
            <FormatQuoteIcon style={{ fontSize: '3rem', color: 'white' }} />
            <p className="mt-5 text-background italic">Awnings on my storefront have boosted foot traffic and improved the overall ambiance.</p>
            <div className="flex w-full flex-row mt-10">
              <img className="w-20 h-20 rounded-full object-cover" src="assets/img/user3.png" alt="" />
              <div className="flex flex-col items-start justify-center ml-8">
                <h1 className="text-background text-lg font-medium">Sarah Mendoza</h1>
                <p className="text-background text-sm font-light">Kelantan</p>
              </div>
            </div>
          </div>

          {/* testimonial 4*/}
          <div className="w-custom-50 h-80 m-8 p-10 shadow-lg rounded-lg bg-primary">
            <FormatQuoteIcon style={{ fontSize: '3rem', color: 'white' }} />
            <p className="mt-5 text-background italic">The awnings reduced heat and glare, making my living space more comfortable and energy-efficient.</p>
            <div className="flex w-full flex-row mt-10">
              <img className="w-20 h-20 rounded-full object-cover" src="assets/img/user4.jpeg" alt="" />
              <div className="flex flex-col items-start justify-center ml-8">
                <h1 className="text-background text-lg font-medium">Elizabeth Keth</h1>
                <p className="text-background text-sm font-light">Kuala Lumpur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
