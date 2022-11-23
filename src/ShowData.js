import React from 'react'
import './ShowData.css'

const ShowData = () => {
  function updatePerDayPayment (){
    const dateToday = new Date()    //today's date
      const date = dateToday.setHours(0,0,0,0)  //date timestamp at midnight
      const endDate = localStorage.getItem("toDate") //end date as string
      const endDateTimestamp = endDate.setHours(0,0,0,0)  //end date timestamp at miniht
      const remainingDaysTS = endDateTimestamp-date        //counting how many days left(timestamp)
      const remainingDays = remainingDaysTS/86400000   //concertin timestamp into days
      console.log(remainingDays)
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