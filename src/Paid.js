import React, { useState } from 'react'
import moment from 'moment'

const Paid = () => {
    const [buttonActivity,setbuttonActivity] = useState()
    const clickHandler=()=>{
        const totalamount = localStorage.getItem("amount")
        const perDayAmount = localStorage.getItem("perDayAmount")
        const remaningAmount = totalamount-perDayAmount
        localStorage.setItem("amount",remaningAmount)
        const doDisable = true
        setbuttonActivity(doDisable)
    }
    var midnight = "0:00:00";
    var now = null;
    setInterval(function () {
        now = moment().format("H:mm:ss");
        if (now === midnight) {
            const disable = false
            setbuttonActivity(disable)
        }
    }, 1000);
  return (
    <>
      <button type='button' disabled={buttonActivity} className='btne btn btn-warning text-white fw-bold border border-primary' onClick={clickHandler}>Paid Today</button>
    </>
  )
}

export default Paid