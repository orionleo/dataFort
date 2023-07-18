import React, { useContext, useState } from "react";
import Loader from "./Loader.jsx";
import FormData from "form-data";
import axios from "axios";
import swal from "sweetalert";

import { shortenAddress } from "@/utils/shortenAddress.js";

const Input = ({ placeholder, name, type, value }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    readOnly={true}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

function Welcome({ account, contract, provider }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const metadata = JSON.stringify({
        name: file.name.split(".")[0],
      });
      formData.append("pinataMetadata", metadata);
      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);
      
      
      try {
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.PINATA_KEY,
            pinata_secret_api_key:process.env.PINATA_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        const signer = contract.connect(provider.getSigner());
        await signer.addDocument(account, ImgHash);
        swal({
          title: "Successfully Image Uploaded",
          icon: "success",
          button: "Ok",
        });
      } catch (e) {
        swal({
          title: "Unable to upload image to Pinata",
          icon: "error",
          button: "Ok",
        });
        setIsLoading(false);
        return;
      }
    } else {
      swal({
        title: "Please add an image to upload",
        icon: "error",
        button: "Ok",
      });
    }
    setFileName("No image selected");
    setFile(null);
    setIsLoading(false);
  };
  const retrieveFile = (e) => {
    setIsLoading(true);
    const data = e.target.files[0]; //files array of files object
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
    setIsLoading(false);
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4 ">
        <div className="flex flex-1 justify-start flex-col mf:mr-10 mt-[-200px]">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Store your precious memories safely and securely in a decentralised
            manner
          </h1>
        </div>

        <div className="flex flex-col flex-1 items-center jusitfy-start w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Your address"
              name="addressTo"
              type="text"
              value={shortenAddress(account)}
              disabled={true}
            />
            <h1 className="text-white mb-5">Choose your image</h1>

            {isLoading ? (
              <Loader />
            ) : (
              <>
                <input
                  placeholder="Choose your image"
                  name="image"
                  type="file"
                  className="text-white"
                  onChange={retrieveFile}
                />
            <div className="h-[1px] w-full bg-gray-400 my-5" />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Upload
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
