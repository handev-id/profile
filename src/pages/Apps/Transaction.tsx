import { useForm } from "react-hook-form";
import { FaArrowLeft, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Transaction as TransactionModel } from "../../apis/models/transaction";
import { useEffect, useState } from "react";
import {
  transactionDestroyApi,
  transactionIndexApi,
  TransactionParams,
  transactionStoreApi,
  transactionUpdateApi,
} from "../../apis/endpoints/transactions";
import { IoArrowRedo, IoArrowUndoSharp } from "react-icons/io5";
import useApi from "../../apis/api";
import toast from "react-hot-toast";
import moment from "moment";
import Modal from "bootstrap/js/dist/modal";

const Transaction = ({ back }: { back: () => void }) => {
  const [modal, setModal] = useState<Modal | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TransactionModel>();

  const {
    register: registerParams,
    reset: resetParams,
    watch: watchParams,
    setValue: setValueParams,
  } = useForm<TransactionParams>();

  const transactionIndex = useApi({
    api: transactionIndexApi,
  });

  const transactionStore = useApi({
    api: transactionStoreApi,
    onSuccess: () => {
      reset();
      transactionIndex.process({ ...watchParams() });
      modal?.hide();
    },
  });

  const transactionUpdate = useApi({
    api: transactionUpdateApi,
    onSuccess: () => {
      reset();
      transactionIndex.process({ ...watchParams() });
      modal?.hide();
    },
  });

  const transactionDestroy = useApi({
    api: transactionDestroyApi,
    onSuccess: () => {
      transactionIndex.process({ ...watchParams() });
    },
  });

  const onSubmit = (data: TransactionModel) => {
    toast.promise(
      (data.id ? transactionUpdate : transactionStore).process(data),
      {
        loading: "Loading...",
        success: "Berhasil Menyimpan",
        error: "Gagal Menyimpan",
      }
    );
  };

  const onDelete = (id: number) => {
    const isConfirmed = confirm("Apa Yakin Akan menghappus id?");
    if (!isConfirmed) return;

    toast.promise(transactionDestroy.process(id), {
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

    transactionIndex.process({});
  }, []);

  useEffect(() => {
    const subscription = watchParams((values) => {
      transactionIndex.process({ ...values });
    });

    return () => {
      subscription.unsubscribe();
      resetParams();
    };
  }, [watchParams]);

  useEffect(() => {
    if (transactionIndex.isLoading) {
      toast.loading("Loading...", { id: "load" });
    } else {
      toast.remove("load");
    }
  }, [transactionIndex.isLoading]);

  const currentYear = moment().year();
  const months = Array.from({ length: 12 }, (_, i) =>
    moment({ year: currentYear, month: i })
  );

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
        <div className="app-header p-3">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Tab") {
                setValueParams("category", e.currentTarget.value);
              }
            }}
            onBlur={(e) => {
              if (window.innerWidth < 1024) {
                setValueParams("category", e.currentTarget.value);
              }
            }}
            type="text"
            className="form-control"
            placeholder="Category"
          />
          <input
            {...registerParams("date")}
            type="date"
            className="form-control"
          />
          <select
            {...registerParams("type")}
            className="form-select"
            aria-label="Pilih Tipe"
          >
            <option value="" selected>
              All Type
            </option>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        <div
          style={{ height: "100%", overflowY: "auto", padding: "85px 0" }}
          className="w-100"
        >
          {transactionIndex.data?.map((trans) => (
            <div
              key={trans.id}
              onClick={() => {
                reset(trans);
                modal?.show();
              }}
              style={{ borderRadius: "8px" }}
              className="a-menu mx-3 mb-2"
            >
              <div className={`icon ${trans.type}`}>
                {trans.type === "income" ? (
                  <IoArrowRedo />
                ) : (
                  <IoArrowUndoSharp />
                )}
              </div>
              <div className="w-100">
                <div className="w-100 d-flex justify-content-between">
                  <h6 style={{ margin: 0, padding: 0 }}>
                    Rp. {trans.amount.toLocaleString()}
                  </h6>

                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "normal",
                      opacity: "50%",
                    }}
                  >
                    {moment(trans.transaction_date).format("DD MMMM YYYY")}
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
                    {trans.category}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(trans.id);
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
          <div>
            <select
              {...registerParams("month")}
              className="form-select"
              aria-label="Select bulan"
            >
              <option value="" selected>
                All Month
              </option>
              {months.map((month, idx) => (
                <option key={idx} value={month.format("YYYY-MM")}>
                  {month.format("MMMM YYYY")}
                </option>
              ))}
            </select>
          </div>
          <div
            onClick={() => {
              reset({
                id: undefined,
                amount: 0,
                category: "",
                created_at: undefined,
                description: "",
                transaction_date: "",
                type: "income",
                updated_at: "",
              });
              modal?.show();
            }}
            className="plus"
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
                {watch("id") ? "Edit" : "Tambah"} Transaksi
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-black">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Tipe */}
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Tipe
                  </label>
                  <select
                    id="type"
                    className={`form-select ${errors.type ? "is-invalid" : ""}`}
                    {...register("type", { required: "Tipe wajib dipilih" })}
                  >
                    <option value="" disabled>
                      Type
                    </option>
                    <option value="income">Pemasukan</option>
                    <option value="expense">Pengeluaran</option>
                  </select>
                  {errors.type && (
                    <div className="invalid-feedback">
                      {errors.type.message}
                    </div>
                  )}
                </div>

                {/* Jumlah */}
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Jumlah
                  </label>
                  <input
                    id="amount"
                    type="number"
                    className={`form-control ${
                      errors.amount ? "is-invalid" : ""
                    }`}
                    placeholder="Masukkan Jumlah Pemasukan atau Pengeluaran"
                    {...register("amount", {
                      required: "Jumlah wajib diisi",
                      valueAsNumber: true,
                      min: { value: 1, message: "Jumlah harus lebih dari 0" },
                    })}
                  />
                  {errors.amount && (
                    <div className="invalid-feedback">
                      {errors.amount.message}
                    </div>
                  )}
                </div>

                {/* Kategori */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Kategori
                  </label>
                  <input
                    id="category"
                    type="text"
                    className={`form-control ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    placeholder="Masukkan Kategori"
                    {...register("category", {
                      required: "Kategori wajib diisi",
                    })}
                  />
                  {errors.category && (
                    <div className="invalid-feedback">
                      {errors.category.message}
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
                    placeholder="Deskripsi Transaksi"
                    {...register("description")}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description.message}
                    </div>
                  )}
                </div>

                {/* Tanggal */}
                <div className="mb-3">
                  <label htmlFor="transaction_date" className="form-label">
                    Tanggal Transaksi
                  </label>
                  <input
                    id="transaction_date"
                    type="date"
                    className={`form-control ${
                      errors.transaction_date ? "is-invalid" : ""
                    }`}
                    {...register("transaction_date", {
                      required: "Tanggal wajib diisi",
                    })}
                  />
                  {errors.transaction_date && (
                    <div className="invalid-feedback">
                      {errors.transaction_date.message}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
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

export default Transaction;
