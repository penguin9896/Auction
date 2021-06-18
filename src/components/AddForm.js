import { useState } from 'react'
import React from 'react';

const AddForm = ({ onAdd }) => {
  const [Name, setName] = useState('')
  const [Des, setDes] = useState('')
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!Name) {
      alert('Please add a name and description')
      return
    }

    onAdd({ Name, Des })

    setName('')
    setDes('')
 
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Name</label>
        <input
          type='text'
          placeholder='Add name'
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br></br>
      <div className='form-control'>
        <label>Description</label>
        <input
          type='text'
          placeholder='Add Description'
          value={Des}
          onChange={(e) => setDes(e.target.value)}
        />
      </div>
      <br></br>
      {/* <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
        <br></br> */}
      <input type='submit' value='Submit' className='btn btn-block' />
    </form>
  )
}

export default AddForm
