import React from "react";

export default function List({ data, handleDelete, handleEdit }) {
  return (
    <div className="list-group">
      {data.length > 0 ? (
        data.map((contact) => {
          return (
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{contact.name}</h5>
                <div>
                  <button
                    className="btn btn-sm btn-link"
                    onClick={() => handleEdit(contact.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-link"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Del
                  </button>
                </div>
              </div>
              <p className="mb-1">{contact.telp}</p>
            </div>
          );
        })
      ) : (
        <div>
          <p className="fs-3 fw-bold text-center">Tidak ada data..</p>
          <p className="text-center">silahkan tambah data baru!</p>
        </div>
      )}
    </div>
  );
}
