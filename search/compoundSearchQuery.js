const inquirer = require('inquirer');
const httpClient = require('../http/elasticsearch.http');

const questions = [
    {
        type: 'input',
        name: 'author',
        message: 'What is the author name?'
    },
    {
        type: 'number',
        name: 'rating',
        message: 'What is the minimum rating?',
        default: 0
    }
];

inquirer.prompt(questions)
.then((answers) => {
    const payload = {
        "from": 0,
        "size": 10,
        "query": {
            "bool": {
                "must": [
                    {
                        "match": {
                            "author": answers.author
                        }
                    },
                    {
                        "range": {
                            "rating": {
                                "gte": answers.rating
                            }
                        }
                    }
                ],
                "should": [],
                "must_not": [],
                "filter": []
            }
        }
    };

    httpClient.post(`books/_search`, payload)
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
