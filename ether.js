/**
 * this implementation creates a express webserver where you can fetch json information about the auction
 * just another way to trying it out for the future
 * / */

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const rpcUrl = "https://rinkeby.infura.io/v3/d1fdd8caeb5248ec83f1413e78e546f1";


const { contractAuctionABI,
    ContractABI, 
    bc,
    Auctioncon,
    aucbc

    } = require('./src/components/config');



    

const web3 = new Web3(rpcUrl);

web3.eth.accounts.wallet.add({
    privateKey: '0x4278b9f4c1a096f23336cef0c54b84bf8ec381504568ed11a73c3a07aa8b2db9',
    address: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'
});

 
 
 
 
 let myContract = new web3.eth.Contract( Auctioncon, {
   //  from: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', // default from address
   //  gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
 });
 
 
 console.log("sadasd");
 
 myContract.deploy({
   data:aucbc,
   arguments: ['https://ipfs.io/ipfs/QmW8MD9cvkuVuBtVbRKhQCLESV9bVSDrUoNcoeUeqezFja?filename=dsp.txt']
 }).send({
   from: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C',
   gas: 4700000
 }).then((instance) => { 
   console.log("the true auction mined at " + instance.options.address);
   AuctionCreatorAddress = instance.options.address; 
 
 
 }) 
 