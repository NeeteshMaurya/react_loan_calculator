import React from 'react'
import './ShowData.css'

const ShowData = () => {
  return (
    <>
        <ul className='list-group'>
            {/* <li className=''>Amount
                <ul>
                    <li>{localStorage.getItem("amount")}</li>
                </ul>
            </li>
            <li className=''>Borrower
                <ul>
                    <li>{localStorage.getItem("borrower")}</li>
                </ul>
            </li> */}
            <div className='data mx-auto'>
                <h5 class="amt">Amount</h5>
                <h5>Borrower</h5>
            </div>
            <div className='data mx-auto'>
                <li class="amt">{localStorage.getItem("amount")}</li>
                <li class="">{localStorage.getItem("borrower")}</li>
            </div>
        </ul>
    </>
  )
}

export default ShowData