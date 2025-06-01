import { FormEvent, useEffect, useState } from "react";
import Modal from "bootstrap/js/dist/modal";
import useApi from "../../apis/api";
import { checkPinApi } from "../../apis/endpoints/pin";
import toast from "react-hot-toast";
import service from "../../apis/axios";
import { FaLink, FaMoneyBillAlt } from "react-icons/fa";
import Transaction from "./Transaction";
import Link from "./Link";

const menuItems = [
  { title: "Link", icon: <FaLink />, href: "#link" },
  { title: "Transaksi", icon: <FaMoneyBillAlt />, href: "#transaction" },
];

const Apps = () => {
  const [pin, setPin] = useState<string | undefined>(undefined);
  const [modal, setModal] = useState<Modal | null>(null);
  const [activeApp, setActiveApp] = useState("");

  const checkPin = useApi({
    api: checkPinApi,
    onSuccess: (data) => {
      modal?.hide();
      if (data?.token) {
        localStorage.setItem("token", data.token);
        service.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      }
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pin) {
      return;
    }

    toast.promise(checkPin.process(pin), {
      loading: "Loading...",
      success: "Berhasil Masuk",
      error: "Gagal Masuk",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (modal && !token) {
      modal.show();
    }

    if (token) {
      service.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [modal]);

  useEffect(() => {
    const modalElement = document.getElementById("exampleModal");
    // @ts-ignore
    const modalInstance = new Modal(modalElement, {
      backdrop: "static", // ← Ini mencegah modal tertutup saat klik area luar
      keyboard: false, // (Opsional) Mencegah close saat tekan ESC
    });
    setModal(modalInstance);
  }, []);

  return (
    <div className="app-container p-2">
      {activeApp === "#transaction" ? (
        <Transaction back={() =>setActiveApp("")} />
      ) : activeApp === "#link" ? (
        <Link back={() => setActiveApp("")} />
      ) : (
        <ul className="list-unstyled">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-3">
              <a
                id="app-menu"
                onClick={() => setActiveApp(item.href)}
                href={item.href}
                style={{ borderRadius: "10px" }}
                className="d-flex align-items-center py-2 px-4 text-decoration-none text-dark"
              >
                <span className="me-2" style={{ fontSize: "1.2rem" }}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Masukkan Pin
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
                <input
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  autoFocus
                  placeholder="Masukkan Pin"
                  type="number"
                  className="text-center form-control w-100"
                />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
