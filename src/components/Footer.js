import React from "react";

function Footer() {
  return (
    <footer className="footer mx-auto bottom-0 bg-secondary">
      <div className="flex justify-center items-center p-4">
        <p className="text-center text-primary text-sm">
          &copy; {new Date().getFullYear()} Booking System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
