import React, { useState } from "react";
import { useSelector } from "react-redux";
import { tenantsList } from "../../features/TenantsSlice";
import DashCards from "../../components/DashCards";
import DashTenant from "./DashTenant";
import { PropertyList } from "../../features/PropertySlice";
import DashProps from "../../components/DashProp";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";

function Dashboard() {
	const [updateOpen, setUpdateOpen] = useState(false);
	const tenantListArr = useSelector(tenantsList);
	const Properties = useSelector(PropertyList)

	const fn = (async () => {
		const res = fetch("https://sleepy-everglades-36547.herokuapp.com/admin/properties/all").then(() => {
			alert("worked")
			console.log(res);

		}).catch((error) => {
			// alert("error")
			console.log(error);

		})
	})();

	return <AdminDashboardLayout>
		<h1 className='text-2xl red'>Dashboard</h1>
		<div className='flex flex-wrap gap-5 my-2'>
			{/* the numbers you are seeing as a class is for the linear gradient    */}

			<div className=' one rounded-2xl w-full md:w-[48%] lg:w-[32%] '>
				<DashCards name='total properties' lengths='70' />
			</div>
			<div className=' six rounded-2xl w-full md:w-[48%] lg:w-[32%] '>
				<DashCards name='total Tenants' lengths='20' />
			</div>{" "}
			<div className=' three rounded-2xl w-full md:w-[48%] lg:w-[32%] '>
				<DashCards name='total Services' lengths='5' />
			</div>{" "}
			<div className=' four rounded-2xl w-full md:w-[48%] lg:w-[32%] '>
				<DashCards name='Payment pending' lengths='70' />
			</div>{" "}
			<div className=' five rounded-2xl w-full md:w-[48%] lg:w-[32%] '>
				<DashCards name='Payment processing' lengths='70' />
			</div>
			<div className=' two rounded-2xl w-full md:w-[48%] lg:w-[32%] '>
				<DashCards name='payment complete' lengths='70' />
			</div>
		</div>

		<div className='flex space-x-3 w-full mt-8 flex-wrap flex-row justify-between'>
			<div className='w-full lg:w-[48%]'>
				<h1 className=' text-2xl red mb-2'>Recent Tenants</h1>
				{tenantListArr.length !== 0 ? (
					<div className='flex gap-3 lg:flex-row flex-wrap px-4 justify-center w-full scrollbar-hide overflow-scroll   shadow-gray-400 shadow-md'>
						<table id='customers'>
							<tr className=' w-full flex justify-between'>
								<th className=''>Name</th>
								<th className=''>Status</th>
								<th className=''>
									<span className='text-white cursor-none'>Options</span>
								</th>
							</tr>

							{tenantListArr.map((tenant, index) => {
								return (
									<DashTenant
										Tenant={tenant}
										key={index}
										setOpen={setUpdateOpen}
									/>
								);
							})}
						</table>
					</div>
				) : (
					<div className='text-center uppercase mt-4 '>
						No New Tenant{" "}
					</div>
				)}
			</div>

			<div className='lg:w-[48%] w-full mt-4 lg:mt-0'>
				<h1 className=' text-2xl red mb-2'>Recent Service</h1>
				{tenantListArr.length !== 0 ? (
					<div className='flex gap-3 lg:flex-row flex-wrap px-4 justify-center w-full scrollbar-hide overflow-scroll   shadow-gray-400 shadow-md'>
						<table id='customers'>
							<tr className=' w-full flex justify-between'>
								<th className=''>Name</th>
								<th className=''>Status</th>
								<th className=''>
									<span className='text-white cursor-none'>Options</span>
								</th>
							</tr>

							{tenantListArr.map((tenant, index) => {
								return (
									<DashTenant
										Tenant={tenant}
										key={index}
										setOpen={setUpdateOpen}
									/>
								);
							})}
						</table>
					</div>
				) : (
					<div className='text-center uppercase mt-4 '>
						No New Tenant{" "}
					</div>
				)}
			</div>
		</div>

		<div className="mt-8">
			<h1 className="text-2xl red ">Recent Properties</h1>
			<div>
				{Properties.length !== 0 ? (
					<div className='flex gap-3 lg:flex-row flex-wrap justify-center scrollbar-hide overflow-scroll  pb-12 px-8'>
						<table id='customers'>
							<thead>
								<tr className='he w-full flex justify-between'>
									<th className='inline-block w-[50%] lg:w-[30%]'>Name</th>
									<th className='hidden lg:inline-block w-[35%]'>Price</th>
									<th className='inline-block w-[30%] lg:w-[15%]'>Type</th>
									<th className='hidden lg:inline-block w-[20%]'>Options</th>
									<th className='lg:hidden w-[20%]'></th>
								</tr>
							</thead>

							<tbody>
								{/* FIX YOUR DASHPROPS COMPONENT */}
								{/* {
									Properties.map((prop, index) => <DashProps
										key={index}
										Prop={prop}
										setOpen={setUpdateOpen}
									/>)
								} */}
							</tbody>
						</table>
					</div>
				) : (
					<div className='text-center uppercase mt-4 '>No New Property </div>
				)}
			</div>
		</div>
	</AdminDashboardLayout>
}

export default Dashboard;