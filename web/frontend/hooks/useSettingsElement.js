import { useCallback, useMemo } from 'react'
import { Icons, SUBSCRIPTION_TYPES, appearanceAttributes, validationAttributes } from '../constant'
const elemType = ['Inputs', 'Select', 'Static Text']

const useSettingsElement = () => {

    const settingsElement = useMemo(() => [
        {
            id: "appearance",
            title: "Appearance",
            icon: Icons.appearance,
            attributes: appearanceAttributes,
        },
        {
            id: "reCaptcha",
            viewAccess: ['premium', 'enterprise'],
            title: "Google reCaptcha",
            icon: Icons.reCaptcha,
        },
        {
            id: "error_msg",
            title: "Error message",
            icon: Icons.error_msg,
            attributes: validationAttributes
        },
        {
            id: "submit_actions",
            title: "After Submit",
            icon: Icons.after_submit,
            attributes: {
                submitAction: "",
                submitMessage: "",
            }
        },
    ]

        , [Icons])

    const checkElements = (plan) => {
        return settingsElement.filter(val => {
            if (!val?.viewAccess)
                return val;
            else if (val?.viewAccess.includes(plan))
                return val
            else return null
        })
    }

    const elements = (selectedPlan = 'free') => {
        if (!selectedPlan) return []
        return checkElements(selectedPlan)
    }

    return { settingsElement, elements }
}

export default useSettingsElement