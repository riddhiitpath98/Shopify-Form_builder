import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import { toastConfig } from "../../constant";
import { concat } from "../../utils/function";
axios.defaults.baseURL = "https://shopifyappapi.project-demo.info:3008/api";

// ====================================== Store data API started =========================================

export const addShopData = createAsyncThunk("shop/addShopData", async (shopData, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post("/user", shopData);
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})


// ======================================== Custom Form API started =========================================
export const addFormData = createAsyncThunk(
  "inputs/addFormData",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("/custom_form", formData.combinedObjectArr);
      dispatch(createNupdateValidation({ formId: response.data.data._id, validationData: formData.updatedErrorMsg }))
      dispatch(createNupdateAppearance({ formId: response.data.data._id, appearanceData: formData.updatedAppearance }))
      dispatch(createNupdateAfterSubmit({ formId: response.data.data._id, afterSubmitData: formData.updatedAfterSubmit }))
      toast.success(response?.msg)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.msg)
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFormData = createAsyncThunk("inputs/deleteFormData", async (customFormIdArr, { rejectWithValue }) => {
  try {
    const response = await axios.delete("/custom_form", {
      data: {
        ids: customFormIdArr
      }
    })
    toast.success(response?.data?.msg, toastConfig);
    return response.data.data;

  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})

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

export const updateFormData = createAsyncThunk("inputs/editFormData", async (updateCustomFormData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/custom_form/${updateCustomFormData._id}`, updateCustomFormData.updatedFormData);
    toast.success(response?.data?.msg, toastConfig);
    return response?.data?.data
  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})

export const editVisibleFlag = createAsyncThunk("inputs/editVisibleFlag", async (editCustomFormData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/custom_form/visible/${editCustomFormData._id}`, { isVisible: editCustomFormData?.isVisible });
    return response?.data?.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})

export const updateReCaptchaSettings = createAsyncThunk("/inputs/updateReCaptchaSettings", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/custom_form/enable/recaptcha/${data.formId}`, { enableRecaptcha: data.enable })
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const fetchFormData = createAsyncThunk(
  "inputs/fetchFormData",
  async () => {
    try {
      const response = await axios.get("/custom_form");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ========================================== settings API started  ==========================================

export const getSmtpSettingByAppId = createAsyncThunk('setting/getSmtpSettingByAppId', async (id) => {
  try {
    const response = await axios.get(`/setting/${id}`)
    return response?.data?.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})


export const createSMTPSettings = createAsyncThunk(
  "setting/postSMTPSettings",
  async (smtpsettingsData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/setting", smtpsettingsData);
      toast.success(response?.data?.msg, toastConfig)
      return response.data;
    } catch (error) {
      toast.error(error.message, toastConfig)
      return rejectWithValue(error.response.data);
    }
  }
);

export const editSmtpSettings = createAsyncThunk("setting/editSmtpSettings", async (smtpSettingData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/setting/${smtpSettingData.appId}`, smtpSettingData);
    toast.success(response?.data?.msg, toastConfig);
    return response?.data?.data;
  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})

// ================================ support API started ========================================================

export const contactUs = createAsyncThunk("support/contactus", async (contactData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/contact_us", contactData);
    toast.success(response?.data?.msg, toastConfig);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.msg);
    return rejectWithValue(error.response.data);
  }
})

export const addFeedback = createAsyncThunk("support/addFeedback", async (feedbackData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/feedback", feedbackData);
    toast.success(response?.data?.msg, toastConfig);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.msg);
    return rejectWithValue(error.response.data);
  }
})


// ====================== submission API started ========================================================================

export const createSubmissions = createAsyncThunk(
  "submission/addSubmissions",
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/submission/${submissionData.form}`, { appId: submissionData.appId, submission: submissionData.submission });
      // toast.success(response?.data?.msg, toastConfig)
      return response.data.data;
    } catch (error) {
      // toast.error(error.message)
      return rejectWithValue(error.response.data);
    }
  }
);

export const editisReadFlag = createAsyncThunk("submission/editisReadFlag", async (editSubmissionsData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/submission/read/${editSubmissionsData._id}`, { isRead: editSubmissionsData?.isRead });
    return response?.data?.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})

export const getSubmissionByFormId = createAsyncThunk("submission/getSubmissionByFormId", async (data) => {
  try {
    const response = await axios.get(`/submission/${data.id}/${data.order}?page=${data.page}&per_page=${data.per_page}`)
    return response?.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const getSubmission = createAsyncThunk("submission/getSubmission", async () => {
  try {
    const response = await axios.get(`/submission`);
    return response?.data?.data;

  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const loadMoreSubmission = createAsyncThunk('submission/loadMoreSubmission', async (data) => {
  console.log('data', data)
  try {
    const response = await axios.get(`/submission/data/loadmore/${data.order}?appId=${data.appId}&page=${data.page}&per_page=${data.per_page}`)
    return response?.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const sortNFilterSubmission = createAsyncThunk("submission/sortNFilterSubmission", async ({ path, query, appId }) => {
  const { isRead, formId, page, per_page } = query
  const params = new URLSearchParams();
  formId.forEach((item) => {
    params.append('formId[]', item);
  });

  const queryString = params.toString();

  try {
    const response = await axios.get(concat('/submission/sortdate/sorting/', path, (isRead !== '') ? `?isRead=${isRead}` : '', (formId.length !== 0) ? `${(isRead !== '') ? '&' : '?'}${queryString}` : '', (appId !== "") ? `${(isRead !== '' || formId.length !== 0) ? '&' : '?'}appId=${appId}` : '', page ? `&page=${page}` : "", per_page ? `&per_page=${per_page}` : ""))
    return response?.data;

  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const sortNFilterSubmissionById = createAsyncThunk("submission/sortNFilterSubmissionById", async ({ filterFormId, path, query }) => {
  const { isRead, formId, page, per_page } = query
  const params = new URLSearchParams();
  formId.forEach((item) => {
    params.append('formId[]', item);
  });

  const queryString = params.toString();

  try {
    const response = await axios.get(concat(`/submission/sortdate/sorting/${filterFormId}/${path}`, (isRead !== '') ? `?isRead=${isRead}` : '', (formId.length !== 0) ? `${(isRead !== '') ? '&' : '?'}${queryString}` : '', page ? `${(isRead !== '' || formId.length !== 0) ? '&' : '?'}page=${page}` : "", per_page ? `&per_page=${per_page}` : ""))
    return response?.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const deleteSubmissionData = createAsyncThunk("inputs/deleteSubmissionData", async ({ submissionIdArr, filterFormId, path, query, appId }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.delete(`/submission?appId=${appId}`, {
      data: {
        ids: submissionIdArr
      }
    })
    filterFormId ? dispatch(sortNFilterSubmissionById({ filterFormId, path, query })) : dispatch(sortNFilterSubmission({ path, query, appId }))
    toast.success(response?.data?.msg, toastConfig)
  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})
export const filterSubmissionByDate = createAsyncThunk("/submission/filterSubmissionByDate", async ({ date, filterBy }) => {
  try {
    const response = await axios.get(concat(`/submission/filter/Data/filterbydate`, (filterBy !== "custom_date") ? `?filterBy=${filterBy}` : '', (date?.startDate && date?.endDate) ? `?startdate=${date.startDate}&enddate=${date.endDate}` : ''))
    return response?.data?.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getValidationByFormId = createAsyncThunk("/formsettings/getValidationByFormId", async (id) => {
  try {
    const response = await axios.get(`/formsettings/validation/${id}`);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})

export const createNupdateValidation = createAsyncThunk("/formSettings/createNupdateValidation", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/formsettings/validation/${data.formId}`, data.validationData);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})



export const getAppearanceByFormId = createAsyncThunk("/formsettings/getAppearanceByFormId", async (id) => {
  try {
    const response = await axios.get(`/formsettings/appearance/${id}`);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})

export const createNupdateAppearance = createAsyncThunk("/formSettings/createNupdateAppearance", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/formsettings/appearance/${data.formId}`, data.appearanceData);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})

export const getAfterSubmitByFormId = createAsyncThunk("/formsettings/getAfterSubmitByFormId", async (id) => {
  try {
    const response = await axios.get(`/formsettings/afterSubmit/${id}`);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})

export const createNupdateAfterSubmit = createAsyncThunk("/formSettings/createNupdateAfterSubmit", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/formsettings/afterSubmit/${data.formId}`, data.afterSubmitData);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.msg, toastConfig);
    return rejectWithValue(error.response.data);
  }
})

// ======================================================== recaptcha actions started ===========================================================

export const getRecaptchaSettingsByAppId = createAsyncThunk("/recaptchaSettings/getRecaptchaSettingsByAppId", async (appId) => {
  try {
    const response = await axios.get(`/setting/rechaptcha/${appId}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const createRecaptchaSettings = createAsyncThunk("recaptchaSettings/createRecaptchaSettings", async (data) => {
  try {
    const response = await axios.post("/setting/rechaptcha", data)
    toast.success(response?.data?.msg, toastConfig)
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.msg, toastConfig)
    return rejectWithValue(error.response.data)
  }
})