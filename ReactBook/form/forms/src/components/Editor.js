import React,{Component} from 'react';





class Editor extends Component{

    constructor(props){
        super(props)


        this.state={
           name:"Bob",
           flavor:"Vanilla",
           toppings:["Strawberries"]
        //    isdoubleScoop:false
        }

        this.flavors = ["Chocolate","Double Chocolate","Triple Chocolate","Vanilla"];

        this.toppings = ["Sprinkles","Fudge Sauce","Strawberries","Maple Syrup"];
    }

    componentDidMount(){

        this.props.submitData(this.state)
    }

    updateFormValue = (event) => {
        
        this.setState({[event.target.name]:event.target.value},() => this.props.submitData(this.state))
    }


    updateFormValueOptions = (event) => {

        let options =[...event.target.options].filter(o => o.selected).map(o => o.value);

        

        this.setState({[event.target.name]:options}, () => this.props.submitData(this.state));
    }


    updateFormCheck = (event) => {
        event.persist();

        this.setState(state => {

            if(event.target.checked){
                
                state.toppings.push(event.target.name)
            }
            else{

                let index = state.toppings.indexOf(event.target.name)
                state.toppings.splice(index, 1);
            }

        },() => this.props.submitData(this.state))
    }

    render(){

        return <div className="h5 bg-info text-white p-2">
             <div className ="form-group">
                 <label>Name</label>
                 <input className="form-control"
                   name="name"
                   value={this.state.name}
                   onChange={this.updateFormValue}/>
             </div>

             <div className="form-group">
                 <label>Ice Cream Flavors</label>
                 <select className="form-control"
                    name="flavor"
                    value={this.state.flavor}
                    onChange={this.updateFormValueOptions}>
                        {
                            this.flavors.map(flavor =>
                                <option value={flavor} key={flavor}>
                                    {flavor}
                                </option>)
                        }
                    </select>
             </div>

             <div className="form-group">
                 <label>Ice Cream Toppings</label>
                 <select className="form-control" multiple={true}
                  name="toppings" value={this.state.toppings}
                  onChange={this.updateFormValueOptions}>
                     {this.toppings.map(topping => <option key={topping}>
                    {topping}
                     </option>
                     )


                     }
                  </select>
             </div>

{
         this.toppings.map( top  => (<div className="form-group" key={top}>
                 <div className ="form-check">
                     <input className="form-check-input"
                       type="checkbox"
                       name={top}
                       value={this.state[top]}
                       checked={this.state.toppings.indexOf(top) > -1}
                       onChange ={this.updateFormCheck} />

                       <label className="form-check-label">{top}</label>
                 </div>
         </div>))
    }
        </div>
    }
}


export default Editor;