import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// icons
import CloseIcon from "@mui/icons-material/Close";

function AddProductModal(props) {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box className="flex w-full justify-center items-center h-full">
        <div className=" w-1/5 bg-background rounded flex justify-start items-start relative">
          {/* close button */}
          <button className="absolute top-5 right-5" onClick={props.clickClose}>
            <CloseIcon fontSize="small" className="text-red-danger" />
          </button>
          <div className="p-10 w-full h-full flex flex-col mt-5">
            <h1 className="text-center font-medium text-green-success bg-background-success border-green-success border rounded-md p-2">
              Product created!
            </h1>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default AddProductModal;
