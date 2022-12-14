import Image from "next/image";
import React from "react";
import MiddleAdvert from "./Adverts";
import { NoticeBoard } from "./NoticeBoard";

function Notice() {
	return (
		<div className="md:grid grid-cols-9 w-[100%] overflow-hidden space-y-2">
			<div className='col-span-4 2xl:h-[70vh] xl:h-[55vh] lg:h-[50vh] md:h-[45vh] sm:h-[60vh] h-[40vh]'>
				<NoticeBoard />
			</div>
			<div className="text-center px-2 col-span-5 2xl:h-[70vh] xl:h-[55vh] lg:h-[50vh] md:h-[45vh] h-[35vh]">
				<MiddleAdvert />
			</div>
		</div>
	);
}

export default Notice;
