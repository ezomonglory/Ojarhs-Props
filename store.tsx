import { configureStore } from '@reduxjs/toolkit'
import menuStore from "./features/HeaderMenu"
import TogglePassword from './features/TogglePassword'
import ToggleSideBar from './features/ToggleSideBar'
import ToggleSubItem from './features/ToggleSubItem'
import TenantsSlice from "./features/TenantsSlice"
import PropertySlice from './features/PropertySlice'
import StaffSlice from './features/StaffSlice'
import IndexSlice from './features/IndexSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    menu: menuStore,
    togglePassword: TogglePassword,
    toggleSubItem: ToggleSubItem,
    toggleSideBar: ToggleSideBar,
    tenantsSlice: TenantsSlice,
    propertySlice: PropertySlice,
    staffSlice: StaffSlice,
    indexSlice: IndexSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()