import { combineReducers, configureStore } from "@reduxjs/toolkit";
import inputFieldSlice from "./reducers/inputFieldSlice";
import settingSlice from "./reducers/settingSlice";
import supportSlice from "./reducers/supportSlice";
import appIdSlice from "./reducers/appIdSlice";
import submissionSlice from "./reducers/submissionSlice";
import formSettingSlice from "./reducers/formSettingSlice";
import viewPortSlice from "./reducers/viewPortSlice";
import userSlice from "./reducers/userSlice";
import subscriptionSlice from "./reducers/subscriptionSlice";
import anyAPISettingSlice from "./reducers/anyAPISettingSlice";
import recurringCharge from "./reducers/recurringCharge";

const reducers = combineReducers({
    inputField: inputFieldSlice,
    setting: settingSlice,
    support: supportSlice,
    shopId: appIdSlice,
    submission: submissionSlice,
    formSetting: formSettingSlice,
    viewPort: viewPortSlice,
    user: userSlice,
    subscription: subscriptionSlice,
    anyAPISetting: anyAPISettingSlice,
    recurringCharge: recurringCharge
});

export const store = configureStore({
    reducer: reducers
})
