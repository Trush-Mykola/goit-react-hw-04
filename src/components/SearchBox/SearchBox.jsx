import css from "./SearchBox.module.css";

const SearchBox = ({ value, onFilter }) => {
  return (
    <div className={css.div}>
      <p>Find contacts by name</p>
      <input type="text" value={value} onChange={(event) => onFilter(event.target.value)} />
    </div>
  );
};

export default SearchBox;
