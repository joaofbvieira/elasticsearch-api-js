const inquirer = require('inquirer');
const httpClient = require('../http/elasticsearch.http');

const questions = [
    {
        type: 'input',
        name: 'indexName',
        message: 'What is the index name?'
    },
    {
        type: 'input',
        name: 'query',
        message: 'Type the search term:'
    }
];

inquirer.prompt(questions)
.then((answers) => {
    httpClient.get(`${answers.indexName}/_search?q=${answers.query}`)
    .then((result) => {
        console.table(result.data.hits.hits.map((record) => {
            return {
                id: record._id,
                ...record._source,
                score: record._score
            };
        }));
    })
    .catch((error) => {
        console.error(error.toJSON());
    });
})
.catch((error) => {
    console.error('Could not run the command.', error);
});
