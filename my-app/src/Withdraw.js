import React from "react"
import axios from "axios"
import firebase from './Firestore'
import { ethers } from 'ethers';

class Withdraw extends React.Component
{
    constructor()
    {
        super()
        this.state={
           name:"",
           remBalance:"",
           amount:""
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        },console.log(e.target.value))
    }
    handleSubmit= async (e)=>{
        e.preventDefault();
        let ethereum = window.ethereum;
        
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
        
        
        let tx=await contract.withdraw(ethers.utils.parseEther(this.state.amount),this.state.name)
        // console.log("the balance tx is",tx)
        let bal = await contract.callBalance(this.state.name)
        // console.log("the balance is ",bal.toString())
       
        const db = firebase.firestore();

  
    const userRef = await db.collection("Balances").where('Name','==',this.state.name).get()
    userRef.docs.forEach(async(Ele)=>{
        console.log("the id is",Ele.id)
        await db.collection("Balances").doc(Ele.id).update({
            Balance:bal
        })
    }
)
  
        // console.log("the balance is",res.data)
        this.setState({
            remBalance:bal.toString()
        })

    }

    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
               Withdraw
                <br/>
                Enter Name
                <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                Enter Amount in wei
                <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />

                <button type="submit">submit</button>
                <br/>
                
                {this.state.remBalance!==""?<h3>The remaining balance is {this.state.remBalance}</h3>:""}

           </form>
        )
    }
}
export default Withdraw