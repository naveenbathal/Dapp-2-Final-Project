import React from "react"
import axios from "axios"
import firebase from './Firestore'

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
        const res=await axios.post("http://localhost:3003/withdraw",{
            name:this.state.name,
            amount:this.state.amount
        }
        )
        const db = firebase.firestore();

  
  const userRef = await db.collection("Balances").where('Name','==',this.state.name).get()
    userRef.docs.forEach(async(Ele)=>{
        console.log("the id is",Ele.id)
        await db.collection("Balances").doc(Ele.id).update({
            Balance:res.data
        })
    })
  
        console.log("the balance is",res.data)
        this.setState({
            remBalance:res.data
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