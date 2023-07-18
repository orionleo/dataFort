import { useState } from 'react';
import swal from 'sweetalert';
import Loader from './Loader';
import { Document,Page,pdfjs } from 'react-pdf';
import Image from 'next/image';

const Images = ({ contract, provider, account }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [senderAddress, setSenderAddress] = useState('');

  const getdata = async () => {
    let timeout;
    setIsLoading(true);
    let dataArray;
    const otherAddress = senderAddress;
    try {
      if (otherAddress) {
        const signer = contract.connect(provider.getSigner());
        dataArray = await signer.viewDocuments(otherAddress);
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
      let arr = [];
      await Promise.all(
        dataArray.map(async (item, i) => {
          try {
            const response = await fetch(`https://magenta-screeching-pigeon-769.mypinata.cloud/ipfs${item.substring(6)}`);
            const blob = await response.blob();
            const dataURL = await convertToDataURL(blob);
            arr.push(
              dataURL.substring(5,10)=="image"?(
                <Image key={i} src={dataURL} alt="new" blurDataURL={dataURL} placeholder='blur' className="image-list rounded-md" width={"200"} height={"200"} />
              ):(
                <embed
        src={dataURL}
        type="application/pdf"
        width="200px"
        height="200px"
      />
              )
              
            );
          } catch (error) {
            console.error('Error loading image:', error);
          }
        })
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

  const convertToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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
                <div className="flex h-full w-full flex-wrap">{data}</div>
                <input
                  placeholder="Enter Sender's Address"
                  type="text"
                  value={senderAddress}
                  className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                  onChange={(e) => {
                    setSenderAddress(e.target.value);
                  }}
                />

                <button
                  type="button"
                  onClick={getdata}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Receive Data
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
