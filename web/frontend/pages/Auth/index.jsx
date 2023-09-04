import React, { useEffect, useState } from 'react'
import { useAppQuery } from '../../hooks'
import { addShopData } from '../../redux/actions/allActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@shopify/app-bridge-react';
import { Spinner } from '@shopify/polaris';



const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shop = useAppQuery({ url: "/api/shop" });
    console.log('shop: ', shop);

    useEffect(() => {
        navigate("/dashboard", { replace: true })
    })
    return (
        <></>
    )
}

export default Auth;