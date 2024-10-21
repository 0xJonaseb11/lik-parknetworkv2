import moment from "moment";
import { ethers } from "ethers";
import { IParkSpaceTransactions } from "../types/transcation.type";

export const PARKSPACE_CONTRACT_ADDRESS = '0x6288Fa0070e35B3948Bc72938Ca8aE7683d0368E';
export const MEMBERSHIP_CONTRACT_ADDRESS = '0x0eaDDcf42eE8Deab9906a9c30f731a411C8fDe37';
export const PARKNETWORK_CONTRACT_ADDRESS = '0x4CCd1EFDC7e6E77ddacb5E0bc272913F2Cf8c997';

export const getParkSpaceTransactions = async () => {
  let mintTrans: Array<IParkSpaceTransactions> = [];
  try {
    const res = await fetch(
      `https://sepolia-blockscout.lisk.com/api/v2/addresses/${PARKSPACE_CONTRACT_ADDRESS}/transactions?filter=to`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    );
    const resData = await res.json();
    if (!resData) return;

    const filterData = resData.items.filter(
      (item: any) => item.method == 'ERC721Mint'
    );
    filterData.forEach((item: any) => {
      if (!item.timestamp || !item.decoded_input) {
        throw new Error('Null pointer exception');
      }

      const duration =
        new Date().getTime() - new Date(item.timestamp).getTime();

      let txs: IParkSpaceTransactions = {
        transaction_id: item.hash!,
        member_id: item.decoded_input.parameters[0].value!,
        space_id: item.decoded_input.parameters[1].value!,
        entry: item.timestamp!,
        exit: item.timestamp!,
        duration: moment(duration).format('hh:mm:ss')
      };
      if (txs) mintTrans.push(txs);
    });
    return mintTrans;
  } catch (error) {
    console.error(error);
  }
};

export const provider = new ethers.BrowserProvider(window.ethereum);
