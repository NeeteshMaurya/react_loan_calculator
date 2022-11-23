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
    const [perDayAmount, setPerDayAmount] = useState()

    //to handle the click
    const handle=() => {
        localStorage.setItem("amount",amount)
        localStorage.setItem("borrower",borrower)
        const amountToPay = amount/numOfDays
        // setPerDayAmount(amountToPay)
        localStorage.setItem("fromDate", fromDate)
        localStorage.setItem("toDate",toDate)
        localStorage.setItem("perDayAmount",amountToPay)
    }

    return(
      <div className='calculator'>
        <RangePicker className='rp'  onChange={(values) => {
            const value1 = values[1]-values[0]
            const days = value1/86400000
            setnumOfDays(days)   //number of days at initial stage
            setFromDate(values[0].$d)
            setToDate(values[1].$d)
        
            console.log(days)
        }}
        /><br/>
        <TextField id="standard-basic" label="Amount" variant="standard" onChange={(e)=>setAmount(e.target.value)} /><br />
        <TextField className='txt' id="standard-basic" label="Borrower" variant="standard" onChange={(e)=>setBorrower(e.target.value)} />
        <Button className='btn mt-5' variant="contained" onClick={handle}>Create New Loan</Button>
      </div>
    );
}

export default Calculator