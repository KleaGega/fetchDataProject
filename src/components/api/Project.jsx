import React, { useEffect, useState } from "react";
import "./project.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import useFetch from "./useFetch";
import Table from "./Table";

function Project() {
  const [languageFilter, setLanguageFilter] = useState("");
  const [starsFilter, setStarsFilter] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [watcherFilter, setWatchersFilter] = useState(0);
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const url = `https://api.github.com/search/repositories?q=created:%3E2024-11-01&sort=stars&order=desc`;

  const { data, filteredData, error, loading, setFilteredData } = useFetch(url);

  const totalPages = Math.ceil(filteredData.length / postsPerPage);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesLanguage = item.language
        ?.toLowerCase()
        .includes(languageFilter.toLowerCase());
      const matchesStars = item.stargazers_count >= parseInt(starsFilter, 10);
      const matchesName = item.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesWatcher = item.watchers >= parseInt(watcherFilter, 10);
      return matchesLanguage && matchesStars && matchesName && matchesWatcher;
    });

    setFilteredData(filtered);
    localStorage.setItem("filteredData", JSON.stringify(filtered));
  }, [languageFilter, starsFilter, nameFilter, watcherFilter, data, setFilteredData]);

  const sortByStars = () => {
    const newSortDirection = sortDirection === "desc" ? "asc" : "desc";
    const sortedData = [...filteredData].sort((a, b) => {
      return newSortDirection === "desc"
        ? b.stargazers_count - a.stargazers_count
        : a.stargazers_count - b.stargazers_count;
    });

    setSortDirection(newSortDirection);
    setFilteredData(sortedData);
  };

  const decrement = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const increment = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  if (error) {
    return (
      <div>
        <p>Gabim: {error}</p>
        <button onClick={() => window.location.reload()}>Riprovo</button>
      </div>
    );
  }

  return (
    <div className="container_rep">
      <h1>Repository language</h1>
      <div className="inputs">
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="search-input"
        >
          <option value="">Zgjidh Gjuha</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C#">C#</option>
          <option value="Kotlin">Kotlin</option>
          <option value="Shell">Shell</option>
          <option value="Ruby">Ruby</option>
          <option value="Swift">Swift</option>
          <option value="TypeScript">TypeScript</option>
        </select>
        <input
          type="number"
          placeholder="Minimum Stars"
          value={starsFilter}
          onChange={(e) => setStarsFilter(parseInt(e.target.value, 10) || 0)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Kërko sipas emrit"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Kërko sipas watcherit"
          value={watcherFilter}
          onChange={(e) => setWatchersFilter(parseInt(e.target.value, 10) || 0)}
          className="search-input"
        />
        <FontAwesomeIcon icon={faSort} onClick={sortByStars} className="sort" />
      </div>
      {loading ? (
        <p>Duke ngarkuar...</p>
      ) : currentPosts.length === 0 ? (
        <p>No language found</p>
      ) : (
        <Table currentPosts={currentPosts} />
      )}
      <button disabled={currentPage === 1 ? true : false} onClick={decrement}>
        PREVIOUS
      </button>
      <button disabled={currentPage === totalPages ? true : false} onClick={increment}>
        NEXT
      </button>
    </div>
  );
}

export default Project;
