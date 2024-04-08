import { Link } from "react-router-dom";
import Logo from "../../assets/Happy_Meal.png";
import { List } from "./List";
import { SearchBar } from "./SearchBar";
export const Header = () => {
  return (
    <>
      <header>
        <div className="border-b-2 border-primary">
          <div className="flex justify-between items-center p-4 container">
            <SearchBar />
            <img className="w-24" src={Logo} alt="logo" />
            <List />
          </div>
        </div>
      </header>
      <nav className="sticky top-0 p-4">
        <ul className="flex gap-20 items-center justify-center">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/">Recettes</Link>
          </li>
          <li>
            <Link to="/">Favoris</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
