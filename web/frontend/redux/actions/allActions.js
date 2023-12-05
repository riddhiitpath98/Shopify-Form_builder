import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "../../constant";
import { concat } from "../../utils/function";
axios.defaults.baseURL = "https://shopifyappapi.project-demo.info:3008/api";

// ====================================== Store data API started =========================================

export const addShopData = createAsyncThunk(
  "shop/addShopData",
  async (shopData, { rejectWithValue, dispatch }) => {
    console.log('shopData: ', shopData);
    try {
      const response = await axios.post("/user", shopData);
      toast.success(response?.data?.msg, toastConfig);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserByShopId = createAsyncThunk(
  "shop/getUserByShopId",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`/user/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSessionCheckout = createAsyncThunk("/shop/createSessionCheckout", async (data, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`/payment/create-checkout-session`, data)
    return response.data.session;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

// export const createSubscription = createAsyncThunk('/shop/createSubscription', async (data, { rejectWithValue, dispatch }) => {
//   console.log('data: ', data);
//   try {
//     const response = await axios.post(`/payment/create-payment-intent`, data)
//     console.log('response: ', response);
//     return response.data.clientSecret;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// })

// ======================================== Custom Form API started =========================================
export const addFormData = createAsyncThunk(
  "inputs/addFormData",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "/custom_form",
        formData.combinedObjectArr
      );
      dispatch(
        createNupdateValidation({
          formId: response.data.data._id,
          validationData: formData.updatedErrorMsg,
        })
      );
      dispatch(
        createNupdateAppearance({
          formId: response.data.data._id,
          appearanceData: formData.updatedAppearance,
        })
      );
      dispatch(
        createNupdateAfterSubmit({
          formId: response.data.data._id,
          afterSubmitData: formData.updatedAfterSubmit,
        })
      );
      toast.success(response?.msg);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.msg);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFormData = createAsyncThunk(
  "inputs/deleteFormData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/custom_form?shopId=${data.shopId}`,
        {
          data: {
            ids: data.deleteFormArr,
          },
        }
      );
      toast.success(response?.data?.msg, toastConfig);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFormDataById = createAsyncThunk(
  "inputs/fetchFormDataById",
  async (id) => {
    try {
      const response = await axios.get(`/custom_form/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFormData = createAsyncThunk(
  "inputs/editFormData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/custom_form/${data._id}`,
        { customForm: data.customForm, isPremium: data.isPremium }
      );
      toast.success(response?.data?.msg, toastConfig);
      return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editVisibleFlag = createAsyncThunk(
  "inputs/editVisibleFlag",
  async (editCustomFormData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/custom_form/visible/${editCustomFormData._id}?shopId=${editCustomFormData.shopId}`,
        { isVisible: editCustomFormData?.isVisible }
      );
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateReCaptchaSettings = createAsyncThunk(
  "/inputs/updateReCaptchaSettings",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/custom_form/enable/recaptcha/${data.formId}`,
        { enableRecaptcha: data.enable }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFormData = createAsyncThunk(
  "inputs/fetchFormData",
  async (shopId) => {
    try {
      const response = await axios.get(`/custom_form?shopId=${shopId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ========================================== settings API started  ==========================================

export const getSmtpSettingByAppId = createAsyncThunk(
  "setting/getSmtpSettingByAppId",
  async (id) => {
    try {
      const response = await axios.get(`/setting/${id}`);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSMTPSettings = createAsyncThunk(
  "setting/postSMTPSettings",
  async (smtpsettingsData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/setting", smtpsettingsData);
      toast.success(response?.data?.msg, toastConfig);
      return response.data;
    } catch (error) {
      toast.error(error.message, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editSmtpSettings = createAsyncThunk(
  "setting/editSmtpSettings",
  async (smtpSettingData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/setting/${smtpSettingData.shopId}`,
        smtpSettingData
      );
      toast.success(response?.data?.msg, toastConfig);
      return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

// ================================ support API started ========================================================

export const contactUs = createAsyncThunk(
  "support/contactus",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contact_us", contactData);
      toast.success(response?.data?.msg, toastConfig);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.msg);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addFeedback = createAsyncThunk(
  "support/addFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/feedback", feedbackData);
      toast.success(response?.data?.msg, toastConfig);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.msg);
      return rejectWithValue(error.response.data);
    }
  }
);

// ====================== submission API started ========================================================================

// export const createSubmissions = createAsyncThunk(
//   "submission/addSubmissions",
//   async (submissionData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`/submission/${submissionData.form}`, {
//         shopId: submissionData.shopId,
//         submission: submissionData.submission,
//       });
//       // toast.success(response?.data?.msg, toastConfig)
//       return response.data.data;
//     } catch (error) {
//       // toast.error(error.message)
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const createSubmissions = createAsyncThunk(
  "submission/addSubmissions",
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/submission/${submissionData.form}`,
        submissionData?.formData
      );
      // toast.success(response?.data?.msg, toastConfig)
      return response.data.data;
    } catch (error) {
      // toast.error(error.message)
      return rejectWithValue(error.response.data);
    }
  }
);

export const editisReadFlag = createAsyncThunk(
  "submission/editisReadFlag",
  async (editSubmissionsData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/submission/read/${editSubmissionsData._id}`,
        { isRead: editSubmissionsData?.isRead }
      );
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getSubmissionByFormId = createAsyncThunk(
  "submission/getSubmissionByFormId",
  async (data) => {
    try {
      const response = await axios.get(
        `/submission/${data.id}/${data.order}?page=${data.page}&per_page=${data.per_page}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubmission = createAsyncThunk(
  "submission/getSubmission",
  async (shopId) => {
    try {
      const response = await axios.get(`/submission?shopId=${shopId}`);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadMoreSubmission = createAsyncThunk(
  "submission/loadMoreSubmission",
  async (data) => {
    try {
      const response = await axios.get(
        `/submission/data/loadmore/${data.order}?shopId=${data.shopId}&page=${data.page}&per_page=${data.per_page}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sortNFilterSubmission = createAsyncThunk(
  "submission/sortNFilterSubmission",
  async ({ path, query, shopId }) => {
    const { isRead, formId, page, per_page } = query;
    const params = new URLSearchParams();
    formId.forEach((item) => {
      params.append("formId[]", item);
    });

    const queryString = params.toString();

    try {
      const response = await axios.get(
        concat(
          "/submission/sortdate/sorting/",
          path,
          isRead !== "" ? `?isRead=${isRead}` : "",
          formId.length !== 0
            ? `${isRead !== "" ? "&" : "?"}${queryString}`
            : "",
          shopId !== ""
            ? `${isRead !== "" || formId.length !== 0 ? "&" : "?"
            }shopId=${shopId}`
            : "",
          page ? `&page=${page}` : "",
          per_page ? `&per_page=${per_page}` : ""
        )
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sortNFilterSubmissionById = createAsyncThunk(
  "submission/sortNFilterSubmissionById",
  async ({ filterFormId, path, query }) => {
    const { isRead, formId, page, per_page } = query;
    const params = new URLSearchParams();
    formId.forEach((item) => {
      params.append("formId[]", item);
    });

    const queryString = params.toString();

    try {
      const response = await axios.get(
        concat(
          `/submission/sortdate/sorting/${filterFormId}/${path}`,
          isRead !== "" ? `?isRead=${isRead}` : "",
          formId.length !== 0
            ? `${isRead !== "" ? "&" : "?"}${queryString}`
            : "",
          page
            ? `${isRead !== "" || formId.length !== 0 ? "&" : "?"}page=${page}`
            : "",
          per_page ? `&per_page=${per_page}` : ""
        )
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSubmissionData = createAsyncThunk(
  "inputs/deleteSubmissionData",
  async (
    { submissionIdArr, filterFormId, path, query, shopId },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.delete(`/submission?shopId=${shopId}`, {
        data: {
          ids: submissionIdArr,
        },
      });
      filterFormId
        ? dispatch(sortNFilterSubmissionById({ filterFormId, path, query }))
        : dispatch(sortNFilterSubmission({ path, query, shopId }));
      toast.success(response?.data?.msg, toastConfig);
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);
export const filterSubmissionByDate = createAsyncThunk(
  "/submission/filterSubmissionByDate",
  async ({ date, filterBy }) => {
    try {
      const response = await axios.get(
        concat(
          `/submission/filter/Data/filterbydate`,
          filterBy !== "custom_date" ? `?filterBy=${filterBy}` : "",
          date?.startDate && date?.endDate
            ? `?startdate=${date.startDate}&enddate=${date.endDate}`
            : ""
        )
      );
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getValidationByFormId = createAsyncThunk(
  "/formsettings/getValidationByFormId",
  async (id) => {
    try {
      const response = await axios.get(`/formsettings/validation/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNupdateValidation = createAsyncThunk(
  "/formSettings/createNupdateValidation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/formsettings/validation/${data.formId}`,
        data.validationData
      );
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAppearanceByFormId = createAsyncThunk(
  "/formsettings/getAppearanceByFormId",
  async (id) => {
    try {
      const response = await axios.get(`/formsettings/appearance/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNupdateAppearance = createAsyncThunk(
  "/formSettings/createNupdateAppearance",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/formsettings/appearance/${data.formId}`,
        data.appearanceData
      );
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAfterSubmitByFormId = createAsyncThunk(
  "/formsettings/getAfterSubmitByFormId",
  async (id) => {
    try {
      const response = await axios.get(`/formsettings/afterSubmit/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNupdateAfterSubmit = createAsyncThunk(
  "/formSettings/createNupdateAfterSubmit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/formsettings/afterSubmit/${data.formId}`,
        data.afterSubmitData
      );
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

// ======================================================== recaptcha actions started ===========================================================

export const getRecaptchaSettingsByAppId = createAsyncThunk(
  "/recaptchaSettings/getRecaptchaSettingsByAppId",
  async (shopId) => {
    try {
      const response = await axios.get(`/setting/rechaptcha/${shopId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createRecaptchaSettings = createAsyncThunk(
  "recaptchaSettings/createRecaptchaSettings",
  async (data) => {
    try {
      const response = await axios.post("/setting/rechaptcha", data);
      toast.success(response?.data?.msg, toastConfig);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

// =====================subscription api ===========================
export const getAllSubscription = createAsyncThunk(
  "subscription/getAllSubscription",
  async () => {
    try {
      const response = await axios.get("/subscriptions");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubscriptionById = createAsyncThunk(
  "subscription/getSubscriptionById",
  async (id) => {
    try {
      const response = await axios.get(`/subscription/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//================================================ Contact form to any API ===================================================

export const createFormToAPIsettings = createAsyncThunk(
  "anyAPISetting/createFormToAPIsettings",
  async (data) => {
    try {
      const response = await axios.post(`/contact-to-api/${data.formId}`, data);
      toast.success(response?.data?.msg, toastConfig);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFormToAPISettings = createAsyncThunk(
  "anyAPISettings/getFormToAPIsettings",
  async (shopId) => {

    try {
      const response = await axios.get(`/contact-to-api?shopId=${shopId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFormToAPISettings = createAsyncThunk(
  "anyAPISettings/deleteFormToAPISettings",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/contact-to-api?shopId=${data?.shopId}`,
        {
          data: {
            apiIds: data.deleteLogArr,
          },
        }
      );
      toast.success(response?.data?.msg, toastConfig);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editFormToAPISettings = createAsyncThunk(
  "anyAPISettings/editFormToAPISettings",
  async (data, { rejectWithValue }) => {
    const { id, formValues } = data;
    try {
      const response = await axios.put(
        `/contact-to-api/${id}?shopId=${formValues?.shopId}`,
        formValues
      );
      toast.success(response?.data?.msg, toastConfig);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFormToAPIById = createAsyncThunk(
  "anyAPISettings/getFormToAPIById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/contact-to-api/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);


//================================================ Any API Logs ===================================================

export const getAPILogsData = createAsyncThunk(
  "anyAPISettings/getAPILogsData",
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/logs?shopId=${shopId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.msg, toastConfig);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadMoreLogs = createAsyncThunk(
  "anyAPISettings/loadMoreLogs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/logs?shopId=${data.shopId}&page=${data.page}&per_page=${data.per_page}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// =================================================billing API started ========================================


export const createApplicationCharge = createAsyncThunk("recurringCharge/createApplicationCharge", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/billing`, data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const getApplicationCharge = createAsyncThunk('recurringCharge/getApplicationCharge', async (recurringAuth, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/billing?shopId=${recurringAuth.shopId}`)
    const recurringChargeData = response?.data?.data?.map(async (item) => {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${recurringAuth.session}` || ''
        }
      }
      const response = await fetch(`/api/recurring-application-charge/${item.chargeId}`, options)
      const data = await response.json();
      return data.recurringCharge
    })
    const results = await Promise.all(recurringChargeData);
    return results;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})