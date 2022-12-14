import { useRouter } from "next/router"
import React, { } from "react"
import { useSelector } from "react-redux"
import { addMonth, money } from "../../helpers/helpers"
import { loadUserProperties } from "../../actions/user/dashboard"
import { RootState, useAppDispatch } from "../../store"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { MoreVert } from "@mui/icons-material"
import { KMenu } from "../Menu"
import { MenuItem } from "@mui/material"

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 90,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'address',
        headerName: 'Address',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 220
    },
    {
        field: 'amount',
        headerName: 'Amount',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        type: 'number',
        renderCell: ({ value }) => <div>{money(value)}</div>
    },
    {
        field: 'created_at',
        headerName: 'Expires On',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
        renderCell: ({ value, row }) => <div>{addMonth(value, row.duration)}</div>
    },
    {
        field: 'action',
        headerName: ':',
        headerAlign: 'center',
        align: 'center',
        width: 20,
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => <ActionCell row={row} />
    }
];

const ActionCell = ({ row }: { row: any }) => {
    const router = useRouter()
    return KMenu({
        button: <MoreVert fontSize="small" className='text-white' />,
        menu: [
            (<MenuItem className="text-sm" key={1} onClick={() => router.push('/property/' + row.slug)} >VIEW</MenuItem>),
            (<MenuItem className="text-sm" key={2} onClick={() => router.push('/user/packout')} >REQUEST PACKOUT</MenuItem>)
        ]
    })
}

export const UserDashboardProperties = () => {
    const { state, data } = useSelector((store: RootState) => store.accountSlice.properties)

    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(loadUserProperties({}))
    }, [])

    return (
        <div className="my-4 max-w-2xl" style={{ height: 400 }}>
            <DataGrid
                rows={data.map((s, i) => ({ ...s, id: i + 1 }))}
                columns={columns}
                loading={state === 'pending'}
            />
        </div>
    )
}