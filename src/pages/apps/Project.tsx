import { useForm } from "react-hook-form";
import {
  projectDestroyApi,
  projectDestroyImageApi,
  projectIndexApi,
  projectStoreApi,
  projectUpdateApi,
} from "../../apis/endpoints/projects";
import { Project as ProjectModel } from "../../apis/models/project";
import { Modal } from "bootstrap";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { IoCloseSharp } from "react-icons/io5";
import useApi from "../../apis/api";
import moment from "moment";
import toast from "react-hot-toast";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Project = ({ back }: { back: () => void }) => {
  const [modal, setModal] = useState<Modal | null>(null);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectModel>({
    defaultValues: {
      images: [],
    },
  });

  const projectIndex = useApi({
    api: projectIndexApi,
  });

  const projectStore = useApi({
    api: projectStoreApi,
    onSuccess: () => {
      projectIndex.process({});
      modal?.hide();
    },
  });

  const projectUpdate = useApi({
    api: projectUpdateApi,
    onSuccess: () => {
      projectIndex.process({});
      modal?.hide();
    },
  });

  const projectDestroy = useApi({
    api: projectDestroyApi,
    onSuccess: () => {
      projectIndex.process({});
    },
  });

  const projectDestroyImage = useApi({
    api: projectDestroyImageApi,
    onSuccess: (data) => {
      projectIndex.process({});
      setValue("images", data?.images || []);
    },
  });

  const onSubmit = (data: ProjectModel) => {
    toast.promise(
      data.id ? projectUpdate.process(data) : projectStore.process(data),
      {
        loading: "Loading...",
        success: "Berhasil Menyimpan",
        error: "Gagal Menyimpan",
      }
    );
  };

  const onDelete = (id: number) => {
    confirm("Apa Yakin Akan menghapus?") &&
      toast.promise(projectDestroy.process(id), {
        loading: "Loading...",
        success: "Berhasil Menghapus",
        error: "Gagal Menghapus",
      });
  };

  const onDeleteImage = (name: string | File) => {
    if (name instanceof File) {
      setValue(
        "images",
        watch("images").filter((image) => image !== name) as File[]
      );
      return;
    }
    confirm("Apa Yakin Akan menghapus?") &&
      toast.promise(projectDestroyImage.process({ id: watch("id"), name }), {
        loading: "Loading...",
        success: "Berhasil Menghapus",
        error: "Gagal Menghapus",
      });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue("images", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    multiple: true,
  });

  useEffect(() => {
    const modalElement = document.getElementById("exampleModal1");
    // @ts-ignore
    const modalInstance = new Modal(modalElement);
    setModal(modalInstance);

    projectIndex.process({});
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
          <h5 style={{ margin: 0, padding: 0 }}>Daftar Projek</h5>
        </div>

        <div
          style={{ height: "100%", overflowY: "auto", padding: "85px 0" }}
          className="w-100"
        >
          {projectIndex.data?.map((project) => (
            <div
              onClick={() => {
                reset(project);
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
                    "/storage/projects/" +
                    (project.images as string[])[0]
                  }
                  alt=""
                />
              </div>
              <div className="w-100">
                <div className="w-100 d-flex justify-content-between">
                  <h6 style={{ margin: 0, padding: 0 }}>{project.title}</h6>

                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "normal",
                      opacity: "50%",
                    }}
                  >
                    {moment(project.created_at).format("DD MMMM YYYY")}
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
                    {project.link}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(project.id);
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
                images: [],
                link: "",
                title: "",
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
        aria-labelledby="exampleModal1Label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-black" id="exampleModal1Label">
                {watch("id") ? "Edit" : "Tambah"} Projek
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
              <section className="mb-3">
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input {...getInputProps()} />
                  <p className="text-center">Klik Disini</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                  }}
                >
                  {(watch("images") || []).map((image) => (
                    <div className="position-relative">
                      <img
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          border: "1px solid #ccc",
                          padding: "6px",
                          borderRadius: "12px",
                        }}
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : `${import.meta.env.VITE_BACKEND_URL}`.replace(
                                "/api",
                                ""
                              ) +
                              "/storage/projects/" +
                              image
                        }
                      />
                      <div
                        onClick={() => onDeleteImage(image)}
                        style={{
                          top: 0,
                          right: 0,
                          position: "absolute",
                          background: "red",
                          opacity: "50%",
                          borderRadius: "4px",
                        }}
                      >
                        <IoCloseSharp />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="trash d-flex justify-content-end">
                  <FaArrowRightArrowLeft
                    onClick={() =>
                      setValue("images", watch("images").reverse())
                    }
                  />
                </div>
              </section>

              <form onSubmit={handleSubmit(onSubmit)}>
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

export default Project;
