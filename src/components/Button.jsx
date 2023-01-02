import '../sass/Button.scss';

const Button = (props) => {
  const { icon, handleClick } = props;

  return(
    <div className='button__box'>
      <button className="button" onClick={handleClick}>{icon}</button>
      <div className='button__shadow'></div>
    </div>
  );
};

export { Button };