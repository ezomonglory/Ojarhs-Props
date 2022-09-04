import React, { HTMLAttributes } from "react"
import { useSelector } from "react-redux"
import { loadPlans, loadPropertyTypes } from "../redux/resource"
import { RootState, useAppDispatch } from "../store"

export const PaymentPlans = ({ value, handleChange, className }: {
    value?: string
    handleChange: (s: string) => void
} & HTMLAttributes<HTMLDivElement>) => {
    const { status, data } = useSelector((store: RootState) => store.resourceSlice.plans)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (status === 'success' && data === undefined) {
            dispatch(loadPlans())
        }
    }, [status, data])
    return <React.Fragment>
        <select
            required
            value={value}
            className={className ?? "outline-none bg-transparent text-gray-600"}
            onChange={(e) => handleChange(e.target.value)}
        >
            <option>Choose Payment type</option>
            {(status === 'success' && data !== undefined) && data.map((p, i) => <option key={i} value={p.name} > {p.name} </option>)}
        </select>
    </React.Fragment>
}

export const PropertyType = ({ value, handleChange, className }: {
    value?: string
    handleChange: (s: string) => void
} & HTMLAttributes<HTMLDivElement>) => {
    const { status, data } = useSelector((store: RootState) => store.resourceSlice.propertyTypes)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (status === 'success' && data === undefined) {
            dispatch(loadPropertyTypes())
        }
    }, [status, data])
    return <React.Fragment>
        <select
            required
            value={value}
            className={className ?? "outline-none bg-transparent text-gray-600"}
            onChange={(e) => handleChange(e.target.value)}
        >
            <option>Choose property type</option>
            {(status === 'success' && data !== undefined) && data.map((p, i) => <option key={i} value={p.name} > {p.name} </option>)}
        </select>
    </React.Fragment>
}