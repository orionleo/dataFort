import { useEffect } from "react";
const Share = ({ setModalOpen, contract,provider }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
     const signer = contract.connect(provider.getSigner());
     await signer.grantAccess(address);
     setModalOpen(false);
    };
    useEffect(() => {
      if(!contract){
        return;
      }
      (async () => {
      const signer = contract.connect(provider.getSigner());
      const addressList = await signer.getAccessList();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    })();
  }, [contract]);
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
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
  );
};
export default Share;
