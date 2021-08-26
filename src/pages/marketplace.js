import React, { Component } from 'react';
import '../App.css';
import '../css/marketplace.css'
import Web3 from 'web3'

import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from '../config.js'

import NewToken from '../components/addToken.js'

class Marketplace extends Component {

  async componentWillMount() {
    await this.runWeb3()
    await this.blockchain()
    await this.getData()
    this.forceUpdate()
  }


  componentDidMount(){
    document.title = "Marketplace | Lux"
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: '',
      tokens: [],
      headers: [
        "ID",
        "Token",
        "Owner",
        "State",
        "Address",
        "Type",
        "Price",
        "Edit"],
      loading: true,
      showHistory: false,
      editing: false,
      updating: 0
    }

    this.renderTableData = this.renderTableData.bind(this)
    this.renderEditData = this.renderEditData.bind(this)
    this.renderTableHeader = this.renderTableHeader.bind(this)
    this.editing = this.editing.bind(this)
  }


  async isInstalled() {
     if (typeof Web3 !== 'undefined'){
        console.log('Web3 Provider is installed')
     }
     else{
        console.log('No Web3 Provider!')
     }
  }

  async isLocked(web3) {
     web3.eth.getAccounts(function(err, accounts){
        if (err != null) {
           console.log(err)
        }
        else if (accounts.length === 0) {
           console.log('Web3 Provider is locked')
        }
        else {
           console.log('Web3 Provider is unlocked')
        }
     });
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

    this.isInstalled();
    this.isLocked(web3);

    const marketplaceData = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS)

    this.setState({ marketplaceData })

    const accounts = await web3.eth.getAccounts()
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    var balance = balanceInWei/1000000000000000000
    var account = accounts[0]

    console.log("Account: " + account)
    console.log("Balance: " + balance)

    this.setState({ account: accounts[0], balance: balance, loading: false, editing: false })
  }


  async getData() {

    this.setState({ tokens: [] })

    var marketCount = await this.state.marketplaceData.methods.liquidTokens().call()

    for (var i = 0; i < marketCount; i++) {
      const singleToken = await this.state.marketplaceData.methods.marketplace(i).call()
      this.setState({
        tokens: [...this.state.tokens, singleToken]
      })
    }
  }


  async updateMarketEntry(id, state, pAddress, type, price) {

    this.setState({loading:false})

    console.log(id)
    console.log(state)
    console.log(pAddress)
    console.log(price)

    this.state.marketplaceData.methods.updateMarketEntry(parseInt(id), state, String(pAddress), type, price).send({ from: this.state.account }).once('receipt', (receipt) => {
        this.setState({ editing: false })
        this.getData()
      })

    this.setState({loading:true})

  }

  /*
  { this.state.loading
    ? <div id="loader" className=""><p className="">Communicating with blockchain...</p></div>
    : <Market
      marketRender={this.state.tokens}
      <NewToken />
      acct = {this.state.account}
     />

  }
  */


  editing(marketplace) {

    this.setState({ updating: marketplace })
    this.setState({ editing: true })

  }


  renderEditData(toUpdate) {

      return this.state.tokens.map((eachToken, index) => {
         const { id, token, owner, state, physicalAddress, typeToken, price } = eachToken //destructuring

         if (id == toUpdate) {
           return (
                <tr key={id}>
                   <td>{id}</td>

                   <td>{token}</td>

                   <td>{owner}</td>

                   <td>
                     <form className = "sendForm" id="updateMarketEntryForm" onSubmit={(event) => {
                      event.preventDefault()
                      this.updateMarketEntry(id, this.newState.value, this.newAddress.value, this.newType.value, this.newPrice.value)
                     }}>
                       <input ref={(input) => this.newState = input} type="text" className="addCountryForm" defaultValue={state} required />
                     </form>
                   </td>

                   <td>
                     <form className = "sendForm" id="updateMarketEntryForm" onSubmit={(event) => {
                      event.preventDefault()
                      this.updateMarketEntry(id, this.newState.value, this.newAddress.value, this.newType.value, this.newPrice.value)
                     }}>
                       <input ref={(input) => this.newAddress = input} type="text" className="addCountryForm" defaultValue={physicalAddress} required />
                     </form>
                   </td>

                   <td>
                     <form className = "sendForm" id="updateMarketEntryForm" onSubmit={(event) => {
                      event.preventDefault()
                      this.updateMarketEntry(id, this.newState.value, this.newAddress.value, this.newType.value, this.newPrice.value)
                     }}>
                       <input ref={(input) => this.newType = input} type="text" className="addCountryForm" defaultValue={typeToken} required />
                     </form>
                   </td>

                   <td>
                     <form className = "sendForm" id="updateMarketEntryForm" onSubmit={(event) => {
                      event.preventDefault()
                      this.updateMarketEntry(id, this.newState.value, this.newAddress.value, this.newType.value, this.newPrice.value)
                     }}>
                       <input ref={(input) => this.newPrice = input} type="text" className="addCountryForm" defaultValue={price} required />
                     </form>
                   </td>

                   <td>
                    <input type="submit" hidden={false} form="updateMarketEntryForm"/>
                   </td>
                </tr>
           )
         }

         else {
           return (
              <tr key={id}>
                 <td>{id}</td>
                 <td>{token}</td>
                 <td>{owner}</td>
                 <td>{state}</td>
                 <td>{physicalAddress}</td>
                 <td>{typeToken}</td>
                 <td>{price}</td>
                 <td>
                  <button> Submit </button>
                 </td>
              </tr>
           )
         }
      })
   }


  renderTableData() {
      return this.state.tokens.map((eachToken, index) => {
         const { id, token, owner, state, physicalAddress, typeToken, price } = eachToken //destructuring
         return (
            <tr key={id}>
               <td>{id}</td>
               <td onClick={() => this.showEditHistory(token)}>{token}</td>
               <td>{owner}</td>
               <td>{state}</td>
               <td>{physicalAddress}</td>
               <td>{typeToken}</td>
               <td>{price}</td>
               <td>
                <button onClick={() => this.editing(id)}> Edit </button>
               </td>
            </tr>
         )
      })
   }

/*
   async renderTableHeader() {
      let header = Object.keys(this.state.headers)
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }
   */

   renderTableHeader() {
      return this.state.headers.map((label, index) => {
         return <th key={label}>{label.toUpperCase()}</th>
      })
   }


  render() {
    return (
      <div className="App">
        <header className="App-header">

          <div className = "tableFlex">
            <h1 id='title'>Lux Marketplace</h1>
            <table id='countries' className="countryTable">
              <tbody>
                <tr>{this.renderTableHeader()}</tr>

                  {this.state.editing ? this.renderEditData(this.state.updating) :
                  this.renderTableData()
                  }

              </tbody>
            </table>
          </div>

          <NewToken />

          <div className="paddedDiv" />

        </header>

      </div>


    );
  }
}

export default Marketplace;
