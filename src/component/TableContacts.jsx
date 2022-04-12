import React from "react";
import * as MdIcon from "react-icons/md";
import * as FaIcon from "react-icons/fa";

export default function TableContacts({ data, handleDelete, handleEdit }) {
  return (
    <div className="table-responsive">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              No
            </th>
            <th scope="col" className="text-center">
              Nama
            </th>
            <th scope="col" className="text-center">
              No Telepon/HP
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{contact.name}</td>
                <td>{contact.telp}</td>
                <td>
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={() => handleEdit(contact.id)}
                    ><span>
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
                      onClick={() => handleDelete(contact.id)}
                    ><span>
                    <MdIcon.MdDelete
                      style={{
                        fontSize: "1.2rem",
                        paddingBottom: "0.8px",
                      }}
                    />
                  </span>
                      delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
