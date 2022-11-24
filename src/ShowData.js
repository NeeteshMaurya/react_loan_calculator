import React from 'react'
import './ShowData.css'
import moment from 'moment'

const ShowData = () => {

  const refreshPage = () => {
    window.location.reload()
  }
  
  function updatePerDayPayment (){
      const dateToday = new Date()    //today's date
      const date = dateToday.setHours(0,0,0,0)  //date timestamp at midnight
      const endDate = localStorage.getItem("endDateTimeStamp") //end date timestamp
  
      const remainingDaysTS = endDate-date        //counting how many days left(timestamp)
      const remainingDays = remainingDaysTS/86400000   //converting timestamp into days
      const amountTotal = localStorage.getItem("amount")
      const amountPerDay = amountTotal/remainingDays
      const roundOffAmount = Math.round(amountPerDay * 100)/100
      localStorage.setItem("perDayAmount",roundOffAmount)
  }

  var midnight = "0:00:00";
  var now = null;
  setInterval(function () {
    now = moment().format("H:mm:ss");
    if (now === midnight) {
        updatePerDayPayment()
    }
  }, 1000);

  function deleteData(){
    localStorage.clear()
    refreshPage()
  }

  return (
    <>
      <div className='containr'>
        <table id='cust'>
          <tr>
            <th className='head'>Borrower</th>
            <th className='head'>Amount</th>
            <th className='head'>Date of Loan</th>
            <th className='head'>Last date of Payment</th>
            <th className='head'>Per Day Payment Amount</th>
            <th></th>
          </tr>
          <tr>
            <td>{localStorage.getItem("borrower")}</td>
            <td>{localStorage.getItem("amount")}</td>
            <td>{localStorage.getItem("fromDate")}</td>
            <td>{localStorage.getItem("toDate")}</td>
            <td>{localStorage.getItem("perDayAmount")}</td>
            <td><button className='btn btn-danger border border-white' onClick={deleteData}>Delete</button></td>
          </tr>
        </table>
      </div>
        
    </>
  )
}

export default ShowData