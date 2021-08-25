import { disorders } from './disorders';

// Genes
const calculateRandomGeneticOdds = populationAvg => Math.floor(Math.random() * (100 - 0 + 1)) + 0 <= populationAvg ? (
  parseFloat((Math.random() * (3 - 0 + 1) + 0).toFixed(2))
) : 0

const setGeneticalOdds = genes => genes.map(gene => ({
  ...gene,
  odds: calculateRandomGeneticOdds(gene.populationAvg)
}));

const sumCurrentGenes = disorder => disorder.genes.map(gene => gene.odds).reduce((accum, cur) => accum + cur);

// Enviroment
const isAboveThreeshold = (env, score, trait) => (env.aboveAvg && score > trait.avg) || (!env.aboveAvg && score < trait.avg);

const isCorrectEnviroment = (env, trait, facet) => env.facet === facet.type && env.trait.key === trait.key ;

const calculateEnvironmentalOdds = (env, score) => score * env.differencial;

const sumCurrentEnviroment = (env, trait, facet, score) => isCorrectEnviroment(env, trait, facet) && isAboveThreeshold(env, score, trait) ? calculateEnvironmentalOdds(env, score) : env.odds;

const sumAllTraitEnviroments = (disorder) => disorder.enviroment.map(env => env.odds).reduce((accum, cur) => accum + cur)

export const modifyDisordersOdds = (disorders, facet, trait, score) => disorders.map(disorder => ({
  ...disorder,
  enviroment: disorder.enviroment.map(env => ({
    ...env,
    odds: sumCurrentEnviroment(env, trait, facet, score)
  })),
  odds: sumCurrentGenes(disorder) + sumAllTraitEnviroments(disorder, trait, facet, score)
}));

export const isSufferingDisorders = personality => ({
  ...personality,
  disorders: personality.disorders.map(disorder => ({
    ...disorder,
    isSuffering: disorder.isSuffering ? disorder.isSuffering : disorder.odds > Math.random() * (100 - 0 + 1) + 0
  }))
})

// Initial Setup
const setInitialEnviromentalOdds = (enviroment, traits) => enviroment.map(env => ({
  ...env,
  odds: traits.map(trait => trait.facetType === env.facet && trait.key === env.trait.key ? (
    calculateEnvironmentalOdds(env, trait.score)
  ) : env.odds).filter(odd => odd > 0)[0]
}));

const setInitialDisorders = (disorders, traits) => disorders.map(disorder => {
  const initialOdds = {
    genes: setGeneticalOdds(disorder.genes),
    enviroment: setInitialEnviromentalOdds(disorder.enviroment, traits),
  }

  return {
    ...disorder,
    ...initialOdds,
    odds: sumCurrentGenes(initialOdds) + initialOdds.enviroment.reduce((accum, {odds}) => accum.odds + odds)
  }
});

export {
  setInitialDisorders,
  disorders
}