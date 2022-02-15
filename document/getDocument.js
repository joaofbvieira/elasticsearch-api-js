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
        name: 'documentId',
        message: 'What is the document id?'
    }
];

inquirer.prompt(questions)
.then((answers) => {
    httpClient.get(`${answers.indexName}/_doc/${answers.documentId}`)
    .then((result) => {
        console.log(result.data);
    })
    .catch((error) => {
        console.error(error.toJSON());
    });
})
.catch((error) => {
    console.error('Could not run the command.', error);
});
