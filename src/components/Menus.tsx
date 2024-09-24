import "./components.css";

const Menus = ({
  menu,
  setMenu,
}: {
  menu: number;
  setMenu: (n: number) => void;
}) => {
  return (
    <div className="menus">
      <div
        onClick={() => setMenu(1)}
        className={`menu py-4 ${menu === 1 ? "active" : ""}`}
      >
        <i className="fa-solid fa-user"></i>
      </div>
      <div
        onClick={() => setMenu(2)}
        className={`menu py-4 ${menu === 2 ? "active" : ""}`}
      >
        <i className="fa-solid fa-code"></i>
      </div>
      <div
        onClick={() => setMenu(3)}
        className={`menu py-4 ${menu === 3 ? "active" : ""}`}
      >
        <i className="fa-solid fa-diagram-project"></i>
      </div>
      <div
        onClick={() => setMenu(4)}
        className={`menu py-4 ${menu === 4 ? "active" : ""}`}
      >
        <i className="fa-solid fa-file-lines"></i>
      </div>
    </div>
  );
};

export default Menus;
