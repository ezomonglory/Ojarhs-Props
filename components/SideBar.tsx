import React, { useState } from "react";
import { MenuIcon, XIcon, ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import SideBarItem from "./SideBarItem";
import { MessageSubItem, TenantsSubItem } from "../Data";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../features/ToggleSideBar";
import { useRouter } from "next/router";

function SideBar() {
	const router = useRouter();

	const sideBarState = useSelector(SideBarToggleState);
	return (
		<div
			className={
				sideBarState
					? "w-[40vw] z-50 sm:w-[25vw] md:w-[20vw] lg:w-[15vw] bg-black h-[100vh] transition-all duration-700 ease-in-out   relative p-4 space-y-4"
					: " 'w-2/12 bg-black h-[100vh] hidden lg:flex relative p-4 space-y-4'"
			}
			id='side'
		>
			<div className='flex flex-col justify-between space-y-1'>
				<div onClick={() => router.push("/Dashboard")}>
					<SideBarItem name='Dashboard' subItem={""}/>{" "}
				</div>
				<SideBarItem name='Tenants' subItem={TenantsSubItem} />
				<SideBarItem name='Messages' subItem={""}/>
				<div onClick={() => router.push("/Services")}>
					<SideBarItem name='Services' subItem={""}/>
				</div>
				<div onClick={()=> router.push("/Dash-Props")}><SideBarItem subItem={""} name='Properties' /></div>
				<SideBarItem name='Records' subItem={""} />
				<SideBarItem name='Dispute & Reports' subItem={""} />
				<SideBarItem name='Adverts' subItem={""} />
				<SideBarItem name='Ojarh Office' subItem={""}/>
			</div>
		</div>
	);
}

export default SideBar;