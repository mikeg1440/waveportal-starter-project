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
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
  
  const wave = async () => {
    try {
      const { ethereum } = window;
      
      if (ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        let count = await wavePortalContract.getTotalWaves();
        console.log(`Retrieved total wave count: ${count}`);
        
        const waveTxn = await wavePortalContract.wave();
        console.log(`Mining....\nHash: ${waveTxn.hash}`);
        
        await waveTxn.wait();
        console.log(`Mining Done\nHash: ${waveTxn.hash}`);
        
        count = await wavePortalContract.getTotalWaves();
        console.log(`Retrieved total wave count: ${count}`);
      }else {
        console.log('Ethereum object doesn\'t exists');
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    isMetaMaskDetected();
  }, []);
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">Cyber Wave Portal</div>

        <img
          className='waveImage'
          src="https://cliply.co/wp-content/uploads/2019/06/391906110_WAVING_HAND_400px.gif"
          alt="Hand waving gif"
        />

        <div className="bio">
          I'm a Fullstack dev learning some Web3 stuff, Connect your Ethereum
          wallet and wave at me through the blockchain!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        
        {!currentAccount && (
          <button className='waveButton' onClick={connectWallet} >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
