import { Button } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserServices } from "../../components/user/UserServices"
import { UserApplicationStatus } from "../../Typing.d"

const Page = () => {
    const router = useRouter()
    return <UserDashboardLayout className="p-2">
        {({ application }) => <React.Fragment>
            {application as UserApplicationStatus === 'verified' && <>
                <h1 className="py-2 text-lg red font-semibold">Services</h1>
                <UserServices />
            </>}
            {application as UserApplicationStatus !== 'verified' && <>
                <div className="py-4 mt-8 bg-gray-800 px-2 text-sm rounded-md text-white text-center">
                    <h6 className="text-red-500">NOTICE</h6>
                    <div className="lg:mx-12">
                        {'There\'s an error with your Application'}
                    </div>
                </div>

                <div className="m-4 flex justify-center">
                    <Button
                        size='small'
                        variant='outlined'
                        onClick={() => router.push('/user/dashboard')}>
                        DASHBOARD
                    </Button>
                </div>
            </>}
        </React.Fragment>}
    </UserDashboardLayout>
}

export default Page