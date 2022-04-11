import React from "react";
import { useState } from "react";
import { uid } from "uid";
import List from "./List";

const Contacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Tania",
      telp: "087654342",
    },
    {
      id: 2,
      name: "Yunita",
      telp: "087654342",
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    telp: "",
  });
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

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
      alert("tidak boleh ada data boleh kosong")
      return false
    }

    //pengecekan edit
    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.telp = formData.telp;
          alert("ok");
        }
      });
    } else {
      data.push({ id: uid(), name: formData.name, telp: formData.telp });
      alert("Data simpan");
    }
    //add contact
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
  };

  const handleDelete = (id) => {
    let data = [...contacts];
    let filterData = data.filter((contact) => contact.id !== id);
    setContacts(filterData);
  };
  return (
    <div className="container-sm">
      <h1 className="px-3 py-3">My Contact List</h1>

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
            type="text"
            className="form-control"
            name="telp"
            value={formData.telp}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
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
