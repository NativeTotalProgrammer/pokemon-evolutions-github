import '../sass/Card.scss';

export const Card = (propsData) => {
  const {pokemonName, pokemonImage} = propsData;
  return(
    <div className="card">
      <p className="card__name">{pokemonName}</p>
      <div className="card__circle"></div>
      <img className="card__img" src={pokemonImage} alt="pokemon img" />
    </div>
  );
};