import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import './App.css';
import abi from './utils/WavePortal.json';

export default function App() {

  const [currentAccount, setCurrentAccount] = useState('');
  
  const contractAddress = '0x52371aF3d23447c22B61dc6260aEc2780d66acC9';
  
  const contractABI = abi.abi;
  
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
      }else {
        console.log('No authorized accounts found!');
      }
      
    } catch (err) {
      console.log(`Error: ${err}`);
    }  
  }
  
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
