to run type npm run start, it should open up a browser connect to localhost:3000

Instructions on how to enter the bid are listed when the application is launched.
Rarely it get stucks this has to do with pending transaction refreshing the page will fix it.

This Auction was built and compiled on Remix IDE, Each time the program is ran Contractcreator is deployed on the Etheruem testnet Rinkbey which in turn creates an instance of the Auctioncontract which is given to users to send ether to bid. Bids are based on the highest binding bid similar to Ebays implementation. This programs uses web3js to deploy the contract, send and make calls and finalize the auction. React and Javascript are used for the design and layout. The public key and private key for the owner contract are hardcoded in, this is only for convience sake since all you need is a ether wallet supplied with rinkbey faucet to enter the auction without having to download any additional software excluding npm install to download the packages. 

I will keep improving this in the future since I really had a fun time making this and it should me alot of the power of Etheruem smart contracts. if you have any suggestions feel free to submit a form through the Auction application or email me zeleke@unlv.nevada.edu
