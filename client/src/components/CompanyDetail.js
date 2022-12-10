import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchCompany } from "../graphql/queries";
import JobList from "./JobList";

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchCompany(companyId).then((company) => setCompany(company));
  }, [companyId]);

  if (company === null) {
    return <h2>Loading...</h2>;
  }

  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
