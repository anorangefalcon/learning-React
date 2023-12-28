import { logoURL } from "../../constants";

const Navbar = ({ searchText, setSearchValue }) => {
  const logo = <img className="logo" src={logoURL} alt="logo" />;

  const Search = () => {
    return (
      <>
        <input
          type="text"
          name="search"
          className="search-bar"
          placeholder="Search..."
          value={searchText}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          autoFocus={true}
        />
      </>
    );
  };

  const navigation = (
    <ul className="navigation">
      <li>
        <Search />
      </li>
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  );

  return (
    <header>
      <nav className="container">
        {logo}
        {navigation}
      </nav>
    </header>
  );
};

export default Navbar;
