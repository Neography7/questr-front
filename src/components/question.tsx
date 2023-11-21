import React, { FormEvent, useEffect, useState } from 'react';
import { Avatar, Button, Card, Alert, Dropdown, Blockquote } from "flowbite-react";
import { useTranslation } from 'react-i18next';
import dayjs from '../../src/libs/dayjs'
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { FaEllipsis, FaCircleInfo, FaShare, FaXTwitter, FaWhatsapp, FaSquareFacebook } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { removeQuestion, addQuestion } from '../app/slices/unanswereds';
import { Link } from 'react-router-dom';
import unescapeText from '../libs/unescape';

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

interface user {
    _id: string,
    username: string,
    nickname: string,
    avatar?: string,
}

interface QuestionComponentProps {
    data: question;
    user?: user;
    onAnswerTrigger?: Function;
    removeQuestionTrigger?: Function;
    removeAnswerTrigger?: Function;
    className?: string;
    htmlFor?: number;
}

const Question: React.FC<QuestionComponentProps> = ({ data, user, removeQuestionTrigger, onAnswerTrigger, removeAnswerTrigger, ...props }) => {

    const [question, setQuestion] = useState(data);
    useEffect(() => setQuestion(data), [data]);

    const { t } = useTranslation();
    const timeAgo = dayjs(question?.createdAt).fromNow();
    const auth = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch();

    const [ reply, setReply ] = useState(false);
    const [ answerCallbackError, setAnswerCallbackError ] = useState(false);
    const [ answerButtonDisabled, setAnswerButtonDisabled ] = useState(false);
    const [ answerCallback, setAnswerCallback ] = useState('');
    const [ answer, setAnswer ] = useState('');
    
    // Delete Question
    const DELETE_QUESTION = gql`
        query DeleteQuestion($questionID: String!)  {
            deleteQuestion(questionID: $questionID) {
                error
                message
            }
        }
    `;

    const [deleteQuestionExecute] = useLazyQuery(DELETE_QUESTION);

    const deleteQuestion = async () => {

        const deleteQuestionResponse = await deleteQuestionExecute({
            variables: { questionID: question._id }, 
        });

        if (!deleteQuestionResponse.error && deleteQuestionResponse.data) {

            if (!question?.answer) {
                dispatch(removeQuestion(question));
            }

            if (removeQuestionTrigger)
                removeQuestionTrigger(question)

        } 

    }
    
    // Delete Answer
    const CREATE_ANSWER = gql`
        mutation CreateAnswer($questionID: String!, $answer: String!) {
            createAnswer(questionID: $questionID, answer: $answer) {
                questionID
            }
        }  
    `;

    const [createAnswerExecute] = useMutation(CREATE_ANSWER);

    const createAnswer = async (event: FormEvent) => {

        event.preventDefault();

        setAnswerButtonDisabled(true);
        setAnswerCallbackError(false);
        setAnswerCallback('');

        if (answer.length < 3) {
            setAnswerButtonDisabled(false);
            setAnswerCallbackError(true);
            setAnswerCallback(t('question.please_write_an_answer'));
            return;
        }
        
        try {
        
            await createAnswerExecute({
                variables: { questionID: question._id, answer: answer }, 
            });

            dispatch(removeQuestion(question));
            setAnswer('');
            setReply(false);

            if (onAnswerTrigger)
                onAnswerTrigger(question);

            setAnswerButtonDisabled(false);
            setAnswerCallbackError(false);
            setAnswerCallback(t('general.is_sent', { "attribute": "question.your_answer" }))

            if (question)
                question.answer = answer;

        } catch (error){

            setAnswerButtonDisabled(false);
            setAnswerCallbackError(true);
            setAnswerCallback( (error as Error).message ?? 'System error' );

        }

    }
    
    // Delete Answer
    const DELETE_ANSWER = gql`
        query DeleteAnswer($questionID: String!)  {
            deleteAnswer(questionID: $questionID) {
                error
                message
            }
        }
    `;

    const [deleteAnswerExecute] = useLazyQuery(DELETE_ANSWER);

    const deleteAnswer = async () => {

        const deleteAnswerResponse = await deleteAnswerExecute({
            variables: { questionID: question?._id }, 
        });

        if (!deleteAnswerResponse.error && deleteAnswerResponse.data) {

            if (question)
                question.answer = null;

            dispatch(addQuestion(question));

            if (removeAnswerTrigger)
                removeAnswerTrigger(question);

        } 

    }
    
    // share
    const shareUrl = `${window.location.origin}/profile/${auth.username}/question/${question?._id}`
    const shareText = `💭 ${question?.question}\n\n✒ ${question?.answer}\n`;

    const shareOnTwitter = () => {
        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(twitterShareUrl);
    }

    const shareOnWhatsapp = () => {
        const whatsappShareUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}\n\n${encodeURIComponent(shareUrl)}`;
        window.open(whatsappShareUrl);
    }

    const shareOnFacebook = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(facebookShareUrl);
    }

    return (
        <> 
            <Card {...props}>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                            <Avatar img={() => (
                                question?.from?.avatar ? <Link to={'/profile/'+question.from?.username}><img
                                    alt="Avatar"
                                    referrerPolicy="no-referrer"
                                    src={question?.from?.avatar}
                                    className="w-10 h-10 object-cover rounded-full border-1"
                                /></Link> : 
                                <Link to={ question.from ? '/profile/'+question.from?.username : `/profile/${auth.username}/question/${question._id}`}><div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 border-1">
                                    <div className="absolute inset-y-1 flex items-center justify-center w-full h-full">
                                        <svg className="absolute w-14 h-14 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                    </div>
                                </div></Link>
                            )}>
                                <div className="font-medium dark:text-white">
                                    <div><span>{ question?.from?.nickname ? <Link to={'/profile/'+question.from?.username}>{ question?.from?.nickname }</Link> : t('general.anonymous')}</span></div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400"><Link to={`/profile/${auth.username}/question/${question._id}`}>{ timeAgo }</Link></div>
                                </div>
                            </Avatar>
                        </div>
                    </div>
                    { question.userID === auth.id &&
                    <Dropdown label="" dismissOnClick={false} renderTrigger={() => 
                        <Button size="xs" color="gray" className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 focus:ring-1 focus:ring-gray-300 border-0 outline-none">
                            <FaEllipsis className="w-4 h-4" />
                        </Button>
                    }>
                        <Dropdown.Item  onClick={() => deleteQuestion()}>{ t("question.remove_question") }</Dropdown.Item>
                        { question.answer && <Dropdown.Item  onClick={() => deleteAnswer()}>{ t("question.remove_answer") }</Dropdown.Item> }
                    </Dropdown>
                    }
                </div>
                <p className="text-gray-500 dark:text-gray-400">{ unescapeText(question.question) }</p>
                { question.answer && <Blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800">
                    { unescapeText(question.answer) }
                </Blockquote> }
                {
                    !question.answer ?
                    <>
                        <div className="flex items-center mt-4 space-x-4">
                            <Button color="blue" onClick={() => setReply(!reply)} size="sm">
                                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                </svg>
                                { t("question.reply") }
                            </Button>
                        </div>
                        {
                            reply && <>
                                <form onSubmit={ (event) => createAnswer(event) } >
                                    <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                            <label htmlFor="comment" className="sr-only">{ t("question.your_answer") }</label>
                                            <textarea id="comment" rows={4} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder={ t('question.write_a_answer') } required value={answer} onChange={(e) => setAnswer(e.target.value)} ></textarea>
                                        </div>
                                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                            <Button color="blue" type="submit" size="sm" disabled={answerButtonDisabled}>
                                                { t("general.send") }
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </>
                        }
                    </> :
                    <>
                        <div className="flex justify-end space-x-4">
                            <Dropdown label="" renderTrigger={() => <Button color="blue" size="sm">
                                    <span className='mr-2'><FaShare /></span>
                                    { t("general.share") }
                                </Button> }>
                                <Dropdown.Item onClick={() => shareOnTwitter()}><FaXTwitter className="mr-2" /> X</Dropdown.Item>
                                <Dropdown.Item onClick={() => shareOnWhatsapp()}><FaWhatsapp className="mr-2" /> Whatsapp</Dropdown.Item>
                                <Dropdown.Item onClick={() => shareOnFacebook()}><FaSquareFacebook className="mr-2" /> Facebook</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </>
                }
                { answerCallback && 
                    <Alert color={ answerCallbackError ? 'failure' : 'success'}  icon={FaCircleInfo}> 
                        <span>
                            <p>
                                <span className="font-medium mr-1">
                                    { answerCallbackError && t('general.warning') + "!" }
                                </span>
                                { answerCallback }
                            </p>
                        </span>
                    </Alert>
                }
            </Card>
        </>
    );

}

export default Question;