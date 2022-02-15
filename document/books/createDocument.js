const inquirer = require('inquirer');
const httpClient = require('../../http/elasticsearch.http');
const INDEX_NAME = 'books';

const questions = [
    {
        type: 'input',
        name: 'id',
        message: 'What is the book ID? (leave empty for auto generated ID)',
        default: ''
    },
    {
        type: 'input',
        name: 'name',
        message: 'What is the book name?'
    },
    {
        type: 'input',
        name: 'author',
        message: 'What is the book author?'
    },
    {
        type: 'number',
        name: 'price',
        message: 'What is the book price?',
        default: 0,
        validate(value) {
            if (!value || value <= 0.00)
                return false;
            return true;
        }
    },
    {
        type: 'list',
        name: 'rating',
        message: 'What is the book rating?',
        choices: ['★', '★★', '★★★', '★★★★', '★★★★★']
    },
    {
        type: 'input',
        name: 'language',
        message: 'What is the book language? (leave empty to set default)',
        default: 'English'
    }
];

inquirer.prompt(questions)
.then((answers) => {
    const payload = {
        name: answers.name,
        author: answers.author,
        price: answers.price,
        rating: answers.rating.length,
        language: answers.language
    };

    httpClient.post(`${INDEX_NAME}/_doc/${answers.id}`, payload)
    .then((result) => {
        console.log('Document created!', result.data);
    })
    .catch((error) => {
        console.error(error.toJSON());
    });
})
.catch((error) => {
    console.error('Could not run the command.', error);
});
