import { useState } from "react";
import Menus from "../components/Menus";
import Portofolio from "../components/Portofolio";
import Profile from "../components/Profile";
import Skills from "../components/Skills";
import Summary from "../components/Summary";

const Home = () => {
    const [menu, setMenu] = useState(1);
    return (
      <>
        <section className="home" id="home">
          {menu === 1 ? (
            <Profile />
          ) : menu === 2 ? (
            <Skills />
          ) : menu === 3 ? (
            <Portofolio />
          ) : (
            <Summary />
          )}
          <Menus menu={menu} setMenu={setMenu} />
        </section>
      </>
    );
}

export default Home