import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

const herokuUrl = "https://dulces-petalos.herokuapp.com/api/product";

function FloristeriaForm() {
  const [floresData, setfloresData] = useState<any[]>([]);
  const [searchFloresData, setSearchFloresData] = useState<any[]>([]);
  const [hasError, setHasError] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    getHerokuDataWithAxios();
  }, []);

  const getHerokuDataWithAxios = async () => {
    const response = await axios.get(herokuUrl);
    setfloresData(response.data);
  };

  function filterSearchedData(searchData: any) {
    let searchingFlowers: any[] = [];
    floresData.map((flower) => {
      if (
        flower["name"].toString().toLowerCase().includes(searchData) ||
        flower["binomialName"].toString().toLowerCase().includes(searchData)
      ) {
        searchingFlowers.push(flower);
        setHasError(false);
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById("errorMessage").innerHTML = "";
        setHasValue(true);
      }
    });

    if (searchingFlowers.length === 0) {
      setHasError(true);
    }

    setSearchFloresData(searchingFlowers);
  }

  function printAllFlowers() {
    let AllFlowers: any = floresData.map((flor) => {
      return (
        <div className="col-sm-3">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={flor["imgUrl"]}
              className="mx-auto"
              alt="..."
              style={{ width: "200px", height: "200px" }}
            />

            <div className="card-body">
              <h5 className="card-title">{flor["name"]}</h5>
              <p className="card-text">{flor["binomialName"]}</p>
              <p className="card-text">
                <small className="text-muted">{flor["price"]}€</small>
              </p>

              <Link
                to={{ pathname: "/DetallesFloristeria", state: { flor: flor } }}
                className="btn btn-primary"
              >
                Detalles
              </Link>
            </div>
          </div>
        </div>
      );
    });
    return AllFlowers;
  }

  function showErrorMessage() {
    let errorMessage = "No se ha encontrado ningúna flor con ese criterio";
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById("errorMessage").innerHTML = errorMessage;
  }

  function printSearchedFlowers() {
    if (hasError) {
      showErrorMessage();
    } else {
      let SearchedFlowers: any = searchFloresData.map((flor) => {
        return (
          <div className="col-sm-3">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={flor["imgUrl"]}
                className="mx-auto"
                alt="..."
                style={{ width: "200px", height: "200px" }}
              />

              <div className="card-body">
                <h5 className="card-title">{flor["name"]}</h5>
                <p className="card-text">{flor["binomialName"]}</p>
                <p className="card-text">
                  <small className="text-muted">{flor["price"]}€</small>
                </p>
                <Link
                  to={{
                    pathname: "/DetallesFloristeria",
                    state: { flor: flor },
                  }}
                  className="btn btn-primary"
                >
                  Detalles
                </Link>
              </div>
            </div>
          </div>
        );
      });
      return SearchedFlowers;
    }
  }

  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar aqui"
          onChange={(event) => {
            filterSearchedData(event.target.value);
          }}
        />
        <div className="input-group-append"></div>
      </div>
      <br />
      <div className="row">
        <p id="errorMessage"> </p>
        {hasValue ? printSearchedFlowers() : printAllFlowers()}
      </div>
    </div>
  );
}

export default FloristeriaForm;
