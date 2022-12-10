import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// import { request } from "graphql-request";
import { getAccessToken } from "../auth";

const GRAPHQL_URL = "http://localhost:9000/graphql";

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export async function fetchJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        description
        company {
          name
        }
      }
    }
  `;
  const result = await client.query({ query });
  // const { jobs } = await request(GRAPHQL_URL, query);
  // return jobs;
  return result.data.jobs;
}

export async function fetchJob(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        description
        company {
          id
          name
        }
      }
    }
  `;
  const variables = { id };
  const result = await client.query({ query, variables });
  // const { job } = await request(GRAPHQL_URL, query, variables);
  // return job;
  return result.data.job;
}

export async function fetchCompany(id) {
  const query = gql`
    query CompanyQuery($id: ID!) {
      company(id: $id) {
        name
        description
        jobs {
          id
          title
          description
        }
      }
    }
  `;
  const variables = { id };
  const result = await client.query({ query, variables });
  return result.data.company;
  // const { company } = await request(GRAPHQL_URL, query, variables);
  // return company;
}

export async function createJob(input) {
  const query = gql`
    mutation createJob($input: createJobInput!) {
      createJob(input: $input) {
        id
      }
    }
  `;
  const variables = { input };
  const headers = { Authorization: "Bearer " + getAccessToken() };
  const context = { headers };
  const results = await client.mutate({ mutation: query, variables, context });
  // const { createJob } = await request(GRAPHQL_URL, query, variables, headers);
  // return createJob;

  return results.data.createJob;
}
