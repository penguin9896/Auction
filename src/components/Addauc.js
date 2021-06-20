import { useState } from 'react'
import React from 'react';

const Addauc = ({ onAdd , onAuc, onUpdate}) => {
  const [publick, setName] = useState('')
  const [privatek, setDes] = useState('')
  const [reward, setreward] = useState('')
  const [aucadd, setauc] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()

    if (!publick) {
      alert('Please add a name and description')
      return
    }

    onAdd({ publick, privatek , reward});

    setName('')
    setDes('')
    setreward('')
    setauc('')
  }

  const onFinal = (e) => {
    e.preventDefault()
 // console.log("asdhjsahdjkashudqwerhfkjhdd")
  

  onAuc({ publick, privatek , aucadd});

    setName('')
    setDes('')
    setreward('')
    setauc('')
 
}


const onupdate = (e) => {
  e.preventDefault()
// console.log("asdhjsahdjkashudqwerhfkjhdd")


onUpdate({ aucadd});


}

  return (<div>
    <form className='add-form' onSubmit={onSubmit} >
      <div className='form-control'>
        <label>public key</label>
        <input
          type='text'
          placeholder='Add public'
          value={publick}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br></br>
      <div className='form-control'>
        <label>private key</label>
        <input
          type='text'
          placeholder='Add private'
          value={privatek}
          onChange={(e) => setDes(e.target.value)}
        />
      </div>
      <br></br>
      <div className='form-control'>
        <label>Bidwinner reward</label>
        <input
          type='text'
          placeholder='Add reward'
          value={reward}
          onChange={(e) => setreward(e.target.value)}
        />
      </div>
      <br></br>
   
      <div className='form-control'>
        <label>AuctionAddress</label>
        <input
          type='text'
          placeholder='Add reward'
          value={aucadd}
          onChange={(e) => setauc(e.target.value)}
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
      <input type='submit' value='CreateAuction' className='btn btn-block' />
  
    </form>
    <input type='submit' onClick={onFinal} value='FinilizeAuction' className='btn btn-block' />

    <input type='submit' onClick={onupdate} value='update' className='btn btn-block' />
    <div>




    </div>
</div>
    
  )
}

export default Addauc
