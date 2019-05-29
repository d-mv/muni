import React from "react";
import { Provider } from "react-redux";
import { render, cleanup } from "react-testing-library";
import { createStore, combineReducers, applyMiddleware } from "redux";
  const rootReducer = combineReducers({});

const renderComponent = (props: {store:any, component:any}) => {
  const store = createStore(rootReducer, props.store);

  return render(<Provider store={store}>{props.component}</Provider>);
};

export default renderComponent;
