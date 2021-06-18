/**
 * this implementation creates a express webserver where you can fetch json information about the auction
 * just another way to trying it out for the future
 * / */

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const rpcUrl = "https://rinkeby.infura.io/v3/d1fdd8caeb5248ec83f1413e78e546f1";
const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const path = require('path');

const { contractAuctionABI,
    ContractABI, 
    bc,
    } = require('./src/components/config');
const app = express();

const DEFAULT_PORT = 3001;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;



app.use(express.json());

//app.use(express.static(path.join(__dirname, './dist')));

app.get('/api/eth', (req,res) =>{
    res.json({ AuctionCreatorAddress, AuctionAddress, Owner, hasFinished});
    
    
    });
    



const web3 = new Web3(rpcUrl);

web3.eth.accounts.wallet.add({
    privateKey: '0x4278b9f4c1a096f23336cef0c54b84bf8ec381504568ed11a73c3a07aa8b2db9',
    address: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'
});

//console.log(
  //  web3.eth.accounts.wallet);
/*
const account = "0x45F4ad5A77aAA7258c8045F9E006BABd70Aa8366";
web3.eth.getBalance(account, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log(balance);

//contract address
const address = "0x7993267fff0B6c0885BccBC58d803750D539252b";
const contract = new web3.eth.Contract(abi, address);
//contract.methods.createAuction().send();
*/
//console.log(web3.eth.accounts[0]);

// const account = "0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C";

// web3.eth.getBalance(account, (err, wei) => {
//     balance = web3.utils.fromWei(wei, 'ether')
//     console.log(balance);
// });

//const contractAddress = "0x558b22595717B253336587c47fdc5c685c2cB526";

const mycontract = new web3.eth.Contract(ContractABI);








//contract.methods.createAuction().send({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', gas:200000},(err, result) => { console.log(result) });

let myContract = new web3.eth.Contract( ContractABI, {
  //  from: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', // default from address
  //  gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});

let auctioncontract;



let AuctionAddress = "";

let bool = true; 

let Owner = "";

let AuctionCreatorAddress="";
let hasFinished = false;


myContract.deploy({
    data:bc
}).send({
    from: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C',
    gas: 4700000
}).then((instance) => { 
    console.log("Contract mined at " + instance.options.address);
    AuctionCreatorAddress = instance.options.address; 

   instance.methods.auctions(0).call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => {console.log("contract address  is ", result) ; AuctionAddress = result; 
 }).then(() => {
    auctioncontract =  new web3.eth.Contract( contractAuctionABI, AuctionAddress);
    auctioncontract.methods.owner().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { console.log( "Owner is  " , Owner = result); hasFinished=true;  });
})
    
//AuctionAddressd = Buffer.from(AuctionAddress, 'hex');



}).then(() => {  

   

    

}).then(() => {  

    


  //  instance.methods.auctions(0).call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { AuctionAddress = result; console.log("contract address  is ", result) });
//    console.log(AuctionAddressd);
    //auctioncontract =  new web3.eth.Contract( contractAuctionABI, AuctionAddress);

   // let auctioncreator = new web3.eth.Contract( ContractABI, helloInstance);
    //auctioncontract.methods.owner().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { console.log( "Owner is  " , result) });

});


// auctioncontract.methods.owner().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { console.log( "Owner is  " , Owner = result); hasFinished=true;  });
// })
    
let auctioncontractt =  new web3.eth.Contract( contractAuctionABI, '0xa48504Bcc34C69e54e628c372E861bAbF2830463');
      auctioncontractt.methods.finalizeAuction().send({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', gas:200000},(err, result) => { console.log( "highestbidder is  " , HighestBidder = result);  });







app.listen(DEFAULT_PORT, () => {
    
    console.log(`listening at localhost: ${DEFAULT_PORT}`)

    
});



//console.log("the string type is ",typeof(helloInstance));

// let AuctionAddress = Buffer.from(helloInstance, 'hex');


//privatek = Buffer.from('c293ca01402b498cf37e541123cb2057fd88fa3963347ab050a6066a92342097', 'hex');
//privatekk = '0xc293ca01402b498cf37e541123cb2057fd88fa3963347ab050a6066a92342097';
//imported account

/*
privatek = Buffer.from('4278b9f4c1a096f23336cef0c54b84bf8ec381504568ed11a73c3a07aa8b2db9', 'hex');
const account1 = "0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C";
web3.eth.getBalance(account1, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log(balance);
});
//build transaction
web3.eth.getTransactionCount(account1, (err, txCount) =>{
//smart contract data
 
const data = '';
const txObject = {
        nonce: web3.utils.toHex(txCount) ,
     //   to: contractAddress,
      // value: web3.utils.toHex( web3.utils.toWei('0.01','ether')) ,
        gasLimit: web3.utils.toHex(2000000)  ,
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')) ,
        data: data
    }
    console.log(txObject);
    
const tx = new Tx(txObject, {chain:'rinkeby'});
tx.sign(privatek);
const serializedTransaction = tx.serialize();
const raw = '0x' + serializedTransaction.toString('Hex');
//broadcast transaction
web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
    console.log('err : ',err,'txHash : ',txHash)
    //use this hash to find smartcontract on etherscan
    }).on('receipt ', console.log,);
    
// web3.eth.getBalance(account1, (err, wei) => {
//     balance = web3.utils.fromWei(wei, 'ether')
//     console.log(balance);
// });
});
*/

 //let send = web3.eth.sendTransaction({from:privatekk, to:"0xD0762510d4D90BcE826CB22c66FBC974d9Aa3Ce2", value:web3.utils.toWei('10','gwei')});

 //console.log(send);

//contract.methods.numberofcontracts().call((err, result) => { console.log("number of contracts: ", result) });


// Sign the transaction
