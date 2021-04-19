import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

function DetallesForm({ location }: any) {
  const flor = location.state.flor;
  return (
    <div className="container">
      <div className="card align-items-center">
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
            Riegos por semana: {flor["wateringsPerWeek"]}
          </p>
          <p className="card-text">Fertilizante: {flor["fertilizerType"]}</p>
          <p className="card-text">Altura: {flor["heightInCm"]}cm</p>
          <p className="card-text">
            <small className="text-muted">{flor["price"]}€</small>
          </p>
        </div>
      </div>
      <br />
      <div className="col text-center">
        <Link to="/" className="btn btn-primary">
          Volver
        </Link>
      </div>
    </div>
  );
}

export default DetallesForm;
