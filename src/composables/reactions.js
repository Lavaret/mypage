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
    'Haha, not this one 🤭'
]

export const goodAnswers = [
    'Yas!',
    'Yes 😄',
    'Corect!',
    'You\'re a star 🤩',
    'Exactly!',
    'Great 🥳',
    'Well done!',
    'Awesome!'
];

export function getRandomWrong() {
    return wrongAnswers[Math.floor(Math.random()*wrongAnswers.length)];
}