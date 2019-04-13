// @flow

import React, { Component } from 'react';
import Calculator from './Calc';
import logo from './logo.svg';
import './App.css';
import { Navbar, Jumbotron, Button, ButtonGroup, Alert, MenuItem, Modal } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
        <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React with something</h2>
        </div>
        <Navbar>MooNav</Navbar>
        <MenuItem>An option</MenuItem>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
                                             </p>
        <Jumbotron>
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        </Jumbotron>

        <ButtonGroup>
        <Button bsStyle="warning" bsSize="large">Hello</Button>
        <Button bsStyle="success" bsSize="large">Bye</Button>
        </ButtonGroup>

        <Alert>Not good. Not good at all.</Alert>
        <Modal show={false}>
        <Modal.Dialog><Modal.Title>Ok</Modal.Title>Ohhhhh
        <Modal.Footer><Button>Close</Button></Modal.Footer>
        </Modal.Dialog>
        </Modal>
        <Calculator></Calculator>
      </div>
    );
  }
}

export default App;
