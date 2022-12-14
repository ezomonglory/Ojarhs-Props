import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../config";
import { fixSpace } from "../helpers/helpers";
import { Advert, ApiResponse, Notice, Service, Space } from "../Typing";

export type indexData = {
    status: 'failed' | 'success'
    shops: Space[],
    office: Space[],
    warehouse: Space[],
    services: Service[],
}

export const loadIndex =
    createAsyncThunk<indexData | { status: "failed" }>("index/load", async (payload, { rejectWithValue }) => {
        try {
            const response = await fetch(BASEURL)
            if (response.status !== 200) {
                return {
                    status: 'failed',
                }
            }
            const data = await response.json()
            if (data.status === 'failed') return rejectWithValue({ status: 'failed' })

            let shops: Space[] = []
            let office: Space[] = []
            let warehouse: Space[] = []
            data.data.spaces.forEach((space: Space) => {
                if (space.type == 'office') office = office.concat(fixSpace(space))
                if (space.type == 'shop') shops = shops.concat(fixSpace(space))
                if (space.type == 'warehouse') warehouse = warehouse.concat(fixSpace(space))
            })
            return {
                status: 'success',
                shops: shops,
                office: office,
                warehouse: warehouse,
                services: data.data.services.map(s => {
                    return { ...s, type: 'service' }
                }),
                testimonies: data.data.reviews
            }
        } catch (error) {
            return rejectWithValue({
                status: "failed"
            })
        }
    })

export const loadNotice =
    createAsyncThunk<Notice[]>("index/notice", async (payload, { rejectWithValue }) => {
        try {
            const response = await fetch(BASEURL + '/notices')
            if (response.status == 200) {
                const data = await response.json() as ApiResponse<Notice[]>
                if (data.status === "success") {
                    return data.data
                }
            }
        } catch (error) {
        }
        return rejectWithValue({})
    })

export const loadAdverts = createAsyncThunk<Advert[]>('index/load/advert', async (payload, { rejectWithValue }) => {
    try {
        const response = await fetch(BASEURL + '/adverts')
        if (response.status == 200) {
            const data = await response.json() as ApiResponse<Advert[]>
            if (data.status === "success") {
                return data.data
            }
        }
        return rejectWithValue({})
    } catch (error) {
        return rejectWithValue({})
    }
})