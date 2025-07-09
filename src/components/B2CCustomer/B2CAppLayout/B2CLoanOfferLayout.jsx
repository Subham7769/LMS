import React from 'react'
import B2CSideBar from '../B2CSideBar/B2CSideBar'
import B2CLoanOffers from '../B2CLoanOffers/B2CLoanOffers'
import { useSelector } from 'react-redux'

const B2CLoanOfferLayoutScreen = () => {
    const { loading } = useSelector((state) => state.B2CLoans)

    if (loading) {
        return <p>loading...</p>
    }

    return (
        <div className="flex bg-white dark:bg-gray-800">
            <B2CSideBar />

            <B2CLoanOffers />

        </div>
    )
}

export default B2CLoanOfferLayoutScreen