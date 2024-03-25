import { Navigate, Route, Routes } from "react-router-dom"
import { App } from "../App"
import { Admin } from "../admin/Admin"


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <App /> }/>
            <Route path="https://regalex-express.vercel.app/admin" element={ <Admin /> }/>

            <Route path="/*" element={ <Navigate to="/" /> } />
        </Routes>
    )
}
