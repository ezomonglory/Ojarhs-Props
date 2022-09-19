import { useRouter } from "next/router";
import Script from "next/script";
import React from "react"
import { useSelector } from "react-redux";
import { checkIsAuthenticated } from "../../features/authSlice";
import { RootState, useAppDispatch } from "../../store";
import { CopyRight } from "../Copyright";
import Loader, { PageLoader } from "../Loader";
import SideBar from "../SideBar"
import SideBarHeader from "../SideBarHeader"

export const AdminDashboardLayout = (props?: {
    children?: (props?: any) => React.ReactNode | undefined,
    className?: string
    style?: React.CSSProperties
}) => {
    const sideBarState = useSelector((store: RootState) => store.toggleSideBar.status);
    const { authenticated, user, appState } = useSelector((store: RootState) => store.authSlice)
    const dispatch = useAppDispatch()
    const router = useRouter()

    React.useEffect(() => {
        if (authenticated) return
        sessionStorage.setItem('current', router.asPath)
        dispatch(checkIsAuthenticated({ isAdmin: true }))
    }, [dispatch, authenticated, router.asPath])

    React.useEffect(() => {
        if (authenticated === false && appState === 'completed') router.push('/admin/login')
        if (user !== undefined && !user.is_admin) router.push('/login')
    }, [authenticated, appState, router])

    return <React.Fragment>
        <Script src='/scripts/noimage.js'></Script>
        <div className='w-full grid-rows-6 gap-1 h-[90vh]'>
            {appState !== 'pending' && authenticated
                &&
                <React.Fragment>
                    <SideBarHeader user={user} className="row-span-1" />
                    <PageLoader />
                    <div className='grid grid-cols-12 h-full duration-300 transition-all ease-in-out md:row-span-5'>
                        <SideBar className="col-span-6 md:col-span-3 lg:col-span-3 h-full" />
                        <div className={`p-2 lg:p-4 w-full overflow-scroll ${sideBarState ? 'col-span-6' : 'col-span-12'} md:col-span-9 lg:col-span-9 ${props.className ?? ''}`} style={props.style}>
                            {(props.children !== undefined && typeof props.children === 'function') && <React.Fragment>
                                {authenticated && user !== undefined && props.children({ authenticated, user })}
                            </React.Fragment>}
                        </div>
                    </div>
                    <CopyRight className="bg-red text-white relative md:fixed w-full bottom-0 z-50 h-12 flex flex-col justify-center items-center" />
                </React.Fragment>
            }
            {appState === 'pending' &&
                <Loader />}
        </div >
    </React.Fragment>
}