import { useNavigate, useParams } from "react-router-dom";
import QuestionComponent from '../../components/question';
import { gql, useQuery } from '@apollo/client';
import Helmet from '../../components/helmet';
import UserCard from '../../components/userCard';
import CreateQuestion from '../../components/createQuestion';
import unescapeText from '../../libs/unescape';

export default function Question () {

    const navigate = useNavigate();
    let { username, id } = useParams();

    const GET_QUESTION = gql`
        query GetQuestion($questionID: String!) {
            getQuestion(questionID: $questionID) {
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
    `;

    const GET_PROFILE = gql`
        query GetUser($username: String!) {
            getUser(username: $username) {
                id
                username
                nickname
                bio
                avatar
            }
        }
    `;

    // const { data, loading, error } = useQuery(GET_QUESTION, {
    //     variables: { questionID: id }
    // });

    // if (error) {
    //     navigate("/404");
    // }

    const question = useQuery(GET_QUESTION, {
        fetchPolicy: 'network-only',
        variables: { questionID: id }
    });

    const profile = useQuery(GET_PROFILE, {
        fetchPolicy: 'network-only',
        variables: { username: username }
    });

    if (question.error || profile.error ) {
        navigate("/404");
    }

    const removeQuestionTrigger = () => {
        navigate("/");
    }

    return (
        <>
            { !profile.loading && <>
                <Helmet title={ ((question.data?.getQuestion?.question?.length > 100) ? `${unescapeText(question.data?.getQuestion?.question?.substring(0, 100))}...` : question.data?.getQuestion?.question ) }>
                    <meta name="description" content={ ((question.data?.getQuestion?.question?.length > 200) ? `${unescapeText(question.data?.getQuestion?.question?.substring(0, 200))}...` : question.data?.getQuestion?.question ) } />
                    <meta property="og:title" content={ `QUESTR - ` + ((question.data?.getQuestion?.question?.length > 100) ? `${unescapeText(question.data?.getQuestion?.question?.substring(0, 100))}...` : question.data?.getQuestion?.question ) } />
                    <meta property="og:description" content={ ((question.data?.getQuestion?.question?.length > 200) ? `${unescapeText(question.data?.getQuestion?.question?.substring(0, 200))}...` : question.data?.getQuestion?.question ) } />
                    <meta property="og:image" content={ profile?.data.getUser?.avatar ?? null } /> 
                    <meta property="og:url" content={window.location.href} />

                    <meta name="twitter:title" content={ `QUESTR - ` + ((question.data?.getQuestion?.question?.length > 100) ? `${unescapeText(question.data?.getQuestion?.question?.substring(0, 100))}...` : question.data?.getQuestion?.question ) } />
                    <meta name="twitter:description" content={ ((question.data?.getQuestion?.question?.length > 200) ? `${unescapeText(question.data?.getQuestion?.question?.substring(0, 200))}...` : question.data?.getQuestion?.question ) } />
                    <meta name="twitter:image" content={ profile?.data.getUser?.avatar ?? null } />
                </Helmet>
                
                {/* <section>
                    <div className="py-6 px-6 mx-auto max-w-screen-md lg:py-8 lg:px-2">
                        <div className="mx-auto lg:mb-16 mb-8">
                            { !loading && <QuestionComponent loading={loading} question={data.getQuestion} /> }
                        </div>
                    </div>
                </section> */}

                <section>
                    <div className="py-6 px-6 mx-auto lg:py-8 lg:px-2 max-w-[1100px]">
                        <div className="mx-auto lg:mb-16 mb-8">
                            <div className="grid grid-cols-12">

                                <div className="col-span-12 lg:col-span-4 xl:col-span-4 lg:px-5 pb-5 lg:pb-0">
                                    <div className="">
                                        <UserCard loading={profile?.loading} profile={profile?.data.getUser} />
                                        <CreateQuestion loading={profile?.loading} userID={profile?.data.getUser.id} className="mt-5" />
                                    </div>
                                </div>

                                <div className="col-span-12 lg:col-span-8 xl:col-span-8 lg:pl-5">
                                    { !question.loading && <QuestionComponent data={question.data?.getQuestion} removeQuestionTrigger={removeQuestionTrigger} /> }
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                </>
            }
        </>
    );

}