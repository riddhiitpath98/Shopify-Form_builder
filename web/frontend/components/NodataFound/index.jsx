import { EmptyState } from '@shopify/polaris'
import React from 'react'
import noDataFound from '../../assets/noDataFound.png';

const Nodatafound = () => {
    return (
        <EmptyState
            heading="No form Data Found"
            image={noDataFound}>
            <p>Whoops.... this information is not available for a moment</p>
        </EmptyState>
    )
}

export default Nodatafound