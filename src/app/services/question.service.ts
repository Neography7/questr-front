import { gql } from '@apollo/client';
import client from '../../libs/apollo';

const getUnansweredQuestion = async (page: number) => {

    const GET_QUESTIONS = gql`
        query GetUnansweredQuestions($page: Int) {
            getUnansweredQuestions(page: $page) {
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
    
    const res = await client.query({
        query: GET_QUESTIONS,
        variables: { page: page },
    })

    return res.data.getUnansweredQuestions;

};

const QuestionService = {
  getUnansweredQuestion,
}

export default QuestionService;