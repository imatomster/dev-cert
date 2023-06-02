import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import {ethers} from "ethers"
import Increment from "./Increment.json"


function App() {
  const [msg, setMsg] = useState("");
  const [inp, setInput] = useState("");
  
  const contractABI = Increment.abi;
  const addy ="0x52e0D206dE1080d7105814ca37724323bf5f8E98";

  const viewClick = async (e) => {
    try{
      if (window.ethereum) {
        // Request user authorization
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(addy, contractABI, provider);

        const response = await contract.get_message()
        setMsg(response)
        console.dir(response)
        // Now you can proceed with using the signer or interacting with contracts
      } else {
        // MetaMask is not installed or not available
        console.log('Please install MetaMask or use a compatible Ethereum browser.');
      }
    } catch(err) {
      console.log("ERROR", err)
    }
  };

  const setClick = async (e) => {
    try{
      if (window.ethereum) {
        // Request user authorization
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(addy, contractABI, signer);

        const response = await contract.store_message(inp)
        const signedTransaction = await signer.sendTransaction(response);
        const transactionResponse = await signedTransaction.wait();
        console.log(transactionResponse)
      
        // Now you can proceed with using the signer or interacting with contracts
      } else {
        // MetaMask is not installed or not available
        console.log('Please install MetaMask or use a compatible Ethereum browser.');
      }
    } catch(err) {
      console.log("ERROR", err)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>B@B Dev Cert</h1>
        <a href="https://mumbai.polygonscan.com/address/0x52e0d206de1080d7105814ca37724323bf5f8e98#writeContract" style={{ color: 'white', fontWeight: 'bold' }}>
          {"<"} Deployed Mumbai Contract {">"}</a>
        <p>
          The Message: {msg}
        </p>
        <div>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick = {() => setClick()}>Set Msg</button>
          <button onClick = {() => viewClick()}>View</button>
        </div>
      </header>
    </div>
  );
}

export default App;
