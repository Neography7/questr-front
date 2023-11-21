import { Avatar } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import dayjs from '../../src/libs/dayjs'
import unescapeText from '../libs/unescape';

export default function NavbarNotificationItem ({ question, ...props }: any) {
    
const { t } = useTranslation();
    const timeAgo = dayjs(question?.createdAt).fromNow();
    const auth = useSelector((state: any) => state.auth.user);

    return (
        <div key={question._id} className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600 overflow-x-hidden" { ...props }>
            <div className="flex-shrink-0">
            <Link to={!question.anonymous ? '/profile/'+question.from?.username : `/profile/${auth.username}/question/${question._id}`}>
                <Avatar img={() => (
                    question?.from?.avatar ? <img
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                        src={question?.from?.avatar}
                        className="w-10 h-10 object-cover rounded-full border-1"
                    /> : 
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 border-1">
                        <div className="absolute inset-y-1 flex items-center justify-center w-full h-full">
                            <svg className="absolute w-14 h-14 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                )} className='w-10 h-10 object-cover' />
            </Link>
            </div>
            <div className="pl-3 w-full">
                <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                    <Link to={!question.anonymous ? '/profile/'+question.from?.username : `/profile/${auth.username}/question/${question._id}`}><span className="font-semibold text-gray-900 dark:text-white">{question.from?.username ?? t("general.anonymous") }</span></Link>: 
                    <Link to={`/profile/${auth.username}/question/${question._id}`}> { unescapeText(question.question) }</Link>
                </div>
                <Link to={`/profile/${auth.username}/question/${question._id}`}><div className="text-xs font-medium text-primary-700 dark:text-primary-400">{ timeAgo }</div></Link>
            </div>
        </div>
    )

}