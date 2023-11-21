import React, { useState } from 'react';
import {
    Checkbox,
    Button,
    TextInput,
    Alert
} from 'flowbite-react';
import { FaUser, FaAt, FaEnvelope, FaLock, FaCircleInfo } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';
import { setAuth } from '../../app/slices/auth';
import { useDispatch } from 'react-redux';
import Helmet from '../../components/helmet';
import pageImage from "../../assets/op_images/register.png";

function Register () {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);

    const [registerError, setRegisterError] = useState(false);
    const [registerCallback, setRegisterCallback] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const dispatch = useDispatch();

    const REGISTER_USER = gql`
        mutation RegisterUser($username: String!, $nickname: String!, $email: String!, $password: String!) {
            registerUser(username: $username, nickname: $nickname, email: $email, password: $password) {
                token
                userID
                username
                nickname
                email
            }
        }            
    `;

    const [mutateFunction] = useMutation(REGISTER_USER);
    
    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setSubmitButtonDisabled(true);
        setRegisterError(false);
        setRegisterCallback('');

        if (terms !== true) {
            setSubmitButtonDisabled(false);
            setRegisterError(true);
            setRegisterCallback(t('register_page.please_accept_terms_and_conditions'));
            return false;
        }

        try {

            const { data } = await mutateFunction({
                variables: { username, nickname, email, password }, // Değişiklik: değişkenler doğru yerlere atanıyor
                mutation: REGISTER_USER // Değişiklik: doğru mutation kullanılıyor
            });

            dispatch(setAuth({
                authenticated: true,
                token: data.registerUser.token,
                user: {
                    id: data.registerUser.userID,
                    username: username,
                    nickname: nickname,
                    email: email,
                }
            }))

            localStorage.setItem("token", data.registerUser.token);

            navigate("/")

        } catch (err) {

            setRegisterCallback(( (err as Error).message ?? 'System error' ));
            setSubmitButtonDisabled(false);
            setRegisterError(true);

        }

    }

    return (
        <>
            
            <Helmet title={ t('login_page.create_an_account') }>
                <meta name="description" content={ t('login_page.welcome_content').substring(0, 200) } />
                <meta property="og:title" content={ t('login_page.create_an_account') } />
                <meta property="og:description" content={ t('login_page.welcome_content').substring(0, 200) } />
                <meta property="og:image" content={ window.location.origin + pageImage } /> 
                <meta property="og:url" content={ window.location.href} />

                <meta name="twitter:title" content={ t('login_page.create_an_account') } />
                <meta name="twitter:description" content={ t('login_page.welcome_content').substring(0, 200) } />
                <meta name="twitter:image" content={ window.location.origin + pageImage } />
            </Helmet>

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-[calc(100vh-140px)] lg:pt-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Questr   
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                { t('register_page.create_an_account') }
                            </h1>
                            <form onSubmit={handleRegister} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t('general.username') }</label>
                                    <TextInput icon={FaAt} id="username" placeholder={ t('general.username') } required type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t('general.nickname') }</label>
                                    <TextInput icon={FaUser} id="nickname" placeholder={ t('general.nickname') } required type="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t('general.email') }</label>
                                    <TextInput icon={FaEnvelope} id="email" placeholder={ t('general.email') } required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t('general.password') }</label>
                                    <TextInput icon={FaLock} id="password" placeholder={ t('general.password') } required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <Checkbox id="terms" color="blue" checked={terms} onClick={() => setTerms(!terms)} className="cursor-pointer" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300 cursor-pointer"><span className="font-medium text-primary-600 hover:underline dark:text-primary-500">{ t('register_page.i_accept_the_terms_and_conditions') }</span></label>
                                    </div>
                                </div>
                                { registerError && 
                                    <Alert color="failure" icon={FaCircleInfo}> 
                                        <span>
                                            <p>
                                                <span className="font-medium mr-1">
                                                    { t('general.warning') + "!" }
                                                </span>
                                                { registerCallback }
                                            </p>
                                        </span>
                                    </Alert>
                                }
                                <Button gradientDuoTone="purpleToBlue"  type="submit" className="w-full" disabled={submitButtonDisabled}>{ t('register_page.create_an_account') }</Button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    { t('register_page.already_have_an_account') } <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">{ t('register_page.login_here') }</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
  
export default Register
  