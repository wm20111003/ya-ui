'use strict';
import React,{Component} from "react";
import ReactDOM from "react-dom";

class IndexExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="index-example">
                <h2>Ya-UI</h2>
                <table className="md-data-table">
                    <thead>
                    <tr>
                        <th>Component</th>
                        <th>Example</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Selected</td>
                        <td><a href="./selected/selected.html">example</a></td>
                    </tr>
                    <tr>
                        <td>Popup</td>
                        <td><a href="./popup/popup.html">example</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    ReactDOM.render(<IndexExample />,document.getElementById('example'));
})