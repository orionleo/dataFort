import { useState } from "react";

import swal from "sweetalert";
import Loader from "./Loader";
import Image from "next/image"

const Images = ({ contract, provider, account }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [senderAdress, setSenderAdress] = useState("");

  const getdata = async () => {
    setIsLoading(true);
    console.log("random call");
    let dataArray;
    const Otheraddress = senderAdress;
    try {
      if (Otheraddress) {
        const signer = contract.connect(provider.getSigner());
        dataArray = await signer.viewDocuments(Otheraddress);
        // console.log(dataArray);
      } else {
        const signer = contract.connect(provider.getSigner());
        dataArray = await signer.viewDocuments(account);
      }
    } catch (e) {
      console.log(e);
      swal({title:"You don't have access",icon:'error',button:'Ok'});
      setIsLoading(false);
      return;
    }
    console.log(dataArray);
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <Image
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></Image>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4 ">
        <div className="flex flex-col flex-1 items-center jusitfy-start w-full mt-[-50px]">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            {isLoading ? (
              <Loader />
            ) : (
              <>
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
                  Upload
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
