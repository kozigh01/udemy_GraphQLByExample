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
  const {data: {job}} = await client.mutate({
    mutationCreateJob, 
    variables: {input},
    update: (cache, {data}) => {
      cache.writeQuery({
        query: queryJob,
        variables: { id: data.job.id },
        data
      })
    }
  });
  return job;
}

export async function loadCompany(id) {
  const {company} = await client.query({query: queryCompany, variables: {id}});
  return company;
}

export async function loadJobs() {
  const {data: {jobs}} = await client.query({query: queryJobs, fetchPolicy: 'no-cache'});
  return jobs;
}

const mutationCreateJob = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
      title
      description
      company {
        name
      }
    }
  }
`;
const fragmentJobDetail = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      id
      name
    }
  }
`;
const queryJob = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${fragmentJobDetail}
`;
const queryJobs = gql`
  query JobsQuery {
    jobs {
      ...JobDetail
    }
  }
  ${fragmentJobDetail}
`;
const queryCompany = gql`
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

export async function loadJob(id) {
  const {data: {job}} = await client.query({query: queryJob, variables: {id}});
  return job;
}
