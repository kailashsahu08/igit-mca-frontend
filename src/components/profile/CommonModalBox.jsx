import React from 'react'

const CommonModalBox = ({children, className}) => {
  return (
    <div className={`pt-5 pb-5 ${className}`} >
        {children}
    </div>
  )
}

export default CommonModalBox