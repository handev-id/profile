import { useEffect, useState } from "react";
import Menus from "../components/Menus";
import Portofolio from "../components/Portofolio";
import Profile from "../components/Profile";
import Skills from "../components/Skills";
import Summary from "../components/Summary";
import useApi from "../apis/api";
import { projectIndexShowApi } from "../apis/endpoints/projects";

const Home = () => {
  const [menu, setMenu] = useState(1);

  const projectIndex = useApi({
    api: projectIndexShowApi,
  });

  useEffect(() => {
    projectIndex.process({});
  }, []);

  return (
    <>
      <section className="home" id="home">
        {menu === 1 ? (
          <Profile />
        ) : menu === 2 ? (
          <Skills />
        ) : menu === 3 ? (
          <Portofolio projects={projectIndex.data || []} />
        ) : (
          <Summary projects={projectIndex.data || []} />
        )}
        <Menus menu={menu} setMenu={setMenu} />
      </section>
    </>
  );
};

export default Home;
