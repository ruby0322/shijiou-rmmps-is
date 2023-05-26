// const Home = () => {
//   return <div>Home</div>;
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/foh">桌況</Link>
        </li>
        <li>
          <Link to="/menu">菜單</Link>
        </li>
        <li>
          <Link to="/menu-dashboard">菜單儀表板</Link>
        </li>
        <li>
          <Link to="/waiting-list-dashboard">等待名單儀表板</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
