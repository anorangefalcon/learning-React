import { logoURL } from "../../constants";
import { Link } from "react-router-dom";
import { useContext } from "react";
import searchContext from "../utils/searchContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const logo = <img className="logo" src={logoURL} alt="logo" />;
  const cartItems = useSelector((store) => store.cart.items);

  const { search, setSearch } = useContext(searchContext);

  const Search = () => {
    return (
      <>
        <input
          type="text"
          name="search"
          className="search-bar"
          placeholder="Search..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
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
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/accordian">Accordian</Link>
      </li>
      <li>
        <Link to="/cart">Cart: {cartItems.length}</Link>
      </li>
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
