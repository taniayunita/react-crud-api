import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { uid } from "uid";
import List from "./TableContacts";
import swal from "sweetalert";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    telp: "",
  });
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  //get data
  useEffect(() => {
    axios.get("http://localhost:3000/contacts").then((res) => {
      console.log(res.data);
      setContacts(res?.data ?? []);
    });
  }, []);

  const handleChange = (e) => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = [...contacts];

    if (formData.name === "" || formData.telp === "") {
      alert("tidak boleh ada data boleh kosong");
      return false;
    }

    //pengecekan edit
    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.telp = formData.telp;

          let newData = { name: formData.name, telp: formData.telp };
          axios
            .put(`http://localhost:3000/contacts/${isUpdate.id}`, newData)
            .then((res) => {
              swal("Berhasil", "Data telah diperbaharui", "success");
            });
        }
      });
    } else {
      let newData = { id: uid(), name: formData.name, telp: formData.telp };
      data.push(newData);
      axios.post("http://localhost:3000/contacts", newData).then((res) => {
        swal("Berhasil", "Data telah ditambahkan", "success");
      });
    }

    setIsUpdate({ id: null, status: false });
    setContacts(data);
    setFormData({ name: "", telp: "" });
  };

  const handleEdit = (id) => {
    let data = [...contacts];

    setIsUpdate({ id: id, status: true });
    let foundData = data.find((contact) => contact.id === id);
    setFormData({ name: foundData.name, telp: foundData.telp });
    setIsUpdate({ id: id, status: true });
    console.log(formData);
    console.log(foundData);
    console.log("Data nama >>", foundData.name);
    console.log("Data Telp >>", foundData.telp);
  };

  const handleDelete = (id) => {
    let data = [...contacts];
    let filterData = data.filter((contact) => contact.id !== id);
    const message = "Yakin akan menghapus data?";
    if (confirm(message) == true) {
      axios.delete(`http://localhost:3000/contacts/${id}`).then((res) => {
        swal("Berhasil", "Data telah dihapus", "success");
      });
    } else {
      return false;
    }

    setContacts(filterData);
  };
  return (
    <div className="container-sm">
      <h1 className="px-3 py-3 text-center">Data Contact Number</h1>

      <form className="px-3 py-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telp</label>
          <input
            type="number"
            className="form-control"
            name="telp"
            value={formData.telp}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-success w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        data={contacts}
      />
    </div>
  );
};

export default Contacts;
