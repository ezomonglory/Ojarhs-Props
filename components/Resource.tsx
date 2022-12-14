import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import React, { HTMLAttributes } from "react"
import { useSelector } from "react-redux"
import { loadPlans, loadPropertyTypes } from "../actions/resource"
import { RootState, useAppDispatch } from "../store"

export const PaymentPlans = ({ value, handleChange, className, error }: {
    value?: string
    handleChange: (s: string) => void
    error?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
    const { status, data } = useSelector((store: RootState) => store.resourceSlice.plans)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (status === 'success' && data === undefined) {
            dispatch(loadPlans())
        }
    }, [status, data, dispatch])
    return <React.Fragment>
        <div className={className}>
            <FormControl size="small" fullWidth>
                <InputLabel className="text-xs uppercase">{'Payment Plan'}</InputLabel>
                <Select
                    value={value || ''}
                    label={<span className="text-xs uppercase">{"Payment Plan"}</span>}
                    className="text-sm uppercase"
                    size="small"
                    error={error}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    <MenuItem className="uppercase text-xs" value={''} > {'Choose plan'} </MenuItem>
                    {(status === 'success' && data !== undefined) && data.map((p, i) => <MenuItem className="uppercase text-xs" key={i} value={p.name} > {p.name} </MenuItem>)}
                </Select>
            </FormControl>
        </div>
    </React.Fragment>
}

export const PropertyType = ({ value, handleChange, className, error }: {
    value?: string
    handleChange: (s: string) => void
    error?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
    const { status, data } = useSelector((store: RootState) => store.resourceSlice.propertyTypes)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (status === 'success' && data === undefined) {
            dispatch(loadPropertyTypes())
        }
    }, [status, data, dispatch])
    return <React.Fragment>
        <div className={className}>
            <FormControl size="small" fullWidth>
                <InputLabel className="text-xs uppercase">{'Property Type'}</InputLabel>
                <Select
                    value={value || ''}
                    label={<span className="text-xs uppercase">{"PROPERTY TYPE"}</span>}
                    className="text-sm uppercase"
                    size="small"
                    error={error}
                    onChange={(e) => handleChange(e.target.value as string)}
                >
                    <MenuItem className="uppercase text-xs" value={''} > {'Choose type'} </MenuItem>
                    {(status === 'success' && data !== undefined) && data.map((p, i) => <MenuItem className="uppercase text-xs" key={i} value={p.name} > {p.name} </MenuItem>)}
                </Select>
            </FormControl>
        </div>
    </React.Fragment>
}