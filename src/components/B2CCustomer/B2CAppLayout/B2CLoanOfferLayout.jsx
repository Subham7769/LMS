import React from 'react'
import B2CSideBar from '../B2CSideBar/B2CSideBar'
import B2COffers from '../B2CLoanOffers/B2CLoanOffers'

const B2CLoanOfferLayoutScreen = () => {
    return (
        <div className="flex bg-white dark:bg-gray-800">
            <B2CSideBar />
            <div className={"flex justify-center flex-1"} >
                <B2COffers />
            </div>
        </div>
    )
}

export default B2CLoanOfferLayoutScreen