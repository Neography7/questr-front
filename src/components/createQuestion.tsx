import React, { ChangeEvent, useState } from 'react';
import { ToggleSwitch, Button, Card, Textarea, Alert } from "flowbite-react";
import { FaCircleInfo } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

const CreateQuestion = ({ loading, userID, ...props }: { loading: boolean, userID: number, className?: string }) => {

    const { t } = useTranslation();
    const isAuthenticated = useSelector((state: any) => state.auth.authenticated);

    const [question, setQuestion ] = useState('');
    const [anonymous, setAnonymous] = useState(true);

    const [submitError, setSubmitError] = useState(false);
    const [submitCallback, setSubmitCallback] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    // INFORMATION
    const CREATE_QUESTION = gql`      
        mutation CreateQuestion (
            $userID: String!, 
            $question: String!, 
            $anonymous: Boolean! 
        ) {
            createQuestion(
                userID: $userID
                question: $question
                anonymous: $anonymous
            ) {
                questionID
                error
                message
                data {
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

    const [executeCreateInformation, createQuestionResponse] = useMutation(CREATE_QUESTION);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setSubmitButtonDisabled(true);
        setSubmitError(false);
        setSubmitCallback('');

        if (question.length < 3) {
            setSubmitButtonDisabled(false);
            setSubmitError(true);
            setSubmitCallback(t('create_question.please_write_a_question_or_message'));
            return;
        }

        try {

            await executeCreateInformation({
                variables: { 
                    userID: userID, 
                    question: question, 
                    anonymous: anonymous 
                }, 
                mutation: CREATE_QUESTION 
            });

            setQuestion('');
            setSubmitButtonDisabled(false);
            setSubmitError(false);
            setSubmitCallback(t('general.is_sent', { "attribute": "create_question.your_question" }))

          } catch (err) {

            setSubmitButtonDisabled(false);
            setSubmitError(true);
            setSubmitCallback(( createQuestionResponse?.error?.graphQLErrors[0]["message"] ?? 'System error' ));

            throw err;
        }

    }

    return (
        <> 
            { !loading ? 
                <Card {...props}>
                    <h5 className="format text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        { t('create_question.leave_a_question_or_message') }
                    </h5>
                    <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <Textarea placeholder={ t('create_question.your_thoughts')} required rows={4} value={question} onInput={ (e: ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)} />
                        </div>
                        { isAuthenticated &&    
                            <div>
                                <ToggleSwitch color="blue" checked={anonymous} label={ t('create_question.anonymous')} onChange={setAnonymous} />
                            </div>
                        }
                        { submitCallback && 
                            <Alert color={ submitError ? 'failure' : 'success'}  icon={FaCircleInfo}> 
                                <span>
                                    <p>
                                        <span className="font-medium mr-1">
                                            { submitError && t('general.warning') + "!" }
                                        </span>
                                        { submitCallback }
                                    </p>
                                </span>
                            </Alert>
                        }
                        <Button color="blue" type="submit" disabled={submitButtonDisabled}>{ t('general.send') }</Button>
                    </form>
                </Card>
            : '' }
        </>
    );


}

export default CreateQuestion;