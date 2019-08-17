import React from "react"
import axios from "axios"

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
        const res=await axios.post("http://localhost:3003/getbal",{
            name:this.state.name,
        }
        )
        console.log("the balance is",res.data)
        this.setState({
            balance:res.data
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