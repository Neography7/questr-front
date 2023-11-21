import { useState, useEffect } from 'react';
import Question from './question';
import { gql, useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { FaEllipsis, FaMeteor } from 'react-icons/fa6';
import { Button, Spinner } from 'flowbite-react';

interface question {
    _id: string,
    userID: string,
    anonymous: boolean,
    question: string,
    answer: string | null,
    from: {
        username: string,
        nickname: string,
        avatar: string
    } | null,
    createdAt: string
}

export default function Questions ({ user }: any) {

    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<question[]>([]);
    const [newPageLoading, setNewPageLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const GET_QUESTIONS = gql`
        query GetQuestions($userID: String!, $page: Int) {
            getQuestions(userID: $userID, page: $page) {
                currentPage
                totalPage
                totalRecords
                questions {
                    _id
                    userID
                    question
                    answer
                    creatorID 
                    anonymous
                    createdAt
                    updatedAt
                    from {
                        id
                        username
                        nickname
                        avatar
                    }
                }
            }
        }
    `;

    const [getQuestions] = useLazyQuery(GET_QUESTIONS, {
        fetchPolicy: 'network-only',
    });

    const getQuestionsAsync = async () => {

        setNewPageLoading(true);

        const questionsResponse = await getQuestions({
            variables: { userID: user.id, page }, 
        });

        if (!questionsResponse.error && questionsResponse.data && questionsResponse.data.getQuestions) {

            const response = questionsResponse.data.getQuestions;
            const data = response.questions;

            setQuestions([ ...questions, ...data ]);
            setPage(page + 1);
            setMaxPage(response.totalPage);
            setNewPageLoading(false);
            setLoading(false);

        } else {

            setLoading(false);
        }

    }

    useEffect(() => {

        getQuestionsAsync();

        return (() => {
            setQuestions([]);
            setPage(1);
            setMaxPage(1);
            setNewPageLoading(false);
        })

    }, []);

    const removeQuestion = (removedQuestion: any) => {
        const filteredQuestions = questions.filter((question: any) => question._id !== removedQuestion._id);
        setQuestions(filteredQuestions);
    }

    return (
        <>
            { !loading && <>
                    <div className='min-h-full'>
                        { questions?.length ?
                            <>
                                {questions.map((question: question, key) => (
                                    <Question htmlFor={key} key={question?._id} data={question} removeQuestionTrigger={removeQuestion} removeAnswerTrigger={removeQuestion} className="mb-5" /> 
                                ))}
                            </>
                            :
                            <div className='text-center py-10 lg:py-32 w-full'>
                                <span className='text-8xl pb-16 flex justify-center text-blue-500 text-opacity-80'>
                                    <FaMeteor />
                                </span>
                                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                                    { t('profile_page.here_its_as_quiet_as_space') }
                                </h1>
                                <h2 className='text-xl md:text-xl lg:text-2xl spacing-2 dark:text-white'>{ t('profile_page.there_is_no_answer', { "nickname": user.nickname }) }</h2>
                            </div>
                        }
                        { (maxPage > page) &&
                            <div className='flex flex-col align-middle items-center mt-10'>
                                { !newPageLoading && <Button color="blue" onClick={() => getQuestionsAsync()} className='h-12 w-12 rounded-full'><FaEllipsis /></Button> }
                                { newPageLoading && <Button color="blue" className='h-12 w-12 rounded-full'><Spinner aria-label="Page Loading" /></Button> }
                            </div>
                        }
                    </div>
                </>
            }
        </>
    );

}