const db = require('./db');

const Query = {
    jobs: () => db.jobs.list(),
    job: (root, {id}, context) => db.jobs.get(id),
    company: (root, {id}, context) => db.companies.get(id)
};

const Job = {
    company: (job, args, context) => {
        return db.companies.get(job.companyId)
    }
};

const Company = {
    jobs: (company, args, context) => {
        return db.jobs.list()
            .filter(job => job.companyId === company.id);
    }
}


module.exports = { 
    Query,
    Job,
    Company
};