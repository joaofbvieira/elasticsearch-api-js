const inquirer = require('inquirer');
const httpClient = require('../http/elasticsearch.http');

const questions = [
    {
        type: 'input',
        name: 'author',
        message: 'What is the author name?'
    }
];

inquirer.prompt(questions)
.then((answers) => {
    httpClient.get(`books/_search?q=author:${answers.author}`)
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
