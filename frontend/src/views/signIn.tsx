import * as React from "react";
import {useState} from "react";
import makeRequest, {methodType} from "../http/http.ts";
import {SIGNIN} from "../types/ENDPOINTS.ts";
import {IResponse, ISignInResponse} from "../types/interfaces.ts";
import {useNavigate} from "react-router";

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!username || !password) {
            setUsernameError('Username is required');
            setPasswordError('Password is required');
            return
        }
        try {
            const data = {username: username, password: password};
            const response: IResponse<ISignInResponse> = await makeRequest({
                method: methodType.POST,
                data: data,
                url: SIGNIN.SIGN_IN
            })
            if (!response.status) {
                throw new Error(response.message);
            }
            localStorage.setItem("gameData", JSON.stringify(response.data.message));
            // Redirect to the game view
            navigate("/game");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setFormError(error.message);
            } else {
                setFormError('An unexpected error occurred');
            }
        }
    }
    return (
        <>
            <h1>Sign In</h1>
            <form id={'signInForm'} onSubmit={onSubmit}>
                <label htmlFor={'signInForm'}>Username <br/>
                    <input id={'username'} type={'text'} placeholder={'Username'}
                           onChange={(e) => setUsername(e.target.value)}/>
                </label>
                {usernameError && (<p className={'error'}>{usernameError}</p>)}
                <label htmlFor={'signInForm'}>Password <br/>
                    <input id={'password'} type={'password'} placeholder={'Password'}
                           onChange={(e) => setPassword(e.target.value)}/>
                </label>
                {passwordError && (<p className={'error'}>{passwordError}</p>)}
                <button type="submit">Submit</button>
                {formError && (<p className={'error'}>{formError}</p>)}
            </form>
        </>
    )
}

export default SignInPage
