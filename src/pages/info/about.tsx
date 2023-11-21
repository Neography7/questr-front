import { useTranslation } from 'react-i18next';
import Helmet from '../../components/helmet';
import { FaEnvelope } from "react-icons/fa";
import { SiNestjs, SiReact, SiGraphql, SiMongodb, SiSocketdotio, SiKubernetes, SiGithub, SiLinkedin } from "react-icons/si";

function About () {

    const { t } = useTranslation();

    return (
        <section>
            <Helmet title={ t("about.heading") } />
            <div className="pt-8 px-4 mx-auto max-w-screen-xl sm:pt-16 lg:px-6">
                <div className="max-w-screen-md mb-8 lg:mb-10">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Questr</h2>
                    <p className="text-gray-500 sm:text-xl dark:text-gray-400">{ t('about.about_description') }</p>
                </div>
                <div className="mb-12 lg:mb-16">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">İlker Akyel</h2>
                    <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                        <li>
                            <a href="https://github.com/Neography7" className="mb-2 flex items-center">
                                <span className="w-3.5 h-3.5 me-2.5 text-blue-500 dark:text-blue-400"><SiGithub /></span> Neography7
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/ilker-akyel/" className="mb-2 flex items-center">
                                <span className="w-3.5 h-3.5 me-2.5 text-blue-500 dark:text-blue-400"><SiLinkedin /></span> İlker Akyel
                            </a>
                        </li>
                        <li>
                            <a href="mailto:ilkerakyel97@gmail.com" className="flex items-center">
                                <span className="w-3.5 h-3.5 me-2.5 text-blue-500 dark:text-blue-400"><FaEnvelope /></span> ilkerakyel97@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="mb-8">
                    <h3 className="flex items-center mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        { t("about.technologies_used") }
                    </h3>
                    <p className="text-lg text-gray-500 dark:text-gray-400">{ t("about.technologies_used_content") }</p>
                </div>
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <span className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"><SiReact className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:text-white" /></span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold dark:text-white">React</h3>
                        <p className="text-gray-500 dark:text-gray-400">{ t("about.react_content") }</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <span className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"><SiNestjs className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:text-white" /></span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Nest.JS</h3>
                        <p className="text-gray-500 dark:text-gray-400">{ t("about.nest_content") }</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <span className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"><SiKubernetes className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:text-white" /></span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Kubernetes</h3>
                        <p className="text-gray-500 dark:text-gray-400">{ t("about.kubernetes_content") }</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <span className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"><SiGraphql className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:text-white" /></span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Graphql</h3>
                        <p className="text-gray-500 dark:text-gray-400">{ t("about.graphql_content") }</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <span className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"><SiMongodb  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:text-white" /></span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Mongo</h3>
                        <p className="text-gray-500 dark:text-gray-400">{ t("about.mongo_content") }</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <span className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"><SiSocketdotio  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:text-white" /></span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold dark:text-white">Socket.io</h3>
                        <p className="text-gray-500 dark:text-gray-400">{ t("about.socket_content") }</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About