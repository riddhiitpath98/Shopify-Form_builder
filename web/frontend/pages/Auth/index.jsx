import React, { useEffect, useState } from 'react'
import { useAppQuery } from '../../hooks'
import { addShopData } from '../../redux/actions/allActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@shopify/app-bridge-react';
import { Spinner } from '@shopify/polaris';



const Auth = () => {
    const user = useSelector(state => state);
    const dispatch = useDispatch();
    const shop = useAppQuery({ url: "/api/shop" });
    const navigate = useNavigate();

    useEffect(() => {
        if (shop.isSuccess) {
            const { id, shop_owner, phone, name, city, customer_email, email, myshopify_domain } = shop.data;
            const data = {
                id, shop_owner, phone, name, city, customer_email, email, myshopify_domain, isShowPlan: false, isPremium: false
            }
            dispatch(addShopData(data));
        }
        if (shop.isSuccess) {
            navigate("/dashboard", { replace: true })
        }
    })
    return (
        <></>
    )
}

export default Auth;