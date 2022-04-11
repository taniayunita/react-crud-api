import React, { useState, useEffect } from "react";
import axios from "axios";
import * as AiIcon from "react-icons/ai";
import * as FaIcon from "react-icons/fa";
import * as MdIcon from "react-icons/md";
import swal from "sweetalert";
import { Modal } from "bootstrap";

const getUrl = "https://sneakersauction.000webhostapp.com/api/user/getUser";
const editUrl = "https://sneakersauction.000webhostapp.com/api/user/getUser2/";
const deleteUrl = "https://sneakersauction.000webhostapp.com/api/user/deleteUser/";
const postUrl = "https://sneakersauction.000webhostapp.com/api/register";

const TableComponent = () => {
  const [user, setUser] = useState([]);
  const [flagModal, setflagModal] = useState(false);
  const [modalData, setModalData] = useState({
    nama: "",
    email: "",
    password: "",
    no_telp: "",
    tanggal_lahir: "",
  });

  useEffect(() => {
    axios.get(getUrl).then((res) => {
      setUser(res.data.data);
    });
  }, [user]);

  useEffect(() => {
    var myModalEl = document.getElementById("exampleModal");
    myModalEl.addEventListener("hidden.bs.modal", function (event) {
      setflagModal(false);
      setModalData({});
    });
  }, []);

  const handleChange = (e) => {
    let data = { ...modalData };
    data[e.target.name] = e.target.value;
    setModalData(data);
    console.log(data);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let data = {...modalData};
    //nama : modalData.nama, email : modalData.email, password : modalData.password, no_telp: modalData.no_telp, tanggal_lahir : modalData.tanggal_lahir
    data[e.target.name] = e.target.value;
    setModalData(data);

    axios.post(postUrl, {data })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
  }

  const handleEdit = (e) => {
    const path = editUrl + e.target.id;
    const myModal = new Modal(document.getElementById("exampleModal"));
    axios.get(path).then((res) => {
      myModal.show();
      var response = res.data;
      const { tanggal_lahir, no_telp, password, email, nama } =
        response.data[0];
      setflagModal(true);
      setModalData({ tanggal_lahir, no_telp, password, email, nama });
      console.log("data yang di edit :", response.data[0]);
    });
  };

  const handleDelete = (e) => {
    const confirm = window.confirm("Yakin akan menghapus data?", e.target.id);
    console.log("id data yang di delete :" + e.target.id);
    const path = deleteUrl + e.target.id;
    if (confirm) {
      axios
        .get(path)
        .then((res) => {
          if (res.data.status === true) {
            swal("Berhasil", "User telah dihapus", "success");
          }
        })
        .catch((err) => {
          swal("Ooops!", "terjadi masalah, coba ulang kembali", "error");
        });
    }
  };

  return (
    <>
      <div className="container-sm">
        <p className="text-center fs-3 fw-bold pt-4">Data Users</p>
        <div className="pb-2">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <span>
              <AiIcon.AiOutlinePlus
                style={{ fontSize: "1.5rem", paddingBottom: "0.5px" }}
              />
            </span>
            add user
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col" className="text-center">
                  Nama
                </th>
                <th scope="col" className="text-center">
                  Email
                </th>
                <th scope="col" className="text-center">
                  Nomor Telepon/HP
                </th>
                <th scope="col" className="text-center">
                  Tanggal Lahir
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {user.length > 0 ? (
                user.map((users, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{users.user_id}</th>
                      <td>{users.nama}</td>
                      <td>{users.email}</td>
                      <td>{users.no_telp}</td>
                      <td>{users.tanggal_lahir}</td>
                      <td>
                        <div className="d-flex">
                          <button
                            id={users.user_id}
                            type="button"
                            className="btn btn-primary me-2"
                            onClick={handleEdit}
                          >
                            <span>
                              <FaIcon.FaEdit
                                style={{
                                  fontSize: "1rem",
                                  paddingBottom: "3px",
                                }}
                              />
                            </span>
                            edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete}
                            id={users.user_id}
                          >
                            <span>
                              <MdIcon.MdDelete
                                style={{
                                  fontSize: "1.2rem",
                                  paddingBottom: "0.5px",
                                }}
                              />
                            </span>
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colspan="6" className="text-center">
                    Tidak ada data, silahkan add user!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {flagModal ? "Edit user" : "Add user"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label for="Nama" className="form-label">
                  Nama
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Nama"
                  placeholder="Nama"
                  value={modalData.nama}
                  name="nama"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="name@example.com"
                  value={modalData.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              {flagModal ? null : (
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Password"
                      value={modalData.password}
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label for="noTelp" className="form-label">
                  No Telp/HP
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="noTelp"
                  placeholder="nomor telepon/hp"
                  required
                  value={modalData.no_telp}
                  name="no_telp"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label for="tglLahir" className="form-label">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="tglLahir"
                  required
                  value={modalData.tanggal_lahir}
                  name="tanggal_lahir"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              {flagModal ? (
                <button type="button" className="btn btn-primary">
                  edit user
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAdd}
                >
                  add user
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
