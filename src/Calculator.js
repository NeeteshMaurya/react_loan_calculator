import React, { useState } from 'react'
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
    var buttonActivity = false
    //const [buttonActivity,setbuttonActivity] = useState(false)
//error setter
    const [borrowerERR,setborrowerERR] = useState(false)

    const refreshPage = () => {
      window.location.reload()
    }

    const data = []
    const a = JSON.parse(localStorage.getItem('data'))
 
    //to handle the click
    const handle=() => {
      const amountToPay = amount/numOfDays
      const roundOffAmount = Math.round(amountToPay * 100)/100
      const userData = {amount:amount,borrower:borrower,fromDate:fromDate,toDate:toDate,perDayAmount:roundOffAmount,endDateTimeStamp:endDateTimeStamp,buttonActivity:buttonActivity}
      if (!a){
        data.push(userData)
      }
      else{
        //fetch the previous data by for loop and set it again in local storage
        var otherData
        for (let i = 0; i < a.length; i++) {
          otherData = {amount:a[i].amount,borrower:a[i].borrower,fromDate:a[i].fromDate,toDate:a[i].toDate,perDayAmount:a[i].perDayAmount,endDateTimeStamp:a[i].endDateTimeStamp,buttonActivity:a[i].buttonActivity}
          data.push(otherData)
        }
          data.push(userData)
      }
      localStorage.setItem("data",JSON.stringify(data))
      refreshPage()
    }
    
    //to Handle input and check validations
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

        <input className='inp' type="number" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)} required />
        <br /> <br />
        <input className='inp'  type="text" placeholder='Borrower' onChange={nameHandler} required />{borrowerERR?<span>Invalid Name</span>:""}
        
        <button  className='btne mt-5 fw-bold' variant="contained" onClick={()=>handle()}>Create New Loan</button>
      </div>
    );
}

export default Calculator