import { isLoggedIn, getAccessToken} from './auth';

const endpointURL = "http://localhost:9000/graphql";

async function graphqlRequest(query, variables={}) {
  const request = {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables })
  };
  if(isLoggedIn()) {
    request.headers['Authorization'] = 'Bearer ' + getAccessToken();
  }
  const response = await fetch(endpointURL, request);
  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map(err => err.message).join('\n');
    throw new Error(message);
  }
  return responseBody.data;
}

export async function createJob(input) {
  const mutation = `
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
  const variables = JSON.stringify({ input });
  console.log(variables);
  const {job} = await graphqlRequest(mutation, variables);
  return job;
}

export async function loadCompany(id) {
  const query = `
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
  }`;
  const {company} = await graphqlRequest(query, {id});
  return company;
}

export async function loadJobs() {
  const query = `
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
  const data = await graphqlRequest(query);
  return data.jobs;
}

export async function loadJob(id) {
  const {job} = await graphqlRequest(`
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
      `,
      { id });
  return job;
}
