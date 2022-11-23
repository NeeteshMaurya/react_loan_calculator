import React from 'react'
import './ShowData.css'

const ShowData = () => {
  function updateNumofDays (){
    
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