import { Spin } from "antd";
import { createContext, useEffect, useState } from "react";
import "./index.css";

const DEFAULT_STATE = {
  isLoading: false,
};

const LoadingContext = createContext(DEFAULT_STATE);

const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);

  useEffect(() => {
    document.querySelector("body").style.overflow = state.isLoading ? "hidden" : "auto";
  },[state.isLoading])

  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <div className="spin">
          {/* <Spin size="large" /> */}
          <img src='https://res.cloudinary.com/fpt-food/image/upload/v1639790730/ReactJS_Jira_Bugs_Clone/Curve-Loading_xkidcm.gif' alt="curve-loading.gif"/>
        </div>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
