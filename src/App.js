import React from "react";
import { useDispatch } from "react-redux";
import Routing from "./Router/Routing";
import useSyncLoans from "./Components/Syncronization/useSyncLoans";

function App() {
  const dispatch = useDispatch();
  useSyncLoans(dispatch);

  return <Routing />;
}

export default App;
