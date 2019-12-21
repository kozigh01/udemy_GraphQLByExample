# GraphQL by Example

## Resources

- Course: [udemy](https://www.udemy.com/course/graphql-by-example/) | [github - graphql-job-board](https://github.com/uptoskill/graphql-job-board)
- GraphQL: [Serving over HTTP](https://graphql.org/learn/serving-over-http/)
- Apollo Server: [docs](https://www.apollographql.com/docs/) | [Apollo Server](https://www.apollographql.com/docs/apollo-server/) | [Integrating with Node.js](https://www.apollographql.com/docs/apollo-server/integrations/middleware/) | [Gql Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/)
- Express.js: [site](http://expressjs.com/)
- Fake database: [notarealdb](https://www.npmjs.com/package/notarealdb)
- JWT: [express-jwt](https://www.npmjs.com/package/express-jwt)

## Running project

```bash
# hello-world app
$ docker build -t mkozi/hello -f Dockerfile.dev .
$ winpty docker run -it --name hello -p 9000:9000 --mount type=bind,source="$(pwd)",target=/app mkozi/hello
$ docker container rm hello

# graphql-job-board client: run in client directory
$ docker build -t mkozi/gbe_client -f Dockerfile.dev .
$ winpty docker run -it --name gbe_client -p 3050:3000 --mount type=bind,source="$(pwd)",target=/app mkozi/gbe_client

# graphql-job-board server: run in server directory
$ docker build -t mkozi/gbe_server -f Dockerfile.dev .
$ winpty docker run -it --name gbe_server -p 9000:9000 --mount type=bind,source="$(pwd)",target=/app mkozi/gbe_server
```
## GraphQL Playground Examples
```graphql
# Get Jobs
query {
  jobs {
    id
    title
    description
    company {
      id
      name
      description
    }
  }
}

# Get Job
query Job($id: ID!) {
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
{
  "id": "H19PMIoRB"
}

# Get Company
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
{
  "id": "HJRa-DOuG"
}

# Create Job
mutation CreateJob($request: CreateJobInput!) {
  job: createJob(request: $request) {
    id
    title
    description
    company {
      name
    }
  }
}
{
  "request": {
    "companyId": "HJRa-DOuG",
    "title": "title 4",
    "description": "description 4"
  }
}
```