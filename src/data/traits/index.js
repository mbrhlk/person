
import { traits } from './traits';

const modifyTraitScore = (traits, type, key, value) => traits.map(trait => trait.facetType === type && trait.key === key ? ({
  ...trait,
  score: value
}) : trait);

const modifyTraitDefault = (traits, type, key, value) => traits.map(trait => trait.facetType === type && trait.key === key ? ({
  ...trait,
  def: value
}) : trait);

const setInitialTraits = traits => traits.map(trait => ({
  ...trait,
  def: Math.floor(Math.random() * (25 - 5 + 1)) + 5,
  score: Math.floor(Math.random() * (25 - 5 + 1)) + 5
}));

export {
  traits,
  modifyTraitDefault,
  setInitialTraits,
  modifyTraitScore
}