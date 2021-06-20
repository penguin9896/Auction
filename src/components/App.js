import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar'
import Main from './Main'
import AddForm from './AddForm'

import {  contractAuctionABI,
  ContractABI, 
  bc,
  formABI,
  Auctioncon,
  aucbc
} from './config';
import Addauc from './Addauc';
  
const POLL_INTERVAL_MS = 2000;

let timer = 120;

let a1=0;
let a2,a3;
let a="";
let AuctionAddress = "";
  let state ='';
  let Auctionstate;
let Owner = "";

let AuctionCreatorAddress="";
let hasFinished = false;

let HighestBidder='';
let HighestBindingBid =0;
let auctioncontract;
let OwnerBalance=0;

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
       OwnerBalance:0, 
       Auctionstate:0,
       a1:0,
       a2:0,
       a3:0
       
    }
    
  }


  create = () => {
    

    web3.eth.getBalance('0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', (err, wei) => {
      a1 = web3.utils.fromWei(wei, 'ether');
    console.log("a1 is ", a1);
    });

 
 
    
 

    web3.eth.getBalance('0xab7282aC9d220A32F357E9F25152eC3A929E3613', (err, wei) => {
      a2 = web3.utils.fromWei(wei, 'ether');
   // console.log("a1 is ", a2);
    });


    
    web3.eth.getBalance('0xF4f59A6E6707CC57B70814cF171c1Ef32852B50D', (err, wei) => {
      a3 = web3.utils.fromWei(wei, 'ether');
   // console.log("a3 is ", a3);
    });


  }





  setso = () =>{

    // auctioncreator.methods.owner().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => {  this.setState({owner: "bro"});});

   this.setState({AuctionCreatorAddress: AuctionCreatorAddress,a1:a1,a2:a2,a3:a3,Auctionstate:Auctionstate ,AuctionAddress:AuctionAddress ,Owner: Owner, hasFinished :hasFinished, HighestBidder: HighestBidder, HighestBindingBid: HighestBindingBid, timer:timer, state: state, OwnerBalance:OwnerBalance});





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

      state="";
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


addAuc = async (info) => {
 
  const {publick, privatek, reward} = info;
 

// console.log(publick,web3.utils.isAddress(publick));
// console.log(privatek,web3.utils.isAddress(publick))


// web3.eth.accounts.wallet.add({
//   privateKey: '0x4278b9f4c1a096f23336cef0c54b84bf8ec381504568ed11a73c3a07aa8b2db9',
//   address: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'
// });

state="Auction undergoing creation";
this.setso();


let myContract = new web3.eth.Contract( Auctioncon, {
  //  from: '0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', // default from address
  //  gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});

myContract.deploy({
  data:aucbc,
  arguments: [String(reward)]
}).send({
  from: publick,
  gas: 4700000
}).then((instance) => { 
  console.log("the true auction mined at " + instance.options.address);
  AuctionAddress = instance.options.address; 
  state=`Auction has been created at ${instance.options.address}` ;
  this.setso();
}) 

 }


finalauc = async (info) => {
  state="Finilizing the Aucion";
  this.setso();

const {publick, privatek, aucadd} = info;

 console.log(publick);
console.log(privatek);
console.log(aucadd);



  web3.eth.accounts.wallet.add({
   privateKey: privatek,
    address: publick
});



let auctioncontract =  new web3.eth.Contract( Auctioncon, aucadd);

try {
  auctioncontract.methods.finalizeAuction().send({from:publick, gas:200000},(err, result) => { console.log( "finilizeAUctoin been called  " , result);  })
} catch (error) {
 console.log('That did not go well.')
}


state="The auction has been finilized, you recieved your ether";
  this.setso();



 }


 updateauc = (info) => {
 
  const {aucadd, publick} = info;

    AuctionAddress = aucadd;

    console.log('hello worl ', aucadd);
  let auctioncontract =  new web3.eth.Contract( Auctioncon, AuctionAddress);

  auctioncontract.methods.owner().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { console.log("the auction state is ", result);  Owner = result;
  
  web3.eth.getBalance(Owner, (err, wei) => {
    OwnerBalance = web3.utils.fromWei(wei, 'ether');
 // console.log("a1 is ", a2);
  }); 
 })

  console.log("asdssadsadsasadad");
  auctioncontract.methods.highestBidder().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { console.log( "highestbidder is  " , HighestBidder = result); HighestBidder = result })
  .then(() => {  auctioncontract.methods.highestBindingBid().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { HighestBindingBid = web3.utils.fromWei(result, 'ether');  })
  
  
  
  


}).then(()=>{
  auctioncontract.methods.owner().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { console.log("the auction state is ", result);  Owner = result  })
// web3.eth.getBalance(Owner, (err, wei) => {
//     OwnerBalance = web3.utils.fromWei(wei, 'ether');

// });

  }).then(()=>{
    auctioncontract.methods.auctionState().call({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C'},(err, result) => { console.log("the auction state is ", result); Auctionstate = result; 
    if(Auctionstate == 2)
    a='Closed';
    else
    a='Running';
   this.setso(); })



  }).then(()=>{
 
 
  })






  state="Update Complete";
  timer--;


}


componentDidMount(){
  this.callhigh();



  




 this.fetchInterval = setInterval(
  () =>{ 

    // if(timer > 0)
    // { 
    //   this.callhigh();
    //  this.setso() ;
    // }  else {
      
    //   timer=0;
    //   let auctioncontract =  new web3.eth.Contract( contractAuctionABI, AuctionAddress);
    //   auctioncontract.methods.finalizeAuction().send({from:'0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C', gas:200000},(err, result) => { console.log( "finilizeAUctoin been called  " , result);  });
 
 
    //   state=`Auction is now Closed. ${HighestBidder} won the Auction`;
      
     
    
    //   this.setso();
    //   clearInterval(this.fetchInterval);
    // }
   
    this.create();
    this.setso();
  
  },
  POLL_INTERVAL_MS
  );

}






componentWillUnmount(){
  clearInterval(this.fetchInterval);

}



 



  render() {
const {Owner,a1,a2,a3, AuctionAddress,HighestBindingBid , HighestBidder, timer, state, OwnerBalance, Auctionstate}  = this.state;




    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            // Code...
            />
    
          }
            <div> 
            publickey: 0x74Ab49E03013C7dCa945f794eFdA13BE3Dee364C
        
            <br></br>
            privateKey: 0x4278b9f4c1a096f23336cef0c54b84bf8ec381504568ed11a73c3a07aa8b2db9
            <br></br>
            balance: {a1} Ether
   <br></br>
   <br></br>
          publickey: 0xab7282aC9d220A32F357E9F25152eC3A929E3613
          <br></br>
privatekey: b1b3965f73169ce46bb46faea1e632a2da72e34fc3a25ea3f58cdbc5ec1ca1cb
<br></br>
            balance: {a2} Ether
<br></br>
   <br></br>
         publickey: 0xF4f59A6E6707CC57B70814cF171c1Ef32852B50D
         <br></br>
         privatekey: c54dee0d532264df545eae0db31b63d374458a201d7d40b8a5544b90875b7880
         <br></br>
            balance: {a3} Ether
            </div>

          <Addauc onAdd={this.addAuc} onAuc={this.finalauc} onUpdate={this.updateauc}></Addauc>

                  


          <h3>Status: {state} </h3>
        <div> <div>Owner is: {Owner}</div>
          <div> Owner balance: {OwnerBalance} Ether</div>
              {/* <div> Auction Creator Adress is: {AuctionCreatorAddress} </div> */}
              <div>Auction Address is : {AuctionAddress} </div>
              <div>HighestBidder is  : {HighestBidder} </div>
              <div>HighestBindingBid is  : {HighestBindingBid} Ether</div>
              <div>Auction State : {a}</div>
              {/* <div>Timer  : {timer} </div> */}
              <br></br>
               
              <h2>How to Bid</h2>
              <h3>CreateAuction</h3>
              <div>To create auction you need to enter the publickey, privatekey, and bidwinnerReward (can be anything you want, but should be a IPSF link) field out. You can use your own wallet supplied by rinkbey(LOOK UP rinkbey faucet) or use the ones above(THE ABOVE ADDRESS SHOULD NOT BE USED FOR REAL ETHER. THEY ARE JUST THERE FOR CONVIENVECE SAKE). 
                From there anyone can send ether to the auction address above, note sending ether lower that the highest binding bid will give a transaction fail.
                 Once the auction has been closed the winner will need to send another transaction to the auction and check the log of it on myetherscan
                  (metamask and myetherwallet gives you links to metherscan after sending trancsaction) and then from there only the winner will only be able to see the reward.
                  (Invalid values will most likely crash the app since errors are not checked yet so just refresh the page) </div>
              
                  
              <br></br>
              <h3>FinilizeAuction</h3>
              <div>To finalize the auction the publickey, privatekey, and auctionaddress need to be filled out. If you are the Owner of the one who created/deployed the auction than you can finalize the auction and receive the ether</div>
              

              <br></br>
              <h3>update</h3>
              <div>To update all you need is to enter the auction address, this updates the auction information to the webpage like highestBidder, highestBindingBid, Auction state and etc.</div>
              

              <br></br>
              
              <h2>Summary</h2>
              <div> With this project idea I wanted to create an aution that is decentralized and anyone can participate without having to put your credit card information, bank information or any personal information. All you need is ether wallet. I also wanted an auction where it doesnt store users private key in a server since doing that will not make users the true and only owner of the ethereum account. Accounts on exchanges like binance, users on there do not posses the private key which does not make users the owner of the account.
                 Keep in mind you are only the true owner if you possess the private key. The problem with not having the users private key is making calls like canceling your bid in the auction not waiting until the end for the money to return back to you. Multiple ways this can be solved. One way is making a user send a spcific amount to the contract lets say 3$ like a fee for cancelation and the receive function can handle that in the contract. 
                 Another and better way would be for a the auction to create a privatekey and publickey per user request. the user will send money to the publickey generated and from there users will have buttons to bid, cancel auction, etc and that generate public key will interact with the contract, and once the auction is done or anytime the user can send ether from the generated publickey back to any wallet of there choosing (which should be done immediately). </div>
              <br></br>
              <br></br>
              <div>Any suggestions on improvements, Id be happy to hear about it(this form does work in developement since it sends it a smart contract that has already been deployed). Due to Spam it takes 4 new blocks(about 1 minute) to submit a new form.</div>
     <div>
          <AddForm onAdd={this.addForm}></AddForm>
</div>
        </div>
      </div>
    );
  }
}

export default App;