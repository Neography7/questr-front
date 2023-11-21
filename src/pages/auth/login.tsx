import React, { useState } from 'react';
import {
    Button,
    TextInput,
    Alert,
    Checkbox
} from 'flowbite-react';
import { FaUser, FaLock, FaCircleInfo } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from '@apollo/client';
import { setAuth } from '../../app/slices/auth';
import { useDispatch } from 'react-redux';
import Helmet from '../../components/helmet';
import pageImage from "../../assets/op_images/index.png";

function Login () {

    const { t } = useTranslation();

    const navigate = useNavigate();
    
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [loginError, setLoginError] = useState(false);
    const [loginCallback, setLoginCallback] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const dispatch = useDispatch();

    const LOGIN_USER = gql`
        query LoginUser($usernameOrEmail: String!, $password: String!, $remember: Boolean) {
            loginUser(usernameOrEmail: $usernameOrEmail, password: $password, remember: $remember) {
                token
                userID
                username
                nickname
                email
                avatar
            }
        }
    `;

    const [queryFunction] = useLazyQuery(LOGIN_USER);
    
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setSubmitButtonDisabled(true);
        setLoginError(false);
        setLoginCallback('');

        try {

            const { data, error } = await queryFunction({
                variables: { usernameOrEmail, password, remember }, 
            });

            if (error) {

                setSubmitButtonDisabled(false);
                setLoginError(true);
                setLoginCallback(( error.message ));

            } else {

                dispatch(setAuth({
                    authenticated: true,
                    token: data.loginUser.token,
                    user: {
                        id: data.loginUser.userID,
                        username: data.loginUser.username,
                        nickname: data.loginUser.nickname,
                        email: data.loginUser.email,
                        avatar: data.loginUser.avatar,
                    }
                }));
    
                localStorage.setItem("token", data.loginUser.token);
    
                navigate('/');

            }

          } catch (err) {

            setSubmitButtonDisabled(false);
            setLoginError(true);
            setLoginCallback(( 'System error' ));

            throw err;
        }

    }

    return (
        <>
            <Helmet title={ t('login_page.sign_in_your_account') }>
                <meta name="description" content={ t('login_page.welcome_content').substring(0, 200) } />
                <meta property="og:title" content={ t('login_page.welcome_to_questr') } />
                <meta property="og:description" content={ t('login_page.welcome_content').substring(0, 200) } />
                <meta property="og:image"  content={ window.location.origin + pageImage } /> 
                <meta property="og:url" content={window.location.href} />

                <meta name="twitter:title" content={ t('login_page.sign_in_your_account') } />
                <meta name="twitter:description" content={ t('login_page.welcome_content').substring(0, 200) } />
                <meta name="twitter:image" content={ window.location.origin + pageImage } />
            </Helmet>

            <section className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-[calc(100vh-140px)] lg:pt-0">
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{ t('login_page.welcome_to_questr') }</h2>
                        <p className="mb-20 font-light text-gray-500 md:text-lg dark:text-gray-400">{ t('login_page.welcome_content') }</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    { t('login_page.sign_in_your_account')}
                                </h1>
                                <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t("login_page.username_or_email") }</label>
                                        <TextInput icon={FaUser} id="email" placeholder={ t('login_page.username_or_email') } required type="text" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t("login_page.password") }</label>
                                        <TextInput icon={FaLock} id="password" placeholder={ t('login_page.password') } required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <Checkbox id="terms" color="blue" checked={remember} onClick={() => setRemember(!remember)} />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300"><span className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">{ t('login_page.remember_me') }</span></label>
                                        </div>
                                    </div>
                                    { loginError && 
                                        <Alert color="failure" icon={FaCircleInfo}> 
                                            <span>
                                                <p>
                                                    <span className="font-medium mr-1">
                                                        { t('general.warning') + "!" }
                                                    </span>
                                                    { loginCallback }
                                                </p>
                                            </span>
                                        </Alert>
                                    }
                                    <Button gradientDuoTone="purpleToBlue" className="w-full" type="submit" disabled={submitButtonDisabled}>{ t('login') }</Button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        { t('login_page.dont_have_an_account_yet') } <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">{ t('register') }</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
  
export default Login