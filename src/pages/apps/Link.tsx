import { useForm } from "react-hook-form";
import { FaArrowLeft, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link as LinkModel } from "../../apis/models/link";
import {
  linkDestroyApi,
  linkIndexApi,
  linkStoreApi,
  linkUpdateApi,
} from "../../apis/endpoints/links";
import moment from "moment";
import Modal from "bootstrap/js/dist/modal";
import useApi from "../../apis/api";
import toast from "react-hot-toast";

const Link = ({ back }: { back: () => void }) => {
  const [modal, setModal] = useState<Modal | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LinkModel>();

  const linkIndex = useApi({
    api: linkIndexApi,
  });

  const linkStore = useApi({
    api: linkStoreApi,
    onSuccess: () => {
      modal?.hide();
      linkIndex.process({});
      reset();
    },
  });

  const linkUpdate = useApi({
    api: linkUpdateApi,
    onSuccess: () => {
      modal?.hide();
      linkIndex.process({});
      reset();
    },
  });

  const linkDestroy = useApi({
    api: linkDestroyApi,
    onSuccess: () => {
      linkIndex.process({});
    },
  });

  const onSubmit = (data: LinkModel) => {
    toast.promise((data.id ? linkUpdate : linkStore).process(data), {
      loading: "Loading...",
      success: "Berhasil Menyimpan",
      error: "Gagal Menyimpan",
    });
  };

  const onDelete = (id: number) => {
    const isConfirmed = confirm("Apa Yakin Akan menghappus id?");
    if (!isConfirmed) return;

    toast.promise(linkDestroy.process(id), {
      loading: "Loading...",
      success: "Berhasil Menghapus",
      error: "Gagal Menghapus",
    });
  };

  useEffect(() => {
    const modalElement = document.getElementById("exampleModal1");
    // @ts-ignore
    const modalInstance = new Modal(modalElement);
    setModal(modalInstance);

    linkIndex.process({});
  }, []);

  return (
    <>
      <div
        style={{
          borderRadius: "12px",
          height: "90vh",
          overflow: "hidden",
          background: "#eee",
        }}
        className="position-relative w-100"
      >
        <div className="app-header text-black p-3">
          <h5 style={{ margin: 0, padding: 0 }}>Daftar Link</h5>
        </div>

        <div
          style={{ height: "100%", overflowY: "auto", padding: "85px 0" }}
          className="w-100"
        >
          {linkIndex.data?.map((link) => (
            <div
              onClick={() => {
                reset(link);
                modal?.show();
              }}
              style={{ borderRadius: "8px" }}
              className="a-menu mx-3 mb-2"
            >
              <div>
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  src={
                    `${import.meta.env.VITE_BACKEND_URL}`.replace("/api", "") +
                    "/storage/icons/" +
                    link.icon
                  }
                  alt=""
                />
              </div>
              <div className="w-100">
                <div className="w-100 d-flex justify-content-between">
                  <h6 style={{ margin: 0, padding: 0 }}>{link.title}</h6>

                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "normal",
                      opacity: "50%",
                    }}
                  >
                    {moment(link.created_at).format("DD MMMM YYYY")}
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "normal",
                      opacity: "50%",
                    }}
                  >
                    {link.link}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(link.id);
                    }}
                    className="trash"
                    style={{ borderRadius: "8px" }}
                  >
                    <FaRegTrashAlt />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="create-btn text-primary p-3">
          <div onClick={() => back()} className="back">
            <FaArrowLeft style={{ fontSize: "24px" }} />
          </div>
          <div
            className="plus"
            onClick={() => {
              reset({
                id: undefined,
                created_at: "",
                description: "",
                icon: "",
                link: "",
                title: "",
                updated_at: "",
              });
              modal?.show();
            }}
          >
            <FaPencilAlt style={{ fontSize: "24px" }} />
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-black" id="exampleModalLabel">
                {watch("id") ? "Edit" : "Tambah"} Link
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => modal?.hide()}
              ></button>
            </div>
            <div className="modal-body text-black">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Tipe */}
                <div className="mb-3">
                  <label htmlFor="icon" className="form-label">
                    Tipe
                  </label>
                  <input
                    id="icon"
                    type="file"
                    accept="image/*"
                    multiple={false}
                    className={`form-control ${
                      errors.icon ? "is-invalid" : ""
                    }`}
                    {...register("icon")}
                  />
                  {errors.icon && (
                    <div className="invalid-feedback">
                      {errors.icon.message}
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    {...register("title", { required: "Wajid Diisi" })}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">
                      {errors.title.message}
                    </div>
                  )}
                </div>

                {/* Link */}
                <div className="mb-3">
                  <label htmlFor="link" className="form-label">
                    Link
                  </label>
                  <input
                    id="link"
                    type="text"
                    className={`form-control ${
                      errors.link ? "is-invalid" : ""
                    }`}
                    {...register("link", { required: "Wajid Diisi" })}
                  />
                  {errors.link && (
                    <div className="invalid-feedback">
                      {errors.link.message}
                    </div>
                  )}
                </div>

                {/* Deskripsi */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Deskripsi
                  </label>
                  <textarea
                    id="description"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    placeholder="Deskripsi Link"
                    {...register("description")}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description.message}
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => modal?.hide()}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Link;
