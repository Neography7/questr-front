import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import UserCard from '../../components/userCard';
import Questions from '../../components/questions';
import CreateQuestion from '../../components/createQuestion';
import Helmet from '../../components/helmet';
import unescapeText from "../../libs/unescape";

export default function Profile () {

    const navigate = useNavigate();
    let { username } = useParams();

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

    const { data, loading, error } = useQuery(GET_PROFILE, {
        fetchPolicy: 'network-only',
        variables: {
            username
        }
    });
    
    if (error) {
        navigate("/404")
    }
  
    return (
        <>
            { !loading &&
                <Helmet title={ data?.getUser && `${data?.getUser.nickname} (@${data?.getUser.username})` }>
                    <meta name="description" content={ `QUESTR - ${data?.getUser.nickname} - @${data?.getUser.username}` } />
                    <meta property="og:title" content={ `QUESTR - ${data?.getUser.nickname} - @${data?.getUser.username}` } />
                    <meta property="og:description" content={ `QUESTR - ${data?.getUser.nickname} - @${data?.getUser.username} ` + ((data?.getUser.bio?.length > 200) ? `${unescapeText(data?.getUser.bio.substring(0, 200))}...` : data?.getUser.bio ) } />
                    <meta property="og:image" content={ data.getUser?.avatar ?? null } /> 
                    <meta property="og:url" content={window.location.href} />

                    <meta name="twitter:title" content={ `QUESTR - ${data?.getUser.nickname} - @${data?.getUser.username}` } />
                    <meta name="twitter:description" content={ `QUESTR - ${data?.getUser.nickname} - @${data?.getUser.username} ` + ((data?.getUser.bio?.length > 200) ? `${unescapeText(data?.getUser.bio.substring(0, 200))}...` : data?.getUser.bio ) } />
                    <meta name="twitter:image" content={ data.getUser?.avatar ?? null } />
                </Helmet>
            }
        
            <section>
                <div className="pt-6 px-6 mx-auto lg:pt-8 lg:px-2 max-w-[1100px]">
                    <div className="mx-auto lg:mb-16 mb-8">
                        <div className="grid grid-cols-12">

                            <div className="col-span-12 lg:col-span-4 xl:col-span-4 lg:px-5 pb-5 lg:pb-0">
                                <div className="w-full">
                                    <UserCard loading={loading} profile={data?.getUser} />
                                    <CreateQuestion loading={loading} userID={data?.getUser?.id} className="mt-5" />
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-8 xl:col-span-8 lg:pl-5">
                                { !loading && <Questions user={data?.getUser}  /> }
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}