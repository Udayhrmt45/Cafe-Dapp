import { ethers } from "ethers";
import "./buy.css";

const Buy = ({ state }) => {
  const buyItem = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = ethers.utils.parseEther("0.001");

    try {
      const transaction = await contract.buyItem(name, message, {
        value: amount,
      });
      await transaction.wait();
      console.log("Transaction is successful");
    } catch (error) {
      console.error("Error buying item:", error);
    }
  };

  return (
    <div className="card">
      <h1>Buy an item</h1>
      <div className="center">
        <form onSubmit={buyItem} className="form">
          <div className="inputbox">
            <input type="text" name="" id="name" placeholder="Name" />
          </div>
          <div className="inputbox">
            <input type="text" name="" id="message" placeholder="Message" />
          </div>
          <br />
          <div className="inputbox">
            <input type="submit" value="Pay" disabled={!state.contract} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Buy;
