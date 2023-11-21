import { Dropdown } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { addQuestion, getQuestions } from '../app/slices/unanswereds';
import io from 'socket.io-client';
import NavbarNotificationItem from './navbarNotificationItem';
import notificationSoundWav from '../assets/notification.wav';
import { AppDispatch } from '../app/store';

export default function NavbarNotification () {

  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: any) => state.auth);
  const unanswereds = useSelector((state: any) => state.unanswereds);

  const notificationSound = new Audio(notificationSoundWav);
  notificationSound.volume = 1;

  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = () => {
    
    const container = containerRef.current;

    if (unanswereds.totalPage > unanswereds.page) {
      if ( container && (container.scrollTop + container.clientHeight + 80 > container.scrollHeight) && !loading) {
        setLoading(true);
        dispatch(getQuestions()).then(() => setLoading(false));
      }
    }
    
  };

  useEffect(() => {

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    socket.on('notification', (data: any) => {
      
      notificationSound.play();

      if (data.type === "new_question") {
        dispatch(addQuestion(data.data));
      }
    });

    return () => {
      socket.disconnect();
    };

  }, []);

  return (
    <>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <div
            className="relative p-2.5 mr-3 text-white rounded-lg hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black focus:ring-0 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20"><path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/></svg>      
             { unanswereds?.count > 0 && <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-0 border-white rounded -top-1.5 -right-1.5 dark:border-red-9700">{ unanswereds.count }</div> }
          </div>
        }
      >
        <div className="right-0 z-50 w-64 text-base bg-white rounded-lg divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700">
          <div className="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            { t('general.questions') }
          </div>
          <div className='max-h-[190px] overflow-x-hidden overflow-y-scroll' ref={containerRef} onScroll={handleScroll}>
            {
              unanswereds.count > 0 ?
              <div>
                { unanswereds.questions.map((question: any) => (
                  <NavbarNotificationItem question={question} key={question._id} />
                )) }
              </div> : 
              <>
                <div className="flex-shrink-0"><p className="w-100 p-3 text-center">{ t('general.there_are_no_new_question') }</p></div>
              </>
            }
          </div>
          <Link to="/" className="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline">
            <div className="inline-flex items-center">
              { t("general.view_all") }
            </div>
          </Link>
        </div>
      </Dropdown> 
    </>
  );
};