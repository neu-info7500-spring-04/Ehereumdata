import React, { useState, useEffect } from "react";
import axios from "axios";

const Details = () => {
  const [ethereumData, setEthereumData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ethereum-data");
        setEthereumData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ethereumData || !ethereumData.data || !ethereumData.data.item) {
    return <div>Data not available</div>;
  }

  const { latestRate, specificData } = ethereumData.data.item;

  const formatChange = (change) => {
    const roundedChange = parseFloat(change).toFixed(2);
    return roundedChange;
  };

  return (
    <div style={{marginTop:"8%", marginLeft:"5%"}}>
      <div className="info" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={`data:image/png;base64,${ethereumData.data.item.assetLogo.imageData}`}
          alt="Ethereum"
          style={{ width: '100px', height: '100px', marginRight: '20px' }}
        />
        <div className="general">
          <h2 className="blockTitle">
            Ethereum
            <br />
            <div style={{fontWeight:"lighter"}} className="priceHolder">
            {(parseFloat(latestRate.amount).toFixed(4))} USD
            </div>
          </h2>
        </div>
        <div style={{marginLeft:"15%"}}>
          <h5 >
            Market Cap:
            <br />
            <div style={{fontWeight:"lighter"}} className="priceHolder">
            {parseInt(specificData.marketCapInUSD)}
              
            </div>
            
          </h5>
          <h5 >
          Change (1 Hour):
            <br />
            <div style={{fontWeight:"lighter"}} className="priceHolder">
            {formatChange(specificData["1HourPriceChangeInPercentage"])}%
              
            </div>
            
          </h5>
        </div>
        
        <div style={{marginLeft:"5%"}}>
          <h5 >
          Circulating Supply:
            <br />
            <div style={{fontWeight:"lighter"}} className="priceHolder">
            {parseInt(specificData.circulatingSupply)}
              
            </div>
            
          </h5>
          <h5 >
          Change (1 Day):
            <br />
            <div style={{fontWeight:"lighter"}} className="priceHolder">
            {(formatChange(specificData["24HoursPriceChangeInPercentage"]))}%
              
            </div>
            
          </h5>
        </div>
        <div style={{marginLeft:"5%"}}>
          <h5 >
          Maximum Supply:
            <br />
            <div style={{fontWeight:"lighter"}} className="priceHolder">
            {parseInt(specificData.maxSupply)}
              
            </div>
            
          </h5>
          <h5 >
          Change (1 Week):
            <br />
            <div style={{fontWeight:"lighter"}} className="priceHolder">
            {formatChange(specificData["1WeekPriceChangeInPercentage"])}%
              
            </div>
            
          </h5>
        </div>
        <div style={{marginLeft:"5%"}}>
          <h5 >
         Price:
            <br />
            <div style={{fontWeight:"lighter"}} className="priceHolder">
            {(parseFloat(latestRate.amount).toFixed(4))} USD
              
            </div>
            
          </h5>
          <h5 >
         Symbol:
            <br />
            <div style={{fontWeight:"lighter"}} className="priceHolder">
            ETH
              
            </div>
            
          </h5>
        </div>
      </div>
      
      <div style={{marginLeft:"5%"}}>
        <h2>About Ethereum</h2>
        <p>Ethereum (ETH) is a digital asset, its price now is {(parseFloat(latestRate.amount).toFixed(4))} USD.</p>
      </div>
    </div>
  );
};

export default Details;
