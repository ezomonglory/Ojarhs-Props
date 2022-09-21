import { createAsyncThunk } from "@reduxjs/toolkit";
import { Advert, ApiResponse, loginResponse, QueryParam, Receipt, Service, Space, UserUpdateForm } from "../../Typing.d";
import { Api } from "../../helpers/api";

export const loadUserProperties =
    createAsyncThunk<Space[] | undefined>("user/properties", async (payload, { rejectWithValue }) => {
        try {
            const { status, data } = await Api().get("/user/properties")
            if (status !== 200) {
                return rejectWithValue({
                    status: "failed"
                })
            }
            if (data.status === 'failed') return rejectWithValue({ status: 'failed' })
            return data.data as Space[]
        } catch (error) {
            return rejectWithValue({
                status: "failed"
            })
        }
    })

export const loadUserServices =
    createAsyncThunk<Service[] | undefined>("user/services", async (payload, { rejectWithValue }) => {
        try {
            const { status, data } = await Api().get("/user/services")
            if (status !== 200) {
                return rejectWithValue({
                    status: "failed"
                })
            }
            if (data.status === 'failed') return rejectWithValue({ status: 'failed' })
            return data.data as Service[]
        } catch (error) {
            return rejectWithValue({
                status: "failed"
            })
        }
    })

export const loadUserAdverts =
    createAsyncThunk<Advert[] | undefined, {}>("user/adverts", async (payload: {}, { rejectWithValue }) => {
        try {
            const { status, data } = await Api().get("/user/adverts")
            if (status !== 200) {
                return rejectWithValue({
                    status: "failed"
                })
            }
            if (data.status === 'failed') return rejectWithValue({ status: 'failed' })
            return data.data as Advert[]
        } catch (error) {
            return rejectWithValue({
                status: "failed"
            })
        }
    })

export const updateUserProfile = createAsyncThunk<ApiResponse<loginResponse>, UserUpdateForm>("user/profile-update", async (payload, { rejectWithValue }) => {
    try {
        const response = await Api().put<ApiResponse<loginResponse>>("/user/update-profile", JSON.stringify(payload))
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue({})
    }
})

export const loadUserReceipt = createAsyncThunk<Receipt[], QueryParam>("user/receip    t", async (payload, { rejectWithValue }) => {
    try {
        const response = await Api().get<ApiResponse<Receipt[]>>("/user/receipt")
        return response
            .data
            .data
            .map((e) => ({
                ...e,
                created_at: (new Date(e.created_at)).toLocaleDateString(),
                expires: new Date(e.expires).toLocaleDateString()
            }))
    } catch (error) {
        console.log(error)
        return rejectWithValue({})
    }
})

