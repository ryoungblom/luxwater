import React, { Component } from 'react';
import Web3 from 'web3'
import '../css/marketplace.css'

import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from '../config.js'


class NewToken extends Component {

  async componentWillMount() {
    await this.runWeb3()
    await this.blockchain()
    this.forceUpdate()
  }


  componentDidMount(){
    document.title = "react-web3"
  }


  async componentWillUnmount() {
    clearInterval(this.interval);
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: '',
      loading: true
    }

    this.addData = this.addData.bind(this)
  }

  async runWeb3() {

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask or similar!')
    }
  }


  async blockchain() {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")


    const marketplaceData = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS)

    this.setState({ marketplaceData })

    const accounts = await web3.eth.getAccounts()
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    var balance = balanceInWei/1000000000000000000
    var account = accounts[0]

    this.setState({ account: account, balance: balance, loading: false })
  }


   addData(name, state, address, type, price) {

     this.state.marketplaceData.methods.addToken(name, state, address, type, price).send({ from: this.state.account })
   }


  render() {
    return (

      <div className = "mainForm">

        <hr />

        <h1> Add Token </h1>

        <div className = "formDiv">

          <form className = "sendForm" onSubmit={(event) => {
            event.preventDefault()
            this.addData(this.newName.value, this.newState.value, this.newAddress.value, this.newType.value, this.newPrice.value)
            }}>

            <input ref={(input) => this.newName = input} type="text" className="addCountryForm" placeholder="Token Name" required />
            <input ref={(input) => this.newState = input} type="text" className="addCountryForm" placeholder="State" />
            <input ref={(input) => this.newAddress = input} type="test" className="addCountryForm" placeholder="Address" />
            <input ref={(input) => this.newType = input} type="number" className="addCountryForm" placeholder="Type" />
            <input ref={(input) => this.newPrice = input} type="number" className="addCountryForm" placeholder="Price" />


            <br />
              <input type="submit" hidden={false} />
          </form>

        </div>

        <div className = "infoFlex">
          <span> &nbsp; </span>
          <span className="acctInfo">Account: {this.state.account}</span>
          <span className="acctInfo">Balance: @{this.state.balance}</span>
          <span> &nbsp; </span>
        </div>

      </div>

    );
  }
}

export default NewToken;
