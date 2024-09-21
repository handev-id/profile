import "./components.css";

const Menus = ({ menu }: { menu: number }) => {
  return (
    <div className="menus">
      <div className={`menu py-4 ${menu === 1 ? "active" : ""}`}>
        <i className="fa-solid fa-user"></i>
      </div>
      <div className={`menu py-4 ${menu === 2 ? "active" : ""}`}>
        <i className="fa-solid fa-code"></i>
      </div>
      <div className={`menu py-4 ${menu === 3 ? "active" : ""}`}>
        <i className="fa-solid fa-diagram-project"></i>
      </div>
      <div className={`menu py-4 ${menu === 4 ? "active" : ""}`}>
        <i className="fa-solid fa-file-lines"></i>
      </div>
    </div>
  );
};

export default Menus;
