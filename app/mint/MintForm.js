// app/mint/MintForm.js
"use client";

import { useState, useEffect } from 'react';
import Web3 from 'web3';
import styles from './MintForm.module.css';
import parkSpaceNFTABI from './ParkSpaceNFT.json';
import weParkNetworkABI from './WeParkNetwork.json';
import weParkMembershipNFTABI from './WeParkMembershipNFT.json';

const contractABIs = {
  ParkSpaceNFT: parkSpaceNFTABI,
  WeParkNetwork: weParkNetworkABI,
  WeParkMembershipNFT: weParkMembershipNFTABI,
};

// Hard code the contract addresses and network settings
const network = 'testnet'; // or 'mainnet'
const contractAddresses = {
  mainnet: {
    ParkSpaceNFT: '0xYourMainnetParkSpaceNFTAddress',
    WeParkNetwork: '0xYourMainnetWeParkNetworkAddress',
    WeParkMembershipNFT: '0xYourMainnetWeParkMembershipNFTAddress',
  },
  testnet: {
    ParkSpaceNFT: '0x4CCd1EFDC7e6E77ddacb5E0bc272913F2Cf8c997',
    WeParkNetwork: '0xbD5513023881a6f88c33D2E6EE5863Ef1B4fCf32',
    WeParkMembershipNFT: '0x0eaDDcf42eE8Deab9906a9c30f731a411C8fDe37',
  },
};

const MintForm = ({ contractName }) => {
  const contractAddress = contractAddresses[network][contractName];
  const [tokenURI, setTokenURI] = useState('');
  const [message, setMessage] = useState('');
  const [mintedTokens, setMintedTokens] = useState([]);

  useEffect(() => {
    fetchMintedTokens();
  }, []);

  const handleMint = async () => {
    if (!validateTokenURI(tokenURI)) {
      setMessage('Invalid Token URI');
      return;
    }

    if (!window.ethereum) {
      setMessage('Please install MetaMask');
      return;
    }

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    const contractABI = contractABIs[contractName];

    if (!contractABI || !contractABI.abi) {
      setMessage(`No ABI found for contract: ${contractName}`);
      return;
    }

    if (!contractAddress) {
      setMessage(`No contract address found for contract: ${contractName}`);
      return;
    }

    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

    try {
      await contract.methods.mint(tokenURI).send({ from: accounts[0] });
      setMessage('Minting successful!');
      fetchMintedTokens(); // Fetch updated list of minted tokens
    } catch (error) {
      setMessage(`Minting failed: ${error.message}`);
    }
  };

  const fetchMintedTokens = async () => {
    if (!window.ethereum) {
      setMessage('Please install MetaMask');
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contractABI = contractABIs[contractName];
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

    try {
      const totalSupply = await contract.methods.totalSupply().call();
      const tokens = [];

      for (let i = 0; i < totalSupply; i++) {
        const tokenId = await contract.methods.tokenByIndex(i).call();
        const tokenURI = await contract.methods.tokenURI(tokenId).call();
        tokens.push({ tokenId, tokenURI });
      }

      setMintedTokens(tokens);
    } catch (error) {
      setMessage(`Failed to fetch minted tokens: ${error.message}`);
    }
  };

  const validateTokenURI = (uri) => {
    try {
      new URL(uri);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Mint {contractName}</h2>
      <input
        type="text"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        placeholder="Token URI"
        required
        className={styles.inputField}
      />
      <button onClick={handleMint} className={styles.submitButton}>
        Mint {contractName}
      </button>
      {message && <p className={styles.message}>{message}</p>}

      <h3>Minted Tokens</h3>
      <ul>
        {mintedTokens.map((token) => (
          <li key={token.tokenId}>
            <strong>Token ID:</strong> {token.tokenId} <br />
            <strong>Token URI:</strong> {token.tokenURI}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MintForm;
