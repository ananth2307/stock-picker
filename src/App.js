import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import { filteredData } from "./utils";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(
        "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json"
      )
      .then((res) => {
        console.log("redis", res.data.data);
        setData(filteredData(res.data.data));
      });
  };
  useEffect(() => {
    getData();
    // setInterval(getData, 10000, 'Parameter 1', 'Parameter 2');
  }, []);
  return (
    <div className="App">
      <Table bordered>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>% Change</th>
            <th>Status</th>
            <th>
              <Button color="primary" onClick={() => getData()}>Refresh</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((dt) => (
            <tr key={`tr${dt.symbol}`} color="primary" className={dt.status === "BUY" ? 'buy' : 'sell'}>
              <td scope="row" key={`symbol${dt.symbol}`}>
                {dt.symbol}
              </td>
              <td key={`per${dt.symbol}`}>{dt.per}</td>
              <td key={`sts${dt.symbol}`}>{dt.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
