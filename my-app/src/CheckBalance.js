import React from "react"
import axios from "axios"
import { ethers } from 'ethers';

class CheckBalance extends React.Component
{
    constructor()
    {
        super()
        this.state={
            name:"",
            balance:""
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange=e=>{
        this.setState({
            name:e.target.value
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
        
        let bal = await contract.callBalance(this.state.name)
     
        // console.log("the balance is",res.data)
        this.setState({
            balance:bal.toString()
        })

    }

    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
                CheckBalance
                <br/>
                Enter Name
                <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                <button type="submit">submit</button>
                <br/>
                
                {this.state.balance!==""?<h3>The balance is {this.state.balance}</h3>:""}

           </form>
        )
    }
}
export default CheckBalance