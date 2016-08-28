import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../actions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

let AddUser = ({ dispatch }) => {
  let input = {}

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.text.value.trim() || !input.name.value.trim()) {
          return
        }
        dispatch(addUser(input.name.value, input.text.value))
        input.name.value = ''
        input.text.value = ''
      }}>
        <TextField
          hintText="User Name"
          ref={node => {
            input.name = node.input
        }} /><br/>
        <TextField
          hintText="Text"
          ref={node => {
            input.text = node.input
        }} />
        <FloatingActionButton type="submit">
          <ContentAdd />
        </FloatingActionButton>
      </form>
    </div>
  )
}
AddUser = connect()(AddUser)

export default AddUser