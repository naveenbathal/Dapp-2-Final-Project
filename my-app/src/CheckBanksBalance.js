import React from "react"
import axios from "axios"
import { ethers } from 'ethers';

class CheckBankBalance extends React.Component
{
    constructor()
    {
        super()
        this.state={
           
            balance:""
        }
       this.handleChange=this.handleChange.bind(this)
    }
   
   handleChange=async()=>
   {
    
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
        // console.log("the contract is",contract)

        
        let bal = await contract.checkbalanceofbank()
        // console.log("the balance is ",bal.toString())

        // console.log("the balance is",res.data)
        this.setState({
            balance:bal.toString()
        })
    
   }

    render()
    {
        return(
            <div>
             <p>CheckBank's Balance</p>   
            <button onClick={this.handleChange}>CheckBalance</button>
            {this.state.balance!==""?<h2>The balance  in bank in Wei is {this.state.balance}</h2>:""}
            </div>
        )
    }
}
export default CheckBankBalance