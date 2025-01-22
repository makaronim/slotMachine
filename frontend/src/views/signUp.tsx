import * as React from "react";
import makeRequest, {methodType} from "../http/http.ts";
import {USER} from "../types/ENDPOINTS.ts";
import {useNavigate} from "react-router";

const SignUpPage = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [usernameError, setUsernameError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [formError, setFormError] = React.useState("");
    const navigate = useNavigate();
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if(!username || !password) {
                setUsernameError('Username is required');
                setPasswordError('Password is required');
                return
            }
            const data = {username: username, password: password};
            const response = await makeRequest({method: methodType.POST, data: data, url: USER.CREATE_USER});
            if (!response.status) {
                throw new Error(response.message);
            }
            navigate('/sign-in');
        } catch (error) {
            if (error instanceof Error) {
                setFormError(error.message);
            } else {
                setFormError('An unexpected error occurred');
            }
        }
    }
    return (
        <>
            <h1>Sign Up</h1>
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
export default SignUpPage
