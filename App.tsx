import React  from "react";
import store from "./src/redux/stores";
import { Provider } from "react-redux";
import HomeScreen from "./src/screens/homeScreen";

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen/>
    </Provider>
  );
};

export default App;
