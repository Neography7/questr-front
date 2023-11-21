import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import i18n from '../../i18nConfig';

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_BACKEND_URL + '/graphql',
    fetchOptions: {
      mode: 'cors',
    },
});

const authLink = setContext((_, { headers }: any) => {
  const token = localStorage.getItem('token');
  
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'Accept-Language': i18n.language,
      }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;