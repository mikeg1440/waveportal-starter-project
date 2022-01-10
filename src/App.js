import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import './App.css';
import abi from './utils/WavePortal.json';

export default function App() {

  const [currentAccount, setCurrentAccount] = useState('');
  const [waveCount, setWaveCount] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [wavers, setWavers] = useState([]);
  const [message, setMessage] = useState('');
  
  // const contractAddress = '0x52371aF3d23447c22B61dc6260aEc2780d66acC9';
  // const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  // const contractAddress = '0xA48EBd2f2af260BC001E084D64928C4075eA4Ed3';
  // const contractAddress = '0xFE19539f39AcE6D822E9AF425B02F38cb9429eDB';
  // const contractAddress = '0xa1eB51bB069C88DA2070EB1116C1e9777f68aFfa';
  // const contractAddress = '0x3D8D5D00509D42cE01690331829b7a3D49021B5B';
  // const contractAddress = '0xcB854f3342656290cbBeCB6322A2114C2023788b';
  const contractAddress = '0xc20033AeEEAc59Abfb2a4a66fF9C592740916018';
  
  const contractABI = abi.abi;
  
  const getAllWavers = async () => {
    try {
      const { ethereum } = window;
      
      if (ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const wavesData = await wavePortalContract.getWavers();
        
        const wavers = wavesData.map(waver => {
          return {
            address: waver.waver,
            timestamp: new Date(waver.timestamp * 1000),
            message: waver.message,
          }
        }).reverse();
        
        setWavers(wavers);
      }else {
        console.log('Ethereum object not found!');
      }
    } catch (err) {
      console.log(`Error getting wavers!\nError: ${err}`);
    }
  }
  
  const isMetaMaskDetected =  async() => {
    try {
      // Check for the ethereum object that metamask injects into window
      const { ethereum } = window;
      
      if (!ethereum){
        console.log('✋ MetaMask not detected!\nPlease install the MetaMask extension!');
        return;
      }
        
      console.log('👍 MetaMask Detected');
      console.log(ethereum);
      
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0){
        console.log(`Found ${accounts.length} accounts!`);
        const account = accounts[0];
        console.log(`Using authorized account: ${account}`)
        setCurrentAccount(account);
        getTotalWaves();
        getAllWavers();
      }else {
        console.log('No authorized accounts found!');
      }
      
    } catch (err) {
      console.log(`Error: ${err}`);
    }  
  }
  
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum){
        alert('Please Install MetaMask to Login!');
        return;
      }
      
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      console.log(`Connected ${accounts[0]}`);
      setCurrentAccount(accounts[0]);
      getTotalWaves();
      getAllWavers();
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
  
  const getTotalWaves = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum){
        console.log('✋ Error! Ethereum object not found!');
        return 0;
      }
      
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      
      let count = await wavePortalContract.getTotalWaves();
      count = count.toNumber();
      console.log(`Retrieved total wave count: ${count}`);
      
      setWaveCount(count);
      return count;
    } catch (err) {
      console.log(`Error getting total waves: ${err}`);
      return;
    }
  }
  
  const wave = async () => {
    try {
      const { ethereum } = window;
      
      if (ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        debugger
        // let count = await wavePortalContract.getTotalWaves();
        // console.log(`Retrieved total wave count: ${count}`);
        let count;
        
        const waveTxn = await wavePortalContract.wave(message, {gasLimit: 300000 });
        console.log(`Mining....\nHash: ${waveTxn.hash}`);
        setIsMining(true);
        
        await waveTxn.wait();
        console.log(`Mining Done\nHash: ${waveTxn.hash}`);
        setMessage('');
        setIsMining(false);
        
        count = await wavePortalContract.getTotalWaves();
        // const wavers = await wavePortalContract.getWavers();
        console.log(`Retrieved total wave count: ${count}`);
        setWaveCount(count.toNumber());
        // setWavers(wavers);
      }else {
        console.log('Ethereum object doesn\'t exists');
      }
    } catch (err) {
      console.log(err);
      debugger
      setIsMining(false);
        alert('Wave Failed!\nThere was a error while mining the transaction!')
    }
  }
  
  useEffect(() => {
    let wavePortalContract;
    
    const onNewWave = (from, timestamp, message) => {
      console.log(`👌 New Wave Detected\n\tFrom: ${from}\n\ttimestamp: ${timestamp}\n\tmessage: ${message}`);
      setWavers(prevState => [
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
        ...prevState,
      ]);
    };
    
    if (window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      wavePortalContract.on('NewWave', onNewWave);
    }
    return () => {
      if (wavePortalContract){
        wavePortalContract.off('NewWave', onNewWave);
      }
    }
  }, []);
  
  useEffect(() => {
    isMetaMaskDetected();
  }, []);
  
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">Cyber Wave Portal</div>

        <img
          className="waveImage"
          src="https://cliply.co/wp-content/uploads/2019/06/391906110_WAVING_HAND_400px.gif"
          alt="Hand waving gif"
        />

        <div className="waveCount">{waveCount} Total Waves</div>

        <div className="bio">
          I'm a Fullstack dev learning some Web3 stuff, Connect your Ethereum
          wallet and wave at me through the blockchain!
        </div>

        {isMining && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            Waiting for transaction to be mined...
            <br />
            <CircularProgress sx={{ padding: "1rem" }} />
          </Box>
        )}

        {currentAccount && !isMining && (
          <>
            <input type='text' className='waveMessage' placeholder='Leave a message with your wave...' value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className="waveButton" onClick={wave}>
              Wave at Me
            </button>
          </>
        )}

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>          
        )}
        
      {wavers.map((wave, index) => {
          return (
            <div key={index} className='waveMessage'>
              <div className='messageAddress'> {wave.address}</div>
              <div>Message:<span className='messageText'> {wave.message}</span></div>
              <div className='timestamp'>{wave.timestamp.toString()}</div>
            </div>)
        })}
        
      </div>
    </div>
  );
}
