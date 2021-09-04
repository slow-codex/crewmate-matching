import React, { useState, useEffect } from "react";

import shuffle from "lodash.shuffle";
import "./App.css";

import Header from "./components/header";

//Image taking from pinterest :)
//Hope you like the code and Find the impostor

const pokemon = [
  {
    id: 4,
    name: "baby yoda",
    link: "data:image/png;base64,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",
  },
  {
    id: 10,
    name: "red",
    link: "https://external-preview.redd.it/KFi2TlG4yWQlSvi91aXFU4FOjdEqJxyPtCWl3IXMOEk.jpg?auto=webp&s=327de3c7950e6cfc8c63cb3711f99c6f9dbd0470",
  },
  {
    id: 77,
    name: "yellow",
    link: "https://www.citypng.com/public/uploads/preview/-41601334000juyqtkjgzt.png",
  },
  {
    id: 108,
    name: "blue",
    link: "https://preview.redd.it/94s4hdi4vdq51.png?width=2300&format=png&auto=webp&s=cdeaa3d5e8e16d4c02fecce42504f49a3e1d958f",
  },
  {
    id: 132,
    name: "green",
    link: "https://www.citypng.com/public/uploads/preview/-41601317988yqoqcydesb.png",
  },
  {
    id: 133,
    name: "black",
    link: "https://i.pinimg.com/236x/e4/95/cd/e495cdf9b293f396b61f1c2e45b61bda.jpg",
  },
];
const doublePokemon = shuffle([...pokemon, ...pokemon]);

export default function App() {
  const [opened, setOpened] = useState([]); // using index
  const [matched, setMatched] = useState([]); // pokemon.id
  const [moves, setMoves] = useState(0);

  // check if there is a match
  // if there are 2 in the opened array, check if they match
  useEffect(() => {
    if (opened.length < 2) return;

    const firstPokemon = doublePokemon[opened[0]];
    const secondPokemon = doublePokemon[opened[1]];

    if (firstPokemon.name === secondPokemon.name)
      setMatched((matched) => [...matched, firstPokemon.id]);
  }, [opened]);

  // clear cards after 2 have been selected
  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);
  }, [opened]);

  function flipCard(index) {
    setMoves((moves) => moves + 1);
    setOpened((opened) => [...opened, index]);
  }

  // check if there is a winner
  useEffect(() => {
    if (matched.length === pokemon.length) alert("you won!");
  }, [matched]);

  return (
    <div className="app">
      <Header />
      <p>
        {moves} <strong>moves</strong>
      </p>

      <div className="cards">
        {doublePokemon.map((pokemon, index) => {
          let isFlipped = false;

          // do some logic to check if flipped
          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.id)) isFlipped = true;

          return (
            <PokemonCard
              key={index}
              index={index}
              pokemon={pokemon}
              isFlipped={isFlipped}
              flipCard={flipCard}
            />
          );
        })}
      </div>
    </div>
  );
}

function PokemonCard({ index, pokemon, isFlipped, flipCard }) {
  return (
    <button
      className={`pokemon-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => flipCard(index)}
    >
      <div className="inner">
        <div className="front">
          <img src={`${pokemon.link}`} alt={pokemon.name} width="100" />
        </div>
        <div className="back">?</div>
      </div>
    </button>
  );
}
