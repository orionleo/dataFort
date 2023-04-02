import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/utils/constants.js";
import Modal from "react-awesome-modal";

import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import Welcome from "../components/Welcome.jsx";
import Images from "../components/Images.jsx";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataRecieved, setDataRecieved] = useState([]);
  const [shareAddress,setShareAddress ] = useState("");

  const sharing = async () => {
    const signer = contract.connect(provider.getSigner());
    await signer.grantAccess(shareAddress);
    setModalOpen(false);
  };
  useEffect(() => {
    if (!contract) {
      return;
    }
    (async () => {
      const signer = contract.connect(provider.getSigner());
      const addressList = await signer.getAccessList();

      setDataRecieved(addressList);
    })();
  }, [contract]);
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    (async () => {
      if (provider) {
        try {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          const newContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          //console.log(contract);
          setContract(newContract);
          setProvider(provider);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("Metamask is not installed");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome account={account} contract={contract} provider={provider} />
        <Images account={account} contract={contract} provider={provider} />
        {!modalOpen && (
          <div className="flex">
            <button
              type="button"
              className="text-white w-1/2 justify-center items-center mx-auto mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              Share
            </button>
          </div>
        )}
        {modalOpen && (
          <Modal
            visible={modalOpen}
            onClickAway={() => setModalOpen(false)}
            contract={contract}
            provider={provider}
            width="500px"
            height="200px"
          >
            <>
              <div className="">
                <div className="modalContainer">
                  <div className="title">Share with</div>
                  <div className="body">
                    <input
                      type="text"
                      className="address"
                      placeholder="Enter Address"
                      value={shareAddress}
                      onChange={(e)=>setShareAddress(e.target.value)}
                    ></input>
                  </div>
                  <form id="myForm">
                    <select id="selectNumber">
                      <option className="address">People With Access</option>
                      {dataRecieved.length>0&&(
                        dataRecieved.map((data,index)=>(
                          <option className="address">{data}</option>
                        ))
                      )}
                    </select>
                  </form>
                  <div className="footer">
                    <button
                      onClick={() => {
                        setModalOpen(false);
                      }}
                      id="cancelBtn"
                    >
                      Cancel
                    </button>
                    <button onClick={() => sharing()}>Share</button>
                  </div>
                </div>
              </div>
            </>
          </Modal>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;