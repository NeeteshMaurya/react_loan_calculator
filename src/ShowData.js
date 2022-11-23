import React, { useState } from 'react'
import './ShowData.css'
import moment from 'moment'

const ShowData = () => {
  const [perDayAmount, setPerDayAmount] = useState()
  function updatePerDayPayment (){
      const dateToday = new Date()    //today's date
      const date = dateToday.setHours(0,0,0,0)  //date timestamp at midnight
      const endDate = localStorage.getItem("endDateTimeStamp") //end date timestamp
  
      const remainingDaysTS = endDate-date        //counting how many days left(timestamp)
      const remainingDays = remainingDaysTS/86400000   //converting timestamp into days
      const amountTotal = localStorage.getItem("amount")
      const amountPerDay = amountTotal/remainingDays
      localStorage.setItem("perDayAmount",amountPerDay)
  }

  var midnight = "0:00:00";
var now = null;

setInterval(function () {
    now = moment().format("H:mm:ss");
    if (now === midnight) {
        updatePerDayPayment()
    }
}, 1000);

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
          </tr>
          <tr>
            <td>{localStorage.getItem("borrower")}</td>
            <td>{localStorage.getItem("amount")}</td>
            <td>{localStorage.getItem("fromDate")}</td>
            <td>{localStorage.getItem("toDate")}</td>
            <td>{localStorage.getItem("perDayAmount")}</td>
          </tr>
        </table>
      </div>
        {/* <ul className='list-group'>
            <div className='data mx-auto'>
                <h5 className="amt">Amount</h5>
                <h5>Borrower</h5>
            </div>
            <div className='data mx-auto'>
                <li className="amt">{localStorage.getItem("amount")}</li>
                <li className="">{localStorage.getItem("borrower")}</li>
            </div>
        </ul> */}
    </>
  )
}

export default ShowData