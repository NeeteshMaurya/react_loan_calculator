import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
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
    const [endDateTimeStamp, setendDateTimeStamp] = useState()

    const refreshPage = () => {
      window.location.reload()
    }
    //const [initialState,setinitialState] = useState(pulse)


    //to handle the click
    const handle=() => {
        localStorage.setItem("amount",amount)
        localStorage.setItem("borrower",borrower)
        const amountToPay = amount/numOfDays
        const roundOffAmount = Math.round(amountToPay * 100)/100
        localStorage.setItem("fromDate", fromDate)
        localStorage.setItem("toDate",toDate)
        localStorage.setItem("perDayAmount",roundOffAmount)
        localStorage.setItem("endDateTimeStamp",endDateTimeStamp)
        refreshPage()
    }
    
    //to Handle input and check validations
    const [borrowerERR,setborrowerERR] = useState(false)
    function nameHandler(e){
      let item = e.target.value
      var letters = /^[A-Za-z]+$/
      if(item.match(letters)){
        setborrowerERR(false)
        setBorrower(item)
      }
      else{
        setborrowerERR(true)
      }
    }

    return(
      <div className='calculator'>
        <RangePicker className='rp'  onChange={(values) => {
            const value1 = values[1]-values[0]
            const days = value1/86400000
            setnumOfDays(days)   //number of days at initial stage
            //formating date
            const fromdateString = values[0].$d    
            const fromDateFormat = moment(fromdateString).format('DD-MM-YYYY')
            setFromDate(fromDateFormat)
            const todateString = values[1].$d
            const toDateFormat = moment(todateString).format('DD-MM-YYYY')
            setToDate(toDateFormat)
            //saving end date timestamp(we will use it while updating amount per day to count number of remaining days)
            const endDateString = values[1].$d
            const endDateTS = endDateString.setHours(0,0,0,0,)
            setendDateTimeStamp(endDateTS)
        }}/><br/>

        <input className='inp' type="number" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)}  />
        <br /> <br />
        <input className='inp'  type="text" placeholder='Borrower' onChange={nameHandler} />{borrowerERR?<span>Invalid Name</span>:""}
        
        <Button className='btne mt-5 fw-bold' variant="contained" onClick={handle}>Create New Loan</Button>
      </div>
    );
}

export default Calculator