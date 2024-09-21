import { useState } from "react";
import Menus from "./components/Menus";
import Profile from "./components/Profile";

const App = () => {
  const [menu, setMenu] = useState(1);
  return (
    <>
      <section className="home" id="home">
        <Profile />
      </section>
      <Menus menu={menu} />
    </>
  );
};

export default App;
