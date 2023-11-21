import {
    Button,
} from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import Helmet from '../../components/helmet';
import { useTranslation } from 'react-i18next';

export default function Page404 () {

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <Helmet title="404" />
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-sm text-center">
                            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{ t('page_404.title') }</p>
                            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{ t('page_404.message') }</p>
                            <Button onClick={() => navigate("/")} color="blue" className="inline-flex focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">{ t('page_404.button') }</Button>
                        </div>   
                    </div>
                </section>
            </div>
        </>
    );

}