import { request, gql } from "graphql-request";

const GRAPHQL_URL = "http://localhost:9000/graphql";

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
  const { jobs } = await request(GRAPHQL_URL, query);
  return jobs;
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
  const { job } = await request(GRAPHQL_URL, query, variables);
  return job;
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
  const { company } = await request(GRAPHQL_URL, query, variables);
  return company;
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
  const { createJob } = await request(GRAPHQL_URL, query, variables);
  return createJob;
}
