const random_jokes = [
    {
        id: 1,
        name: 'react',
        desc: 'react',
        url: 'http://www.baidu.com/'
    },{
        id: 2,
        name: 'react',
        desc: 'react',
        url: 'http://www.baidu.com/'
    },
];

let random_joke_call_count = 0;

export default {
    'get /dev/cardsList': function (req, res) {
        res.json(random_jokes);
    },
};
