import { useEffect, useState } from "react";
import "./memos.css";
const Memos = ({state}) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memoMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memoMessage();
  }, [contract]);
  return (
    <div className="container-fluid">
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>Orders</h3>           
                <table>
                <tbody >
          {memos.map((memo) => {
            return (
                    <tr style={{ justifyContent: "center"}}                        >
                      <td 
                        style={{
                          backgroundColor: "dodgerblue",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "100px",
                          color:"white",
                         
                        }}
                      >
                        {memo.name}
                      </td>
                      <td 
                        style={{
                          backgroundColor: "dodgerblue",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "800px",
                          color:"white"
                        }}
                      >
                        {new Date(memo.timestamp * 1000).toLocaleString()}
                      </td>
                      <td  
                        style={{
                          backgroundColor: "dodgerblue",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "300px",
                          color:"white"
                        }}
                      >
                        {memo.message}
                      </td>
                      <td  className="container-fluid"
                        style={{
                          backgroundColor: "dodgerblue",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "400px",
                          color:"white"
                        }}
                      >
                        {memo.from}
                      </td>
                    </tr>
             
            );
          })}
               </tbody>
                </table>
        </div>
  );
};
export default Memos;
