import { useState } from "react";

import swal from "sweetalert";
import Loader from "./Loader";
import Image from "next/image";

const Images = ({ contract, provider, account }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [senderAdress, setSenderAdress] = useState("");

  const getdata = async () => {
    let timeout;
    setIsLoading(true);
    let dataArray;
    const Otheraddress = senderAdress;
    try {
      if (Otheraddress) {
        const signer = contract.connect(provider.getSigner());
        dataArray = await signer.viewDocuments(Otheraddress);
      } else {
        const signer = contract.connect(provider.getSigner());
        dataArray = await signer.viewDocuments(account);
      }
    } catch (e) {
      swal({ title: "You don't have access", icon: "error", button: "Ok" });
      setData([]);
      setIsLoading(false);
      return;
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    setIsLoading(false);
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");

      let arr = [];

      str_array.map((item, i) =>
        arr.push(
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt={"new"}
              className="image-list rounded-md"
            ></img>
          </a>
        )
      );
      setData(arr);
    } else {
      swal({ title: "No image to display", icon: "error", button: "Ok" });
    }
    // Set timeout functionality
    timeout = setTimeout(() => {
      setIsLoading(false);
      swal({
        title: "Timed out, try again later",
        icon: "error",
        button: "Ok",
      });
    }, 10000); // Set timeout to 10 seconds
    setIsLoading(false);
    clearTimeout(timeout);
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4 ">
        <div className="flex flex-col flex-1 items-center jusitfy-start w-full mt-[-50px]">
          <div className="p-5 w-full flex flex-col justify-start items-center">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="flex h-full w-full">
                  {data.map((item, i) => (
                    <div className="mr-4">{item}</div>
                  ))}
                </div>
                <input
                  placeholder="Enter Sender's Address"
                  type="text"
                  value={senderAdress}
                  className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                  onChange={(e) => {
                    setSenderAdress(e.target.value);
                  }}
                />

                <button
                  type="button"
                  onClick={getdata}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Recvieve Data
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
