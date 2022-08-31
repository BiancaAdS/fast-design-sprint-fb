import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import jwt_decode from 'jwt-decode'

export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const [logado, setLogado] = useState(false)


    let loginUser = async (username, password )=> {
        let response = await fetch('https://fast-design-sprint.vercel.app/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':username, 'password':password})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            setLogado(true)
            return true
        } else{
            return false
        }
    }

    
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        setLogado(false)
    }

    let updateToken = async ()=> {

        let response = await fetch('https://fast-design-sprint.vercel.app/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    useEffect(()=> {

        if(loading && logado){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, authTokens }}>
            {children}
        </AuthContext.Provider>
    )
}