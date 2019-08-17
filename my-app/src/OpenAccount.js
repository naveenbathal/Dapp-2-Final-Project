import React from "react"
import axios from "axios"
import firebase from './Firestore'
import { ethers } from 'ethers';



class OpenAccount extends React.Component
{
    constructor()
    {
        super()
        this.state={
            Name:"",
            Age:"",
            Region:"",
            Type:"",
            Amount:""
        }
        this.handlechange=this.handlechange.bind(this)
        this.handlesubmit=this.handlesubmit.bind(this)
    }
    handlechange = e =>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handlesubmit =async (e) =>
    { 
        e.preventDefault();
        // const web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://localhost:8546'), null, {});
        
        let ethereum = window.ethereum;
        // let web3 = window.Web3;
        let acc=await ethereum.enable()
        let  provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        
       
        let abi=[
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "callBalance",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "customerlist",
                "outputs": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "age",
                        "type": "uint256"
                    },
                    {
                        "name": "blocknumber",
                        "type": "uint256"
                    },
                    {
                        "name": "region",
                        "type": "string"
                    },
                    {
                        "name": "typeofAccount",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_age",
                        "type": "uint256"
                    },
                    {
                        "name": "_region",
                        "type": "string"
                    },
                    {
                        "name": "_typeofAccount",
                        "type": "string"
                    }
                ],
                "name": "openAccount",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "deposit",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "custCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "checkbalanceofbank",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "bal",
                "type": "event"
            }
        ]
        
        let address='0xb455fb236adee4c4288dcc84e59ea96f3cc5183e'
let contract = new ethers.Contract(address, abi, signer);



let tx1= await contract.openAccount(this.state.Name,this.state.Age,this.state.Region,this.state.Type,{value:ethers.utils.parseEther(this.state.Amount)})
this.setState(
    {
       
        Name:"",
        Age:"",
        Region:"",
        Type:"",
        Amount:""

    }

)

        
        

      
        const db = firebase.firestore();

  
  const userRef = db.collection("Balances").add({
    Name: this.state.Name,
    Balance: this.state.Amount
    
  });  
  const res= await axios.post("http://localhost:3003/openAccount",{
            name:this.state.Name,
            age:this.state.Age,
            region:this.state.Region,
            type:this.state.Type,
            amount:this.state.Amount

        })
       console.log("The response is",res)
  
        
    }
    render()
    {
        return(
            <form onSubmit={this.handlesubmit}>
                Name
                <input type="text" name="Name" onChange={this.handlechange} value={this.state.Name}/>

               
                Age
                <input type="text" name="Age" onChange={this.handlechange}  value={this.state.Age}/>
               
                Region
                <input type="text" name="Region" onChange={this.handlechange}  value={this.state.Region}/>
                
                Type
                <input type="text" name="Type" onChange={this.handlechange}  value={this.state.Type}/>
                
                Amount
                <input type="text" name="Amount" onChange={this.handlechange} value={this.state.Amount} />
                <button type="submit">submit</button>
                
                


            </form>
        )
    }

}
export default OpenAccount


