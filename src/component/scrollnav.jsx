'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../lib/dom.es6";

class ScrollNav extends Component{
    componentDidMount(){
        this.initialize();
    }
    initialize(){
        this.linkedNodes = ReactDOM.findDOMNode(this).querySelectorAll(".anchor-point"),
        this.anchorNodes = [];
        Array.prototype.forEach.call(this.linkedNodes,(linkedNode)=>{
            const anchor = document.getElementById(linkedNode.dataset.anchor);
            if(anchor){
                this.anchorNodes.push(anchor);
            }
        });
    }
    checkVisible(element,relativeElement){
        const paddingTop = relativeElement.firstChild.offsetTop
        const offsetTop = element.offsetTop - paddingTop;
        const scrollTop = relativeElement.scrollTop;
        const offsetHeight = element.offsetHeight;
        // console.log(offsetTop,scrollTop,paddingTop)
        return offsetTop <= scrollTop && 
                (offsetTop + offsetHeight) >= scrollTop
    }
    handleScroll(){
        var visibleNodes = [],targetNodes = [];
        Array.prototype.forEach.call(this.linkedNodes,(linkedNode,i)=>{
            if(this.checkVisible(linkedNode,ReactDOM.findDOMNode(this)) === true){
                visibleNodes.push(linkedNode);
                targetNodes.push(this.anchorNodes[i])
            }
        });
        if(visibleNodes.length === 0){
            return;
        }
        const targetNode = targetNodes[0];
        Array.prototype.forEach.call(this.anchorNodes,(anchorNode)=>{
            dom.removeClass(anchorNode,"active");
        });
        dom.addClass(targetNode,"active");        
    }
    render(){
        const classes = classNames(this.props.className,{
            "scroll-spy":true
        });
        return (
            <div className={classes} onScroll={this.handleScroll.bind(this)}>{this.props.children}</div>
        );
    }
}

export default ScrollNav;