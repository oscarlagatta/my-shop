import {FormEvent, useEffect} from "react";
import {useLogin} from "./hooks/useLogin";
import {selectAuthError, useAuth} from "@/services/auth";
import {ServerError} from "@/shared/";
import {selectAuthIsLogged} from "@/services/auth/auth.selectors";
import {useNavigate} from "react-router-dom";

export function LoginPage() {
    const navigate = useNavigate();
    const login = useAuth(state => state.login);
    const isLogged = useAuth(selectAuthIsLogged);
    const error = useAuth(selectAuthError);

    const {changeHandler, isValid, formData} = useLogin();

    useEffect(() => {
        if(isLogged) {
            navigate('/cms')
        }
    }, [isLogged]);

    function doLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        login(formData.username, formData.password);
    }

    return (
        <div className="page-sm">
            <h1 className="title">LOGIN</h1>

            {error && <ServerError />}

            <form className="flex flex-col gap-3" onSubmit={doLogin}>
                <input type="text" placeholder="username" value={formData.username} onChange={changeHandler}
                       name="username"/>
                <input type="password" placeholder="password" value={formData.password} onChange={changeHandler}
                       name="password"/>
                <button disabled={!isValid} className="btn primary uppercase" type="submit">Sign in</button>
            </form>

            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
    )
}


