import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'
import AddForm from './AddForm'

import {  contractAuctionABI,
  ContractABI, 
  bc,
  formABI
} from './config';
  
const POLL_INTERVAL_MS = 1000;

let timer = 120;


let AuctionAddress = "";
  let state ='Auction is undergoing creation. It will take a couple of seconds';
  
let Owner = "";

let AuctionCreatorAddress="";
let hasFinished = false;

let HighestBidder='';
let HighestBindingBid =0;
let auctioncontract;
let OwnerBalance=0;
let AuctionHasEned = false;

const formadd = '0xfacD88c9813aFf52a748692B5C639ddc731B613B';
//Enumerator Auction {}


    const rpcUrl = "https://rinkeby.infura.io/v3/d1fdd8caeb5248ec83f1413e78e546f1";

    const web3 = new Web3(rpcUrl);

    web3.eth.accounts.wallet.add({
      privateKey: '0x4278b9f4c1a096f23336cef0c54b84bf8ec381504568ed11a73c3a07aa8b2db9',
      address: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'
  });



class App extends Component {
 //auctioncreator = {};
  

  constructor(props) {

  // console.log(web3.eth.accounts
  //   );



//const contractAddress = "0x558b22595717B253336587c47fdc5c685c2cB526";

const mycontract = new web3.eth.Contract(ContractABI);

  let myContract = new web3.eth.Contract( ContractABI, {
    //  from: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', // default from address
    //  gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
  });
  
 
  
  
let actioninstance;
console.log("asd");
  
  myContract.deploy({
      data:bc
  }).send({
      from: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C',
      gas: 4700000
  }).then((instance) => { 
      console.log("Contract mined at " + instance.options.address);
      AuctionCreatorAddress = instance.options.address; actioninstance = instance; }) 
  
      .then(() => { actioninstance.methods.auctions(0).call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => {console.log("contract address  is ", result) ; AuctionAddress = result; }) 
   .then(() => {
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
  


  

    super(props)
    this.state = {
      AuctionCreatorAddress :'x',
      AuctionAddress :'',
       Owner : 's',
       hasFinished : false,
       HighestBidder:'',
       HighestBindingBid:0,
       timer:30,
       state:'',
       OwnerBalance:0 
      
       
    }
  }


  
  setso = () =>{

    // auctioncreator.methods.owner().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => {  this.setState({owner: "bro"});});

   this.setState({AuctionCreatorAddress: AuctionCreatorAddress, AuctionAddress:AuctionAddress ,Owner: Owner, hasFinished :hasFinished, HighestBidder: HighestBidder, HighestBindingBid: HighestBindingBid, timer:timer, state: state, OwnerBalance:OwnerBalance});




}


callhigh= () =>{

 // auctioncontract.methods.owner().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { console.log( "highest is  " , HighestBidder = result);   });
 const {AuctionAddress, hasFinished}  = this.state;

  if(hasFinished ){
    web3.eth.getBalance('0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', (err, wei) => {
      OwnerBalance = web3.utils.fromWei(wei, 'ether');
   //   console.log(balance)
    });
  let auctioncontract =  new web3.eth.Contract( contractAuctionABI, AuctionAddress);
      auctioncontract.methods.highestBidder().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { /*console.log( "highestbidder is  " , HighestBidder = result);*/ HighestBidder = result });
 
      auctioncontract.methods.highestBindingBid().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { HighestBindingBid = web3.utils.fromWei(result, 'ether')  });

      state="Contract has been created";
      timer--;
    }




}

 // Add Task
 addForm = async (task) => {
 
 const {Name, Des} = task;


 
console.log(Name);
console.log(Des);

 let formcontract =  new web3.eth.Contract( formABI, formadd);

 try {
  formcontract.methods.addtoform(Name,Des).send({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', gas:200000},(err, result) => { console.log( "form was submitted  " , result);  });

} catch (error) {
  console.log('That did not go well.')
}

 



  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])
}


componentDidMount(){
  this.callhigh();

  this.setso();

 this.fetchInterval = setInterval(
  () =>{ 

    if(timer > 0)
    { 
      this.callhigh();
     this.setso() ;
    }  else {
      
      timer=0;
      let auctioncontract =  new web3.eth.Contract( contractAuctionABI, AuctionAddress);
      auctioncontract.methods.finalizeAuction().send({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', gas:200000},(err, result) => { console.log( "finilizeAUctoin been called  " , result);  });
 
 
      state=`Auction is now Closed. ${HighestBidder} won the Auction`;
      
     
    
      this.setso();
      clearInterval(this.fetchInterval);
    }
   
  
  
  
  },
  POLL_INTERVAL_MS
  );

}






componentWillUnmount(){
  clearInterval(this.fetchInterval);

}



 



  render() {
const {Owner, AuctionCreatorAddress, AuctionAddress, hasFinished,HighestBindingBid , HighestBidder, timer, state, OwnerBalance}  = this.state;

    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            // Code...
            />
    
          }
        
          <h3>{state} </h3>
        <div> <div>Owner is: {Owner}</div>
          <div> Owner balance: {OwnerBalance} Ether</div>
              <div> Auction Creator Adress is: {AuctionCreatorAddress} </div>
              <div>Auction Address is : {AuctionAddress} </div>
              <div>HighestBidder is  : {HighestBidder} </div>
              <div>HighestBindingBid is  : {HighestBindingBid} Ether</div>
              <div>Timer  : {timer} </div>
              <br></br>
              <h2>How to Bid</h2>
              <div> Its simple all you need to do is send ether to the Auction Address listed above.Dont worry this auction uses fake ether on the rinkeby testnet, look up rinkbyfauct to get some fake ether .Note sending ether less than the HighestBindingBid will result in a transaction fail (sometimes failure can happen when the gas limit is low, try raising it if that happens). if you bid the highest when the timer runs out you win and Owner recieves the ether. If you didnt win ether will get sent back to you. If you are the winner just send a transaction to the Auction Address and check the log of it on etherscan there you will see your prize which is a ipsf link(make sure to convert log to text and paste it in the web broswer url, which etherscan allows you to do, for what ever reason etherscan sometimes does let you convert some part to text, in that case just look up a hex to text converter).</div>
              <br></br>
              <h2>Summary</h2>
              <div> With this project idea I wanted to create an aution that is decentralized and anyone can participate without having to put your credit card information, bank information or any personal information. All you need is ether wallet. I also wanted an auction where it doesnt store users private key in a server since doing that will not make users the true and only owner of the ethereum account. Accounts on exchanges like binance, users on there do not posses the private key which does not make users the owner of the account. Keep in mind you are only the true owner if you possess the private key. The problem with not having the users private key is making calls like canceling your bid in the auction not waiting until the end for the money to return back to you. Multiple ways this can be solved. One way is making a user send a spcific amount to the contract lets say 3$ like a fee for cancelation and the receive function can handle that in the contract. Another and better way would be for a the auction to create a privatekey and publickey per user request. the user will send money to the publickey generated and from there users will have buttons to bid, cancel auction, etc and that generate public key will interact with the contract, and once the auction is done or anytime the user can send ether from the generated publickey back to any wallet of there choosing (which should be done immediately). </div>
              <br></br>
              <br></br>
              <div>Any suggestions on improvements, Id be happy to hear about it(this form does work in developement since it sends it a smart contract that has already been deployed). Due to Spam it takes 4 new blocks(about 1 minute) to submit the new form.</div>
     <div>
          <AddForm onAdd={this.addForm}></AddForm>
</div>
        </div>
      </div>
    );
  }
}

export default App;