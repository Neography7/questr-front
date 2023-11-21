import { Routes, Route } from 'react-router-dom'

import Layout from "./pages/layout";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Profile from "./pages/user/profile";
import Settings from "./pages/settings/settings";
import { GuestPrivate, UserPrivate } from "./guards/guard";
import Page404 from "./pages/errors/page404";
import Question from "./pages/question/question";
import PrivacyPolicy from "./pages/info/privacyPolicy";
import About from "./pages/info/about";

export const Router = () => {
  return (
    <Routes>

        <Route element={<Layout />}>
                
            <Route element={<UserPrivate />}>
                <Route index element={<Home />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
            
            <Route element={<GuestPrivate />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/profile/:username/question/:id" element={<Question />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/About" element={<About />} />
        
        </Route>

        <Route>
            <Route path="/404" element={<Page404 />} />
            <Route path=":any" element={<Page404 />} />
        </Route>

    </Routes>
  )
}