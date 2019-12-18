# GraphQL by Example

## Resources

- Course: [udemy](https://www.udemy.com/course/graphql-by-example/)
- GraphQL: [Serving over HTTP](https://graphql.org/learn/serving-over-http/)
- Apollo Server: [docs](https://www.apollographql.com/docs/) | [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

## Running project

```bash
$ docker build -t mkozi/hello -f Dockerfile.dev .
$ winpty docker run -it --name hello -p 9000:9000 --mount type=bind,source="$(pwd)",target=/app mkozi/hello
$ docker container rm hello
```
