import FloristeriaForm from "./AppFloristeria";
import DetallesForm from "./DetallesFloristeria";
import Menu from "./Menu";
import { Route, BrowserRouter, Switch } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu></Menu>
        <header className="App-header">
          <Switch>
            <Route path="/" component={FloristeriaForm} exact />
            <Route path="/DetallesFloristeria" component={DetallesForm} exact />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
