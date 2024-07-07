import React from 'react'
import loader from '../../../assets/image/loader1.gif'

const Loader = () => {
  return (
    <div className={"flex justify-center item-center w-full h-screen"}>
      <div>

      <img src={loader} alt={"Loading..."} />
      </div>
    </div>
  )
}

export default Loader