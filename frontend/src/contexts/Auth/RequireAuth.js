import { useContext } from "react";
import { Inicio } from "../../pages";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }) => {

    const auth = useContext(AuthContext)

    if(!auth.user) {
        return <Inicio />
    }

    return children

}