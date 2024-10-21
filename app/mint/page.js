// app/mint/page.js
import MintForm from './MintForm';
import parkSpaceNFTABI from './ParkSpaceNFT.json';
import weParkNetworkABI from './WeParkNetwork.json';
import weParkMembershipNFTABI from './WeParkMembershipNFT.json';

const parkSpaceNFTAddress = "0x6288Fa0070e35B3948Bc72938Ca8aE7683d0368E";
const weParkNetworkAddress = "0x4CCd1EFDC7e6E77ddacb5E0bc272913F2Cf8c997";
const weParkMembershipNFTAddress = "0x0eaDDcf42eE8Deab9906a9c30f731a411C8fDe37";

const MintPage = () => {
  return (
    <div>
      <h1>Mint NFTs</h1>
      <MintForm
        contractAddress={parkSpaceNFTAddress}
        contractName="ParkSpaceNFT"
      />
      <MintForm
        contractAddress={weParkNetworkAddress}
        contractName="WeParkNetwork"
      />
      <MintForm
        contractAddress={weParkMembershipNFTAddress}
        contractName="WeParkMembershipNFT"
      />
    </div>
  );
};

export default MintPage;
