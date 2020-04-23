import React, { useState, useEffect } from "react";
import axios from "axios";
import BoostrapTable from "react-bootstrap-table-next";
import PaginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBoostrap from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
const App = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPlayers = async () => {
    try {
      const data = await axios.get(
        "https://nba-players.herokuapp.com/players-stats"
      );
      console.log(data);
      setPlayers(data.data);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const columns = [
    {
      dataField: "name",
      text: "Player Name",
    },
    {
      dataField: "points_per_game",
      text: "Points For Game",
    },
    {
      dataField: "team_name",
      text: "Team Name",
    },
  ];
  useEffect(() => {
    getPlayers();
  }, []);
  return (
    <div>
      <h3>Pagination with Third Party API....</h3>
      <br />
      <br />
      {loading ? (
        <BoostrapTable
          keyField="name"
          data={players}
          columns={columns}
          pagination={paginationFactory()}
        />
      ) : (
        <ReactBoostrap.Spinner animation="border" />
      )}
    </div>
  );
};

export default App;
