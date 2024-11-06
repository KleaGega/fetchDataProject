
import React from "react";
const Table = ({ currentPosts }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Language</th>
            <th>Name</th>
            <th>Watchers</th>
            <th>Stars</th>
            <th>URL</th>
            <th>Updated At</th>
            <th>Created At</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item) => (
            <tr key={item.id}>
              <td>{item.language}</td>
              <td>{item.name}</td>
              <td>{item.watchers}</td>
              <td>{item.stargazers_count}</td>
              <td>
                <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                  Shiko Repositorin
                </a>
              </td>
              <td>{new Date(item.updated_at).toLocaleDateString()}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
