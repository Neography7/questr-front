import { gql } from '@apollo/client';
import client from '../../libs/apollo';

const validateToken = async (token: string) => {

    const VALIDATE_TOKEN = gql`
        query ValidateToken($token: String!) {
            validateToken(token: $token) {
                token
                userID
                username
                nickname
                email
                avatar
            }
        }
    `;

    try {

        const { error, data } = await client.query({
            query: VALIDATE_TOKEN,
            variables: { token },
        })
    
        return { error, data };

    } catch (err) {

        return {
            error: true,
            data: undefined
        }

    }

};

const AuthService = {
  validateToken,
}

export default AuthService;