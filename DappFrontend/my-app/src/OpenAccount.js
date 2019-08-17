import React from "react"
import axios from "axios"
import firebase from './Firestore'

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
        },console.log("The value is",e.target.value))
    }
    handlesubmit =async (e) =>
    { 
        e.preventDefault();
      
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
  
        this.setState(
            {
               
                Name:"",
                Age:"",
                Region:"",
                Type:"",
                Amount:""

            }
        
        
        )
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

