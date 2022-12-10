import { useEffect, useState } from "react";
import JobList from "./JobList";
import { fetchJobs } from "../graphql/queries";

function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().then((jobs) => setJobs(jobs));
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
