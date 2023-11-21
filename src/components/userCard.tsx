import { Blockquote } from "flowbite-react";
import { Card, Avatar } from 'flowbite-react';

export default function UserCard ({ loading, profile }: { loading: boolean, profile: any }) {

    return (
        <>
            {
                !loading ?
                    <Card>
                        <div className="flex flex-col items-center py-2">
                            <Avatar img={() => (
                                profile.avatar ? <img
                                    alt="Avatar"
                                    referrerPolicy="no-referrer"
                                    src={profile.avatar}
                                    className="w-36 h-36 object-cover rounded-full border-1 shadow-lg"
                                /> : 
                                <div className="relative w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 border-1 shadow-lg">
                                    <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                                        <svg className="absolute w-48 h-48 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                    </div>
                                </div>
                            )} className='mb-3 w-36 h-36 object-cover' />
                            {/* <img
                                alt={ profile.avatar + "'s Avatar" }
                                src={ profile.avatar ?? null }
                                className="mb-3 w-36 h-36 object-cover rounded-full shadow-lg"
                            /> */}
                            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ profile.nickname }</h5>
                            <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                                <cite className="text-sm text-gray-500 dark:text-gray-400">@{ profile.username }</cite>
                            </div>
                            {
                                profile.bio &&
                                <div className="mt-4 flex space-x-3 lg:mt-6">
                                    <Blockquote className="text-center">"{ profile.bio }"</Blockquote>
                                </div>
                            }
                        </div>
                    </Card> 
                    :  
                <Card role="status" className="max-w-sm animate-pulse">
                    <div className="flex flex-col items-center">
                        <svg className="mb-5 w-36 h-36 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        <h5 className="mb-5">
                            <div className="bg-gray-200 rounded-full dark:bg-gray-700 h-3 w-28"></div>
                        </h5>
                        <div className="flex flex-col items-center w-full">
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                        </div>
                </div>
                </Card>
            }
        </>
    );

}