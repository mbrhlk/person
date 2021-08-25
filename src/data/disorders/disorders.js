export const disorders = [
  {
    type: 'depression',
    name: 'Depression',
    hasSuffered: false,
    isSuffering: false,
    stage: 0,
    odds: 0,
    genes: [
      {
        source: 'father',
        odds: 0,
        populationAvg: 4.8
      },
      {
        source: 'mother',
        odds: 0,
        populationAvg: 8.5
      },
      {
        source: 'randomMutation',
        odds: 0,
        populationAvg: 6.2
      }
    ],
    enviroment: [
      {
        facet: 'N',
        differencial: .08,
        aboveAvg: true,
        odds: 0,
        trait: {
          key: 1,
          name: 'Anxiety'
        }
      },
      {
        facet: 'N',
        differencial: .09,
        aboveAvg: true,
        odds: 0,
        trait: {
          key: 3,
          name: 'Depression'
        }
      },
      {
        facet: 'N',
        differencial: .09,
        aboveAvg: true,
        odds: 0,
        trait: {
          key: 3,
          name: 'Vulnerability'
        }
      },
      {
        facet: 'E',
        differencial: .09,
        aboveAvg: true,
        odds: 0,
        trait: {
          key: 3,
          name: 'Warmth'
        }
      },
    ],
    bibliography: [
      'http://apps.who.int/iris/bitstream/handle/10665/254610/WHO-MSD-MER-2017.2-eng.pdf',
      'https://www.ncbi.nlm.nih.gov/pubmed/15390211',
      'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3760870/',
      'http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0071964'
    ]
  }
];