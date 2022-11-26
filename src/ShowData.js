import React from 'react'
import './ShowData.css'
import moment from 'moment'

export const ShowData = () => {
  const refreshPage = () => {
    window.location.reload()
  }

  //setting the data from local and parsing it to make an array
  const a = JSON.parse(localStorage.getItem('data'))
  const data = []
  function updatePerDayPayment (){
    if (!a){
      console.log('1')
      return ''
    }
    else{
      //fetch the previous data by for loop and set it again in local storage
      var otherData
      const dateToday = new Date()                  //today's date
      const date = dateToday.setHours(0,0,0,0)      //date timestamp at midnight
      for (let i = 0; i < a.length; i++) {
        const activity = false                      //Enablin Paid Button at midnight
        const endDate = a[i].endDateTimeStamp
        const remainingDaysTS = endDate-date        //counting how many days left(timestamp)
        const remainingDays = remainingDaysTS/86400000
        const amountTotal = a[i].amount
        var amountPerDay = amountTotal/remainingDays
        if(remainingDays===0){                     //in Case today is end Date
          amountPerDay = amountTotal
        }
        const roundOffAmount = Math.round(amountPerDay * 100)/100
        otherData = {amount:a[i].amount,borrower:a[i].borrower,fromDate:a[i].fromDate,toDate:a[i].toDate,perDayAmount:roundOffAmount,endDateTimeStamp:a[i].endDateTimeStamp,buttonActivity:activity}
        data.push(otherData)
        localStorage.setItem("data",JSON.stringify(data))
        refreshPage()
      }
    }
  }
//update payment and Paid button activity at midnight
  var midnight = "0:00:00";
  var now = null;
  setInterval(function () {

    now = moment().format("H:mm:ss");
    if (now === midnight) {
        updatePerDayPayment()
        console.log('2')
    }
  }, 1000);


//Delete the selected Data
  const deleteData=(id)=>{
    const filterData = a.filter((element)=>{
      return element.borrower!==id
    })
    if(filterData.length===0){
      localStorage.clear()
      refreshPage()
    }else
    {
      var otherData
      for (let i = 0; i < filterData.length; i++) {
        console.log(filterData[i].amount)
        otherData = {amount:filterData[i].amount,borrower:filterData[i].borrower,fromDate:filterData[i].fromDate,toDate:filterData[i].toDate,perDayAmount:filterData[i].perDayAmount,endDateTimeStamp:filterData[i].endDateTimeStamp,buttonActivity:filterData[i].buttonActivity}
        data.push(otherData)
        localStorage.setItem("data",JSON.stringify(data))
      }
      refreshPage()
    }
    }

//Paid Today
  const clickHandler=(id)=>{
    const activity = true
    const filterData = a.filter((element)=>{
      return element.borrower===id
    })
    deleteData(id)
    const remaningAmount = filterData[0].amount-filterData[0].perDayAmount
    var otherData = {amount:remaningAmount,borrower:filterData[0].borrower,fromDate:filterData[0].fromDate,toDate:filterData[0].toDate,perDayAmount:filterData[0].perDayAmount,endDateTimeStamp:filterData[0].endDateTimeStamp,buttonActivity:activity}
    data.push(otherData)
    localStorage.setItem("data",JSON.stringify(data))
  }
  return (
    <>
      <div className='containr'>
        <table id='cust'>
          <tbody>
          <tr>
            <th className='head'>Borrower</th>
            <th className='head'>Amount</th>
            <th className='head'>Date of Loan</th>
            <th className='head'>Last date of Payment</th>
            <th className='head'>Per Day Payment Amount</th>
            <th></th>
            <th></th>
          </tr>
         {  
          !a ? null : a.map((item)=>
          <tr key={item.borrower}>
            <td>{item.borrower}</td>
            <td>{item.amount}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td>{item.perDayAmount}</td>
            <td><button className='btn btn-danger border border-white' onClick={()=>deleteData(item.borrower)}>Delete</button></td>
            <td><button type='button' disabled={item.buttonActivity} className='btn btn-warning text-white fw-bold border border-primary' onClick={()=>clickHandler(item.borrower)}>Paid Today</button></td>
          </tr>
          )
        }
        </tbody>
        </table>
      </div>
        
    </>
  )
}

// export default ShowData