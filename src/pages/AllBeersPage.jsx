import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllBeersPage() {
  const [beers, setBeers] = useState([]);

  const [fetching, setfetching] = useState(true);

  useEffect(() => {
    console.log("useEffect - Initial render (Mounting)");
    axios
      .get("https://ih-beers-api2.herokuapp.com/beers")
      .then((response) => {
        setBeers(response.data);
        console.log("response.data: ", response.data);
        setfetching(false);
      })
      .catch((error) => {
        console.error("Error fetching biers data:", error);
        setfetching(false);
      });
  }, []);

  return (
    <div>
      {fetching ? (
        <p>Loading</p>
      ) : (
        beers.map((beer) => {
          return (
            <div key={beer._id} className="allbeerspage">
              <img
                src={beer.image_url}
                alt={beer.name}
                className="allbeerspage-image"
              />
              <div className="allbeerspage-text">
                <Link to={`/beers/${beer._id}`}>
                  <h1 className="allbeerspage-name">{beer.name}</h1>
                </Link>

                <h2 className="allbeerspage-tagline">{beer.tagline}</h2>
                <p className="allbeerspage-contributed-by">
                  Created by: {beer.contributed_by}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default AllBeersPage;
