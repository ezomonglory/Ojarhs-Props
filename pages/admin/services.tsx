import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { RootState, useAppDispatch } from "../../store";
import { useRouter } from "next/router";
import { loadAdminServices } from "../../actions/admin/admin";
import { deleteService, resetServiceState } from "../../features/admin/serviceSlice";
import { GridColDef } from "@mui/x-data-grid";
import { money } from "../../helpers/helpers";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { Add, Delete, Edit, MoreVert, Visibility } from "@mui/icons-material";
import GridTable from "../../components/Grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Service } from "../../Typing";
import { useEffect, useState } from "react";


const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 100,
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 200,
		align: 'center',
		headerAlign: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
	},
	{
		field: 'description',
		headerName: 'Description',
		headerAlign: 'center',
		align: 'center',
		sortable: false,
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 400,
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
		field: 'manager',
		headerName: 'Manager',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 120,
	},
	{
		field: 'action',
		headerName: ':',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 120,
		renderCell: ({ row }) => <ActionCell row={row} />
	},
];

const ActionCell = ({ row }: { row: any }) => {
	const router = useRouter()
	const [dialogOpen, setDialogOpen] = useState(false)

	return <>
		<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
			<DialogTitle sx={{ fontSize: 15, textAlign: 'center' }}>
				DELETE SERVICE
			</DialogTitle>
			<DialogContent>
				This action is irreversible
			</DialogContent>
			<DialogActions>
				<Button color="error" onClick={() => setDialogOpen(false)}>
					CANCEL
				</Button>
				<Button color="success" onClick={() => {
					setDialogOpen(false)
					row.delete()
				}}>
					CONFIRM
				</Button>
			</DialogActions>
		</Dialog>
		<div className="md:hidden absolute mx-1">
			<Menu menuButton={<IconButton>
				<MoreVert fontSize="small" />
			</IconButton>} >
				<div className="py-4"></div>
				<MenuItem className={'rounded-full outline-none my-1'} >
					<IconButton onClick={() => router.push(`/admin/services/update-service/${row.slug}`)}>
						<Edit height={20} />
					</IconButton>
				</MenuItem>
				<MenuItem className={'rounded-full outline-none my-1'} >
					<IconButton onClick={() => router.push(`/services?search=${row.name}`)}>
						<Visibility height={20} />
					</IconButton>
				</MenuItem>
				<MenuItem className={'rounded-full outline-none my-1'} >
					<IconButton onClick={() => setDialogOpen(true)}>
						<Delete height={20} />
					</IconButton>
				</MenuItem>
			</Menu>
		</div>
		<div className="hidden md:flex space-x-px px-4">
			<IconButton onClick={() => router.push(`/admin/services/update-service/${row.slug}`)}>
				<Edit height={20} />
			</IconButton>
			<IconButton onClick={() => router.push(`/services?search=${row.slug}`)}>
				<Visibility height={20} />
			</IconButton>
			<IconButton onClick={() => setDialogOpen(true)}>
				<Delete height={20} />
			</IconButton>
		</div>
	</>
}

function Page() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { status, data } = useSelector((store: RootState) => store.serviceSlice)

	useEffect(() => {
		dispatch(loadAdminServices())
	}, [])


	useEffect(() => { dispatch(resetServiceState()) }, [status])

	const _deleteService = (service: Service) => dispatch(deleteService(service.slug))

	return (
		<AdminDashboardLayout>
			{() => <>
				<div className='flex justify-between w-full items-center p-2'>
					<h1 className='text-lg'>Services</h1>
					<Button
						variant='outlined'
						size='small'
						startIcon={<Add fontSize="small" />}
						onClick={() => { router.push('services/new-service') }}
					>
						ADD NEW
					</Button>
				</div>

				<div className="lg:max-w-screen-xl w-full h-full">
					<GridTable
						state={status}
						columns={columns}
						rows={data.map((s, i) => ({ ...s, id: i + 1, delete: () => _deleteService(s) }))}
					/>
				</div>
			</>}
		</AdminDashboardLayout>
	);
}
export default Page;
