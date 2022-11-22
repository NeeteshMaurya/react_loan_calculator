import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from 'antd';
import moment from 'moment';
import './Calculator.css'
const { RangePicker } = DatePicker;

const Calculator = () => {
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [numOfDays, setnumOfDays] = useState()
    const [amount, setAmount] = useState()
    const [borrower, setBorrower] = useState()

    const handle=() => {
        localStorage.setItem("amount",amount)
        localStorage.setItem("borrower",borrower)
    }

    return(
      <div className='calculator'>
        <RangePicker className='rp'  onChange={(values) => {
            const value1 = values[1]-values[0]
            const days = value1/86400000
            setnumOfDays(days)
        }}
        /><br/>
        <TextField id="standard-basic" label="Amount" variant="standard" onChange={(e)=>setAmount(e.target.value)} /><br />
        <TextField className='txt' id="standard-basic" label="Borrower" variant="standard" onChange={(e)=>setBorrower(e.target.value)} />
        <Button className='btn' variant="contained" onClick={handle}>Create New Loan</Button>
      </div>
    );
}

export default Calculator