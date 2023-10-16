export const wrongAnswers = [
    'Nope',
    'Wrong Answer',
    'Try Again',
    'Keep going!',
    'Well... No.',
    'This is not a good answer 😫',
    'Unfortunately not 😣',
    'Ekhm.. no 🤡',
    '👎',
    'Haha, not this one 🤭',
    'Uhmmmm.... you are wrong',
    'You can do better'
]

export const goodAnswers = [
    'Yas!',
    'Yes 😄',
    'Correct!',
    'You\'re a star 🤩',
    'Exactly!',
    'Great 🥳',
    'Well done!',
    'Awesome!'
];

export function getRandomWrong() {
    return wrongAnswers[Math.floor(Math.random()*wrongAnswers.length)];
}

export function getRandomGood() {
    return goodAnswers[Math.floor(Math.random()*goodAnswers.length)];
}