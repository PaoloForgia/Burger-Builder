import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = props => {
  const [isSideDrawerVisible, setSideDrawerVisible] = useState(false);

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisible(!isSideDrawerVisible);
  };

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisible(false);
  };

  return (
    <React.Fragment>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={props.isAuth}
      />
      <SideDrawer
        open={isSideDrawerVisible}
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuth}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
