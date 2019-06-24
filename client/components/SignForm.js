import React from 'react'
import {Form, Button} from 'react-bootstrap'

const SignForm = props => {
  const {signMessage, verifyMessage} = props
  const [state, setState] = React.useState({
    message: ''
  })

  const handleChange = () => {
    setState({
      message: event.target.value
    })
  }
  const handleSubmit = () => {
    event.preventDefault()
    console.log('i made it in here', state.message)
    signMessage(state.message)
  }
  return (
    <Form
      onSubmit={handleSubmit}
      style={{display: 'flex', flexDirection: 'column'}}
    >
      <Form.Group>
        <Form.Control
          placeholder="Enter Message Here"
          value={state.message}
          onChange={handleChange}
        />
        <Button type="submit" variant="danger" size="sm" style={{marginTop: 5}}>
          Sign and Send
        </Button>
      </Form.Group>
      <Form.Group>
        <Button onClick={verifyMessage} variant="danger" size="sm">
          Verify
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SignForm
