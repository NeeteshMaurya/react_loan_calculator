import React from 'react'
import './ShowData.css'
import moment from 'moment'

export const ShowData = () => {

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
//update payment at midnight
  var midnight = "0:00:00";
  var now = null;
  setInterval(function () {
    now = moment().format("H:mm:ss");
    if (now === midnight) {
        updatePerDayPayment()
    }
  }, 1000);

//setting the data from local and parsing it to make an array
  const a = JSON.parse(localStorage.getItem('data'))

  const data = []
  const deleteData=(id)=>{
    const filterData = a.filter((element)=>{
      return element.borrower!==id
    })
    var otherData
    for (let i = 0; i < filterData.length; i++) {
      console.log(filterData[i].amount)
      otherData = {amount:filterData[i].amount,borrower:filterData[i].borrower,fromDate:filterData[i].fromDate,toDate:filterData[i].toDate,perDayAmount:filterData[i].perDayAmount,endDateTimeStamp:filterData[i].endDateTimeStamp}
      data.push(otherData)
      localStorage.setItem("data",JSON.stringify(data))
    }
    refreshPage()
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