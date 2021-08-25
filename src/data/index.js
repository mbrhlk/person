import { facets, setInitialFacets } from './facets';
import { traits, setInitialTraits } from './traits';
import { disorders, setInitialDisorders } from './disorders';

const initialTraits = setInitialTraits(traits);
const initialFacets = setInitialFacets(facets, initialTraits);
const initialDisorders = setInitialDisorders(disorders, initialFacets, initialTraits);

export const initialPersonality = {
  traits: initialTraits,
  facets: initialFacets,
  disorders: initialDisorders
}