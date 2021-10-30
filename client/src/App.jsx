import { Route, Switch } from "react-router-dom";
import WordDetails from "./components/WordDetails";
import Parent from "./components/Parent";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Parent} />
        <Route path="/word/" component={WordDetails} />
      </Switch>
    </div>
  );
};

export default App;
