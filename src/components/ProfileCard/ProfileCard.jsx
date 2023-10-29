/* eslint-disable react/prop-types */

import "./ProfileCard.css";

export const ProfileCard = ({ userData }) => {
  //Sprawdza, czy html wyciagnięty z Github API ma https:// albo http:// (bez tego liki lądują w local host)
  const blogChecker = (url) => {
    if (url.includes("https://")) {
      return url;
    } else if (url.includes("http://")) {
      return url;
    } else {
      return `https://${url}`;
    }
  };

  // Sprawdza, czy są dane z API, jeżeli nie, to pokazuje "Not Available"

  const ifAvailableChecker = (data) => {
    return data ? data : "Not Available";
  };

  // Sprawdza, czy są dane z API, jeżeli nie, ustawia klasę unavailable

  const ifAvailableStylesChecker = (data) => {
    return data ? "address" : "address unavailable";
  };

  // Sprawdza, czy pobraliśmy dane z API i czy można je wyświetlić, jeżeli nie, to komunikat o nieznalezieniu usera

  if (!userData) {
    return <p>User Not Found </p>;
  }

  const joinDate = userData.created_at
    ? userData.created_at.slice(0, 10)
    : "Not Available";

  return (
    <>
      <div className="profile-card-wrapper">
        <img
          src={userData.avatar_url}
          alt="avatar of an user"
          className="user-avatar"
        />
        <div className="user-data-wrapper">
          <div className="user-name-joining-date">
            <h2>{userData.name}</h2>
            <div className="join-date">
              <p className="join-text primary">Joined at</p>
              <p className="join-date primary">{joinDate}</p>
            </div>
          </div>
          <p className="username">@{userData.login}</p>
          <p className="user-bio primary unavailable">{userData.bio}</p>
          <div className="github-stats-wrapper">
            <div className="stats">
              <p className="stat-header">Repos</p>
              <p className="stat">{userData.public_repos}</p>
            </div>
            <div className="stats">
              <p className="stat-header">Followers</p>
              <p className="stat">{userData.followers}</p>
            </div>
            <div className="stats">
              <p className="stat-header">Following</p>
              <p className="stat">{userData.following}</p>
            </div>
          </div>
          <div className="addresses-wrapper">
            <div className={ifAvailableStylesChecker(userData.location)}>
              <img
                src="./icon-location.svg"
                alt="icon of geo location pin"
                className="addresses-icon"
              />
              <p className="primary available">
                {ifAvailableChecker(userData.location)}
              </p>
            </div>
            <div
              className={ifAvailableStylesChecker(userData.twitter_username)}
            >
              <img
                src="./icon-twitter.svg"
                alt="icon of twitter"
                className="addresses-icon"
              />
              <p className="primary ">
                {ifAvailableChecker(userData.twitter_username)}
              </p>
            </div>
            <div className={ifAvailableStylesChecker(userData.blog)}>
              <img
                src="./icon-website.svg"
                alt="icon of website link"
                className="addresses-icon"
              />
              {userData.blog ? (
                <a
                  href={blogChecker(userData.blog)}
                  className="primary available"
                  target="_blank"
                  rel="noreferrer"
                >
                  {userData.blog}
                </a>
              ) : (
                <p>Not Available</p>
              )}
            </div>
            <div className={ifAvailableStylesChecker(userData.company)}>
              <img
                src="./icon-company.svg"
                alt="icon of office building"
                className="addresses-icon"
              />
              <p className="primary available">
                {ifAvailableChecker(userData.company)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
