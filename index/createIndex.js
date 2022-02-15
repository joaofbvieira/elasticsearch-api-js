const inquirer = require('inquirer');
const httpClient = require('../http/elasticsearch.http');

const questions = [
    {
        type: 'input',
        name: 'indexName',
        message: 'What is the index name?'
    },
    {
        type: 'number',
        name: 'indexShards',
        message: 'What is the number of shards? (leave empty to set default)',
        default: 1
    },
    {
        type: 'number',
        name: 'indexReplicas',
        message: 'What is the number of replicas? (leave empty to set default)',
        default: 1
    }
];

inquirer.prompt(questions)
.then((answers) => {
    const payload = {
        settings: {
            index: {
                number_of_shards: answers.indexShards,
                number_of_replicas: answers.indexReplicas
            }
        }
    };

    httpClient.put(answers.indexName, payload)
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
