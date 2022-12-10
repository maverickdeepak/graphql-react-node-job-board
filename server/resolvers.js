import { Job } from "./db.js";
import { Company } from "./db.js";

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (parent, args) => {
      const jobId = args.id;
      return Job.findById(jobId);
    },
  },
  Job: {
    company: (job) => {
      return Company.findById(job.companyId);
    },
  },
};
