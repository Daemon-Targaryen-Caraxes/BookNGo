import React from 'react'
import { Link } from 'react-router-dom'
import "./DoUHaveAccountStyles.css"

const DoUHaveAccount = () => {
  return (
    <div className="decision-box">
      <p>Do you have an account?</p>
      <div className="buttons">
        <Link to={"login"}><button id="yesBtn">Yes</button></Link>
        <Link to={"signup"}><button id="noBtn">No</button></Link>
      </div>
    </div>
  )
}

export default DoUHaveAccount
