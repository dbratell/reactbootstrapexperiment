import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class CalculatorInput extends Component {
    render() {
        return <div className="calculator-input">{this.props.value}</div>
    }
}
class CalculatorOutput extends Component {
    render() {
        return <div className="calculator-output">= {this.props.value}</div>
    }
}

class CalculatorDigitButton extends Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }
    handlePress(e) {
        this.props.onDigitClick(this.props.digit);
    }
    render() {
        var buttonString = "" + this.props.digit;
        if (buttonString === "-1") {
            buttonString = ".";
        }
        return <Button bsSize="large" onClick={this.handlePress}>{buttonString}</Button>
    }
}

class CalculatorOperationButton extends Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }
    handlePress(e) {
        this.props.onOpClick(this.props.operation);
    }
    render() {
        return <Button bsSize="large" onClick={this.handlePress}>{this.props.operation}</Button>
    }
}

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            history: [],
            pendingOperation: '',
            result: '',
            lastOp2Float: NaN,
            afterDecimalPoint: false
        };
        this.handleDigitClick = this.handleDigitClick.bind(this);
        this.handleOpClick = this.handleOpClick.bind(this);
    }

    handleDigitClick(digit) {
        var newValue = this.state.value;
//        var newHistory = this.state.history;
        var newAfterDecimalPoint = this.state.afterDecimalPoint;
        if (digit === -1) { // Decimal point
            newAfterDecimalPoint = true;
            if (this.state.value === "") {
                newValue = "0";
            }
        } else if (this.state.value === "") {
            newValue = "" + digit;
        } else {
            if (this.state.afterDecimalPoint && this.state.value.indexOf(".") === -1) {
                newValue = this.state.value + "." + digit;
            } else {
                newValue = this.state.value + digit;
            }
        }
        this.setState({
            value: "" + newValue,
            afterDecimalPoint: newAfterDecimalPoint
            })
    }

    addOperation(operand1, operand2) {
        return operand1 + operand2;
    }
    
    subOperation(operand1, operand2) {
        return operand1 - operand2;
    }
    mulOperation(operand1, operand2) {
        return operand1 * operand2;
    }
    divOperation(operand1, operand2) {
        return operand1 / operand2;
    }

    binaryOperation(operand1, operand2, opFunction) {
        var result = opFunction(operand1, operand2);
        return result;
    }
    handleOpClick(op) {
        var newHistory = this.state.history.slice();
        var newPendingOperation = this.state.pendingOperation;
        var newLastOp2Float = this.state.lastOp2Float;
        var newAfterDecimalPoint = this.state.afterDecimalPoint;
        var newValue = this.state.value;
        if (op === "+" || op === "-" || op === "*" || op === "/") {
            if (this.state.pendingOperation === "") {
                newPendingOperation = op;
                newHistory.push(this.state.value);
            } else {
                var opFunction;
                if (this.state.pendingOperation === "+") {
                    opFunction = this.addOperation;
                } else if (this.state.pendingOperation === "-") {
                    opFunction = this.subOperation;
                } else if (this.state.pendingOperation === "*") {
                    opFunction = this.mulOperation;
                } else if (this.state.pendingOperation === "/") {
                    opFunction = this.divOperation;
                } else {
                    throw new Error("Unknown pendingOperation '" + this.state.pendingOperation + "'.");
                }
                var operand1 = parseFloat(this.state.history[this.state.history.length - 1]);
                var operand2;
                if (this.state.value === "") {
                    operand2 = this.state.lastOp2Float;
                } else {
                    operand2 = parseFloat(this.state.value);
                }
                var resultFloat = this.binaryOperation(operand1, operand2, opFunction)
                newLastOp2Float = operand2;
                newHistory.push("" + resultFloat);
                newPendingOperation = op;
            }
            newValue = "";
        } else if (op === "C") {
            newValue = "";
            newPendingOperation = "";
            newLastOp2Float = NaN;
            newAfterDecimalPoint = false;
        } else if (op === "=") {
            /* if (this.state.pendingOperation === "") {
             *     newPendingOperation = op;
             *     newHistory.push(this.state.value);
             * } else {
             *     var operand1 = parseFloat(this.state.history[this.state.history.length - 1]);
             *     var operand2 = parseFloat(this.state.value);
             *     var resultFloat = operand1 + operand2;
             *     newHistory.push("" + resultFloat);
             * }*/
        }
        this.setState({
            history: newHistory,
            pendingOperation: newPendingOperation,
            value: newValue,
            lastOp2Float: newLastOp2Float,
            afterDecimalPoint: newAfterDecimalPoint
        })
        
    }
    
    render() {
        var output = this.state.history.length > 0 ? this.state.history[this.state.history.length - 1] : "";
        return (<div className="calculator">
            <CalculatorOutput value={output} /> {this.state.pendingOperation}
            <CalculatorInput value={this.state.value === "" ? this.state.result : this.state.value} />
            <CalculatorDigitButton digit={1} onDigitClick={this.handleDigitClick} />
            <CalculatorDigitButton digit={2} onDigitClick={this.handleDigitClick} />
            <CalculatorDigitButton digit={3} onDigitClick={this.handleDigitClick} /><br/>
            <CalculatorDigitButton digit={4} onDigitClick={this.handleDigitClick} />
            <CalculatorDigitButton digit={5} onDigitClick={this.handleDigitClick} />
            <CalculatorDigitButton digit={6} onDigitClick={this.handleDigitClick} /><br/>
            <CalculatorDigitButton digit={7} onDigitClick={this.handleDigitClick} />
            <CalculatorDigitButton digit={8} onDigitClick={this.handleDigitClick} />
            <CalculatorDigitButton digit={9} onDigitClick={this.handleDigitClick} /><br/>
            <CalculatorDigitButton digit={0} onDigitClick={this.handleDigitClick} />
            <CalculatorDigitButton digit={-1} onDigitClick={this.handleDigitClick} />
            <br/>
            <CalculatorOperationButton operation="+" onOpClick={this.handleOpClick} />
            <CalculatorOperationButton operation="-" onOpClick={this.handleOpClick} />
            <CalculatorOperationButton operation="*" onOpClick={this.handleOpClick} />
            <CalculatorOperationButton operation="/" onOpClick={this.handleOpClick} />
            <CalculatorOperationButton operation="=" onOpClick={this.handleOpClick} />
            <CalculatorOperationButton operation="C" onOpClick={this.handleOpClick} />
            </div>);
    }
}
