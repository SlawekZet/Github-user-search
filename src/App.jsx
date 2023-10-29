import { useEffect, useState } from "react";
import "./App.css";
import { ProfileCard } from "./components/ProfileCard/ProfileCard";

function App() {
  const [theme, setTheme] = useState("light");
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isUserFound, setIsUserFound] = useState(true);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    // zmiana theme na bazie data attribute w CSS
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (username) {
      // eslint-disable-next-line no-inner-declarations
      async function fetchUserData(username) {
        try {
          // Autoryzacja githuba, bo wykorzystałem wszystkie darmowe zapytania
          const token = "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";
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await fetch(
            `https://api.github.com/users/${username}`,
            {
              method: "GET",
              headers: headers,
            }
          );
          if (response.status === 404) {
            setIsUserFound(false);
          } else if (!response.ok) {
            throw new Error("Invalid response from the network");
          }
          const data = await response.json();
          setIsUserFound(true);
          setUserData(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error getting the data:", error);
        }
      }
      fetchUserData(username);
    }
  }, [username]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setUsername(inputValue);
  };

  return (
    <>
      <main>
        <div className="upper-bar">
          <p className="logotype">devfinder</p>
          <button className="theme-switcher" onClick={handleThemeSwitch}>
            {theme === "light" ? (
              <>
                <p className="theme-name">Dark</p>
                <img
                  src="./icon-moon.svg"
                  alt="icon of a moon"
                  className="theme-icon"
                />
              </>
            ) : (
              <>
                <p className="theme-name">Light</p>
                <img
                  src="./icon-sun.svg"
                  alt="icon of a sun"
                  className="theme-icon"
                />
              </>
            )}
          </button>
        </div>
        {/* Search Bar - można wyciągnąć jako zewnętrzny komponent, ale to zadanie na później (dwustronna komunikacja propsów) */}
        <div className="search-bar-wrapper">
          <form className="search-bar-input">
            <img
              src="./icon-search.svg"
              alt="ison of a spyglass"
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search GitHub username..."
              className="search-bar-input-field"
              value={inputValue}
              onChange={handleChange}
            />
            <input
              type="submit"
              onClick={handleSearchClick}
              className="search-button"
              value="Search"
            />
          </form>
        </div>
        {userData ? (
          isLoading === true ? (
            <p>Searching...</p>
          ) : isUserFound === false ? (
            <p>User not found</p>
          ) : (
            <ProfileCard userData={userData} />
          )
        ) : null}
      </main>
    </>
  );
}

export default App;
