import React, { useState } from "react";
import { TenantsDetails } from "../../Data";
import { GetStaticProps } from "next";
import Image from "next/image";
import SideBarHeader from "../../components/SideBarHeader";
import SideBar from "../../components/SideBar";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import { tenantsList } from "../../features/TenantsSlice";

function Id({ Tenant, Id }) {
	const sideBarState = useSelector(SideBarToggleState);
	return (
		<div>
			<div className=''>
				<SideBarHeader />
			</div>

			<div className='flex fixed top-16 w-full'>
				<div className={sideBarState ? "w-[40rem]] " : "w-2/12 hidden"}>
					<SideBar />
				</div>

				<div className='p-8 w-full'>
					<h1 className='mb-4 '>Ezomon Glory</h1>

					<div className=' lg:flex w-full space-x-4 '>
						<div className="relative w-3/12">
						<Image
							src='/image/eg.jfif'
							alt='glory'		
							layout='fill'
							className='rounded-lg lg:w-5/12 w-full'
						/>
						</div>

						<div className='bg-transparent lg:w-9/12 w-full'>
							<div className='bg-re w-full space-y-4 p-2'>
								<div>
									Name:<span className='text-gray-400'> Ezomon Glory</span>
								</div>
								<div>
									Address:<span className='text-gray-400'> 13, Kgb street</span>
								</div>
								<div>
									Phone No:<span className='text-gray-400'> 09074086235</span>
								</div>
								<div>
									Email:
									<span className='text-gray-400'> ezomonglory01@gmail</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Id;

export async function getStaticPaths() {
	const paths = TenantsDetails.map((tenant) => ({
		params: {
			Id: tenant.id,
		},
	}));

	return {
		fallback: "blocking",
		paths,
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const Id = context.params.Id;

	return {
		props: {
			Tenant: TenantsDetails.map((tenant) => tenant),
			Id: Id,
		},
	};
};