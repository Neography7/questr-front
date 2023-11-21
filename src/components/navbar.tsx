import { Dropdown, Navbar as FlowNavbar, Avatar, Button, DarkThemeToggle } from 'flowbite-react';
import NavbarNotification from './navbarNotification';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18nConfig';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../app/slices/auth';
import { getQuestions } from '../app/slices/unanswereds';
import { useNavigate } from 'react-router-dom';
import ReactCountryFlag from "react-country-flag"
import { useEffect } from 'react';
import { AppDispatch } from '../app/store';

export default function Navbar () {

  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
  };
  
  const isAuthenticated = useSelector((state: any) => state.auth.authenticated);
  const user = useSelector((state: any) => state.auth.user);

  const flags: Record<string, string> = {
    en: "GB"
  };

  const currentFlag = (flags[i18n.language.split('-')[0]] || i18n.language.split('-')[0]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getQuestions())
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {

    try {

      dispatch(setLogout())
      localStorage.removeItem("token");
      navigate("/login")

    } catch (err) {
      throw err;
    }
    
  }

  return (
    <>
      <FlowNavbar color="blue" fluid className='border-b text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 w-full fixed z-50'>
        <div className='flex flex-wrap items-center justify-between container mx-auto px-2 py-1'>
          <FlowNavbar.Brand onClick={() => navigate(`/`)} role="button">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Questr</span>
          </FlowNavbar.Brand>
          <div className="flex md:order-2">
          
            <Dropdown label="" renderTrigger={() => 
              <Button size="xs" color="white" className='mr-2 focus:ring-1 focus:ring-gray-300 px-1 py-0 border-0 outline-none' >
                <ReactCountryFlag countryCode={currentFlag} svg style={{ width: '1.05rem', height: '1.05rem', }} />
              </Button>
            }>
              <Dropdown.Item onClick={() => changeLanguage('en')}><ReactCountryFlag countryCode="GB" svg /></Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('tr')}><ReactCountryFlag countryCode="TR" svg /></Dropdown.Item>
            </Dropdown>

            <DarkThemeToggle className='mr-2 focus:ring-1 focus:border-white text-white hover:text-black dark:hover:bg-white dark:hover:border-white dark:hover:text-black dark:text-white dark:focus:border-white dark:ring-white' />

            { isAuthenticated ? 

              <>

                <NavbarNotification />
                
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar img={() => (
                      user.avatar ? <img
                          alt="Avatar"
                          referrerPolicy="no-referrer"
                          src={user.avatar}
                          className="w-10 h-10 object-cover rounded-full border-1 shadow-lg"
                      /> : 
                      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 border-1 shadow-lg">
                          <div className="absolute inset-y-1 flex items-center justify-center w-full h-full">
                              <svg className="absolute w-14 h-14 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                          </div>
                      </div>
                  )} className='w-10 h-10 object-cover' />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{ user.nickname }</span>
                    <span className="block truncate text-sm font-medium">@{ user.username }</span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={() => navigate(`/profile/${user.username}`)}>{ t('profile') }</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/settings')}>{ t('settings') }</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => handleLogout()}>{ t('logout')}</Dropdown.Item>
                </Dropdown> 

              </>
              :
              <Button color="white" className="dark:border-0 dark:bg-transparent dark:text-white dark:focus:text-black dark:focus:bg-white" onClick={() => navigate("/register")}>{ t('register') }</Button>
            }
          </div>
        </div>
      </FlowNavbar>
      <div className='block w-full h-16'></div>
    </>
  )
}
