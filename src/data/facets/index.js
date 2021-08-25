
import { facets } from './facets';

const setInitialFacets = (facets, traits) => facets.map(facet => ({
  ...facet,
  def: traits.reduce((accum, {facetType, def}) => facetType === facet.type ? accum + def : accum + 0, 0),
  score: traits.reduce((accum, {facetType, score}) => facetType === facet.type ? accum + score : accum + 0, 0),
}))

export {
  facets,
  setInitialFacets
}