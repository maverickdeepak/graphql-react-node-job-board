import { useEffect, useState } from "react";
import JobList from "./JobList";
import { fetchJobs } from "../graphql/queries";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchJobs()
      .then((jobs) => setJobs(jobs))
      .catch((error) => setError(true));
  }, []);

  if (error) {
    return <h2>Sorry, something went wrong</h2>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
