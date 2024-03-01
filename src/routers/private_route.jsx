import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute({isLoggedIn, children}){
    if(!isLoggedIn){
        return <Navigate to='/signinup'/>
    }
    
    return (
        <div>
            {children ? children : <Outlet/>}
        </div>
    )
}