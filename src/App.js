import React, { useEffect, useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { initialPersonality } from './data'

import './App.css'

const Personality = ({ facets, traits, setPersonality }) => {
  const modifyTraitScore = (traits, type, key, value) => traits.map(trait => trait.facetType === type && trait.key === key ? ({
    ...trait,
    score: value
  }) : trait);

  const modifyFacetScore = (facets, traits, type) => facets.map(facet => facet.type === type ? ({
    ...facet,
    score: traits.reduce((accum, {facetType, score}) => facetType === type ? accum + score : accum + 0, 0),
  }) : facet);

  const handleScroll = (score, facet, trait) => setPersonality({
    traits: modifyTraitScore(traits, facet.type, trait.key, score),
    facets: modifyFacetScore(facets, traits, trait.facetType)
  })

  return (
    <ul className="personality">
      {facets.map((facet, i) => (
        <li key={i} className="facet">
          <header>
            <h2>{facet.name}</h2>
            <Slider
              marks={{
                [facet.avg]: 'A',
                [facet.def]: 'Y'
              }}
              defaultValue={facet.def}
              value={facet.score}
              min={0}
              max={200}
              handleStyle={{display: 'none'}}
            />
          </header>
          <ul className="traits">
            {traits.map((trait, j) => trait.facetType === facet.type ? (
              <li key={j} className="trait">
                <h3>{trait.name}</h3>
                <Slider
                  marks={{
                    [trait.avg]: 'A',
                    [trait.def]: 'Y'
                  }}
                  defaultValue={trait.def}
                  value={trait.score}
                  min={0}
                  max={25}
                  onChange={score => handleScroll(score, facet, trait)}
                />
              </li>
            ) : null)}
          </ul>
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  const [person, setPerson] = useState({
    name: { first: "", last: "" },
    picture: { large: "", medium: "", thumbnail: "" },
    traits: initialPersonality.traits,
    facets: initialPersonality.facets,
    disorders: initialPersonality.disorders
  })

  useEffect(() => {
    const fetchPerson = async () => {
      const download = await fetch('https://randomuser.me/api')
      const { results } = await download.json()
      setPerson({...person, ...results[0]})
    }

    if(person.name.first === "") fetchPerson();
  }, [person.name.first])

  const setPersonality = (personality) => setPerson({ ...person, ...personality })

  return (
    <div className="app">
      <header>
        <img src={person.picture.large} alt="User" />
        <h1>{person.name.first} {person.name.last}</h1>
      </header>
      <Personality facets={person.facets} traits={person.traits} disorders={person.disorders} setPersonality={setPersonality} />
    </div>
  );
}

export default App;
