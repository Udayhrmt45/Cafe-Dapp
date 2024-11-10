import { useEffect, useState } from "react";
import abi from "./contractJson/cafe.json";
import { ethers } from "ethers";
import Memos from "./components/memos";
import Buy from "./components/buy";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          "0x3cCaDcC1C63d59afe28dEC6B9F3753ba6A8c6bC7",
          abi.abi,
          signer
        );

        setState({ provider, signer, contract });
      }
    };

    init();
  }, []);

  useEffect(() => {
    const handleAccountChange = (accounts) => {
      setAccount(accounts[0]);
    };

    window.ethereum.on("accountsChanged", handleAccountChange);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountChange);
    };
  }, []);

  return (
    <div className="App">
        <h1 style={{ color: "#3c2f2f" }}>Cafe Dapp</h1>
        <p>Life happens, but coffee helps!</p>
      
      <p className="account" style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      <Buy state={state}></Buy>
      <Memos state={state}></Memos>
    </div>
  );
}

export default App;
