import React from 'react'
import Contract from 'truffle-contract'
import Verifications from '../../build/contracts/Verifications.json'
import {Form, Button} from 'react-bootstrap'
import {SignForm} from '../components'

class Verify extends React.Component {
  constructor(props) {
    super()
    this.state = {
      account: null,
      verificationInstance: null,
      signature: null,
      message: null
    }
    this.signMessage = this.signMessage.bind(this)
    this.verifyMessage = this.verifyMessage.bind(this)
  }

  async componentDidMount() {
    const verification = Contract(Verifications)
    verification.setProvider(window.web3.currentProvider)
    const verificationInstance = await verification.deployed()
    window.web3.eth.getAccounts((err, accounts) => {
      if (err) throw new Error(err)
      const account = accounts[0]
      this.setState({
        account: account
      })
    })
    this.setState({verificationInstance})
    console.log('VerificationInstance', verificationInstance)
    console.log('Contract Address:', verificationInstance.address)
  }

  async signMessage(message) {
    console.log('incoming message', message)
    const encryptedMessage = window.web3.sha3(message)
    this.setState({message: encryptedMessage})
    await window.web3.eth.sign(
      this.state.account,
      encryptedMessage,
      (err, res) => {
        console.log(err, res)
        if (err) {
          window.alert('Signature did not go through')
          this.setState({
            signature: 'Please proceed to sign with valid account'
          })
        } else {
          this.setState({
            signature: res
          })
          window.alert('Signature successful')
        }
      }
    )
  }
  async verifyMessage() {
    const {signature, verificationInstance, message} = this.state
    console.log(signature, verificationInstance, message)
    try {
      verificationInstance
        .recover(message, signature)
        .then(res => console.log('recover', res))
    } catch (error) {
      console.error(error)
    }

    console.log()
  }

  render() {
    return (
      <div id="contract-page">
        <SignForm
          signMessage={this.signMessage}
          verifyMessage={this.verifyMessage}
        />
        <div style={{marginLeft: 15}}>{`Your Account: ${
          this.state.account
        }`}</div>
        <div style={{marginLeft: 15}}>{`Your Signature: ${
          this.state.signature
        }`}</div>
      </div>
    )
  }
}

export default Verify
