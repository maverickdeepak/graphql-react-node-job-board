import { Job } from "./db.js";
import { Company } from "./db.js";

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (parent, args) => {
      const jobId = args.id;
      return Job.findById(jobId);
    },
    company: (parent, args) => {
      const companyId = args.id;
      return Company.findById(companyId);
    },
  },
  Job: {
    company: (job) => {
      return Company.findById(job.companyId);
    },
  },
  Company: {
    jobs: (company) => {
      return Job.findAll((job) => job.companyId === company.id);
    },
  },
};
