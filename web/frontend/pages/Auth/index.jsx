import React, { useEffect, useState } from 'react'
import { Button } from '@shopify/polaris';
import PlanModal from '../Pricingplans/PlanModal';



const Auth = () => {
    // const navigate = useNavigate();
    // const [active, setActive] = useState(false);

    // const toggleModal = useCallback(() => setActive((active) => !active), []);
  
    // const activator = <Button onClick={toggleModal}>Open</Button>;
    useEffect(() => {
        navigate("/dashboard", { replace: true })
    })
    return (
        <>
            {/* {active && <PlanModal {...{active,setActive,toggleModal}}/>} */}
        </>
    )
}

export default Auth;