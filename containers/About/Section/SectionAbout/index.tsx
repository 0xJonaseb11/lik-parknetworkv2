import { link } from 'joi';
import SectionBrands from '../SectionBrands';

export default function SectionAbout() {
  return (
    <section className="container pb-5 mb-md-2 my-lg-4 mb-lg-4">
      <h1 className="border-bottom pb-4 px-5">About The WePark Network</h1>
      <div className="row pt-2 pt-md-3">
        <div className="col-md-6">
          <p className="fs-lg pe-lg-4 mb-1 mb-lg-4 px-5">
      WePark is a decentralized parking network that provides affordable, reliable parking spaces where you need them. You can think of it like AirBnB for parking. 
      Property owners who have available parking spaces or parking lots can list them on WePark, and drivers can easily find and book these spaces through the platform.
          </p>
          <p className="fs-lg pe-lg-4 mb-1 mb-lg-4 px-5">
      Now, more than ever, parking is a major issue in urban areas. With the rise of electric vehicles, the need for charging stations is also increasing. 
      We believe that the best way to solve this problem is to create a decentralized parking network where drivers can easily find and book parking spaces in their neighborhood.
          </p>
          <p className="fs-lg pe-lg-4 mb-1 mb-lg-4 px-5">
     In 2023 WePark broke ground on our first parking lot in the Chicago, IL suburb of Oak Park. Reception was overwhelmingly positive, as we will be providing a much-needed service to the community.
     With only a handfull of reliable EV charging stations in the area, coupled with the growing number of apartment buildings and multi-family homes, WePark is poised to become a staple in the community.
          </p>

        </div>
        <div className="col-md-6">
          <p className="fs-lg ps-lg-4 mb-1 mb-lg-4 px-5">
            WePark is built from the ground up in web3. The key components of WePark are:
            <ul className="flex flex-col gap-3 mt-4">
              <li>
                <b>WePark Membrship:</b> The WePark Membership is a montly fee-based membership that allows users to access exclusive features and benefits. There are currently 3 types of memberships: Standard, Fleet, and VIP.
              
              </li>
              <li>
                <b>WePark Network Partners:</b> Property owners who have available parking spaces or parking lots can list them on WePark and create passive income. Transactions are worry-free because they are transparent and secure.
              </li>
              <li>
                <b>WePark Space NFT:</b> Each parking space on the WePark Network is represented by a unique NFT. This NFT is minted when a parking space is added to the network and is used to track the space's availability and usage.
                Amentities for each space are also tracked so users can quickly find EV charging, handicap access, and more.
              </li>
              <li>
                <b>PARK Token:</b> We've developed an ERC-20 based token called PARK that is used for all transactions on the WePark Network. Users can earn PARK by listing their parking spaces, referring new users, and more.
              </li>
              <li>
                <b>WePark DAO:</b> WePark is governed by a DAO. Holders of the governance token can vote on proposals and make changes to the WePark Network. The DAO is responsible for making decisions about the network's future.
              </li>
            </ul>
            
          </p>
        </div>
      </div>

      <SectionBrands />

      {/* Second Row for About */}

      <div className="row pt-2 pt-md-3">
        <div className="col-md-6">
          <p className="fs-lg pe-lg-4 mb-1 mb-lg-4 px-5">
          We’re really proud of what we’ve built for WePark. With our strategic integration of Solidity and Lisk Layer 2 technologies, 
              we crafted a pioneering solution for shared parking spaces. We built smart contracts to automate key processes such as daily 
              parking transactions, customer memberships, and new parking lots and spaces being added to the network. 
          <ul className="flex flex-col gap-3 mt-4">
          
            <li>
              By leveraging Lisk Layer 2, WePark significantly enhances transaction speeds and reduces operational costs, crucial for 
              managing the high volume of interactions typical in urban parking solutions. This integration not only ensures seamless 
              interoperability between different blockchain functionalities but also enables effective interactions with other web services, 
              expanding the utility and reach of our platform.
            </li> 
            <li>
              Security and reliability are at the forefront of WePark's architecture. The use of Solidity and Lisk L2 inherently boosts the 
              security measures, protecting against vulnerabilities and ensuring the integrity of user data. This robust security framework 
              supports a secure environment for users’ financial and personal information.
            </li>
            <li>
              Our innovative application of blockchain technology extends beyond traditional uses, showcasing blockchain's potential to 
              revolutionize decentralized physical infrastructure and improve accessibility to urban services. WePark's platform is not 
              just a technical achievement but a model for future blockchain applications in diverse sectors.
            </li>
            <li>
              Metrics from our deployment phase indicate substantial improvements in transaction throughput and user engagement, underscoring 
              the effectiveness of our technological choices. Moreover, the scalable and adaptable architecture ensures WePark is well-prepared 
              to evolve alongside advancements in blockchain technology and expand as the user base grows.
            </li>
          </ul>
          </p>
        </div>
        <div className="col-md-6">
          <p className="fs-lg ps-lg-4 mb-1 mb-lg-4 px-5">
            Gelato powers the WePark Network by automating and securing its
            operations through advanced blockchain technology. Here's how Gelato
            enhances the network:
            <ul className="flex flex-col gap-3 mt-4">
              <li>
                <b>Automated Transactions:</b> Gelato uses smart contracts to
                automate every transaction within the network. Whether it’s a
                car entering a lot, a membership renewal, or adding a new
                parking space, Gelato handles these with pre-defined rules that
                execute automatically—ensuring fast and error-free transactions.
              </li>
              <li>
                <b>Robust Security:</b> By leveraging multi-signature security
                protocols and encrypted communications, Gelato protects all
                transactions from unauthorized access and potential threats,
                maintaining the integrity and trust of the WePark Network.
              </li>
              <li>
                <b>Instant Updates:</b> When new parking spaces are added to the
                network, Gelato's decentralized infrastructure immediately
                synchronizes this data across the platform. This is done using
                distributed ledger technology, which ensures that the
                information is consistent and instantly available to all users.
              </li>
              <li>
                <b>Scalability Solutions:</b> As more users join the WePark
                Network, Gelato supports growth without lagging. It utilizes
                efficient data handling techniques like rollups, which process
                transactions off-chain and then record them on-chain,
                significantly speeding up transactions while reducing costs.
              </li>
            </ul>
            </p>
            <p className="fs-lg ps-lg-4 mb-1 mb-lg-4 px-5">

            By integrating these technologies, Gelato not only simplifies the
            management of the WePark Network but also ensures it can scale
            efficiently and securely, meeting the needs of a growing user base
            without compromising on speed or security.
          </p>
        </div>
      </div>
    </section>
  );
}
