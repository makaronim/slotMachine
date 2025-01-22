import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import GamePage from "./views/game.tsx";
import SignUpPage from "./views/signUp.tsx";
import SignInPage from "./views/signIn.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUpPage/>}/>
                <Route path="/sign-in" element={<SignInPage/>}/>
                <Route path="/game" element={<GamePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
