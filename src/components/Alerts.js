import React from 'react'

function Alerts(props) {
  return (
    <div className="alert alert-${props.type}" role="alert">
        {props.msg}
    </div>
  )
}

export default Alerts