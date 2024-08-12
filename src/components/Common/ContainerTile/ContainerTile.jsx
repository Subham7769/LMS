import React from 'react'

const ContainerTile = ({children, className}) => {
  return (
    <div className={`shadow-md bg-gray-100 border-gray-300 border rounded-xl pb-8 pt-6 px-5 ${className}`}>{children}</div>
  )
}

export default ContainerTile