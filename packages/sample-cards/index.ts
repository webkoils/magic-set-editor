import { MseCard } from '@mse/types';

const sampleCards: MseCard[] = [
  {
    id: '1',
    name: 'Doomed Traveler',
    manaCost: '{W}',
    num: 1,
    types: 'Creature',
    subtypes: 'Human Soldier',
    power: 1,
    artworkSrc:
      'https://cdn.inprnt.com/thumbs/ab/90/ab90888365216c96f97cb7cb455c827a.jpg?response-cache-control=max-age=2628000',
    toughness: 1,
    rulesText:
      'When CARDNAME dies, create a 1/1 white Spirit creature token with flying.',

    flavorText:
      'He vowed he would never rest until he reached his destination. He doesn’t know how right he was.',
    template: 'm15',
  },
  {
    id: '2',
    name: 'Explore',
    manaCost: '{1}{G/W}',
    num: 2,
    types: 'Sorcery',
    artworkSrc: 'https://assets.echomtg.com/magic/cards/cropped/66765.hq.jpg',
    rulesText: 'You may play an additional land this turn.\nDraw a card.',
    flavorText: "An explorer lorem ipsum's it up baby.",
    template: 'm15',
  },
  {
    id: '3',
    name: 'Selesnya Sanctuary',
    num: 3,
    types: 'Land',
    artworkSrc: 'https://assets.echomtg.com/magic/cards/cropped/66765.hq.jpg',
    rulesText: [
      'CARDNAME enters the battlefield tapped',
      "When CARDNAME enters the battlefield, return a land you control to its owner's hand.",
      '{T}: Add {W}{G}',
    ].join('\n'),
    template: 'm15',
  },
];

export default sampleCards;
