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

  Mutation: {
    createJob: (parent, args, context) => {
      const { input } = args;
      return Job.create(input);
    },
    deleteJob(parent, args, context) {
      const { id } = args;
      Job.delete(id);
      return true;
    },
    updateJob(parent, args, context) {
      const { input } = args;
      return Job.update(input);
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
