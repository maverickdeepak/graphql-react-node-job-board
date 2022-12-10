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
      const { user } = context;
      console.log(user);
      if (!user) {
        throw new Error("Unauthorized");
      }
      const { input } = args;
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: async (parent, args, context) => {
      const { id } = args;
      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }
      const job = await Job.findById(id);
      if (job.companyId !== user.companyId) {
        throw new Error("Unauthorized");
      }
      return Job.delete(id);
    },
    updateJob: async (parent, args, context) => {
      const { input } = args;
      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }
      const job = await Job.findById(input.id);
      if (job.companyId !== user.companyId) {
        throw new Error("Unauthorized");
      }
      return Job.update({ ...input, companyId: user.companyId });
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
