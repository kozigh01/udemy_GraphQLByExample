import { isLoggedIn, getAccessToken} from './auth';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, gql } from 'apollo-boost';
// import { gql } from 'graphql-tag';

const endpointURL = "http://localhost:9000/graphql";

const authLink = new ApolloLink((operation, forward) => {
  if(isLoggedIn()) {
    operation.setContext({
      headers: {
        'authorization': 'Bearer ' + getAccessToken()
      }
    });
  }  
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({uri: endpointURL})
  ]),
  cache: new InMemoryCache()
});

export async function createJob(input) {
  const mutation = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
      title
      description
      company {
        name
      }
    }
  }`;
  const {data: {job}} = await client.mutate({mutation, variables: {input}});
  return job;
}

export async function loadCompany(id) {
  const query = gql`
    query CompanyQry($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;
  const {company} = await client.query({query, variables: {id}});
  return company;
}

export async function loadJobs() {
  const query = gql`
  query {
    jobs {
      id
      title
      company {
      id
      name
      }
    }
  }`;
  const {data: {jobs}} = await client.query({query});
  return jobs;
}

export async function loadJob(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const {data: {job}} = await client.query({query, variables: {id}});
  return job;
}
