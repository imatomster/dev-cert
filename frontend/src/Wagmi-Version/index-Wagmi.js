import React, { useState } from "react";
import {
  useContract,
  useSigner,
  useAccount,
  useProvider,
  useContractRead,
  useContractWrite,
} from "wagmi";
import Increment from "./Increment.json";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");
  const [inp, setInput] = useState("");

  const contractABI = Increment.abi;
  const contractAddress = "0x52e0D206dE1080d7105814ca37724323bf5f8E98";

  // Set up wagmi hooks
  const { data: signer } = useSigner();
  const { isConnected } = useAccount();
  const provider = useProvider();

  // Set up contract hooks
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer || provider,
  });

  const viewClick = async () => {
    try {
      if (isConnected) {
        const response = await contract.get_message();
        setMsg(response);
        console.dir(response);
      } else {
        console.log("Wallet not connected");
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const setClick = async () => {
    try {
      if (isConnected && signer) {
        const response = await contract.store_message(inp, {
          gasLimit: 100000, // Adjust gas limit as needed
        });
        console.log(response);
      } else {
        console.log("Wallet not connected or signer not available");
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>B@B Dev Cert</h1>
        <a
          href="https://mumbai.polygonscan.com/address/0x52e0d206de1080d7105814ca37724323bf5f8e98#writeContract"
          style={{ color: "white", fontWeight: "bold" }}
        >
          {"<"} Deployed Mumbai Contract {">"}
        </a>
        <p>The Message: {msg}</p>
        <div>
          <input type="text" onChange={(e) => setInput(e.target.value)} />
          <button onClick={setClick}>Set Msg</button>
          <button onClick={viewClick}>View</button>
        </div>
      </header>
    </div>
  );
}

export default App;
