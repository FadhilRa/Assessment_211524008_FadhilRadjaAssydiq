import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Colors = () => {
  const [kasir, setKasir] = useState([]);
  const [newKasir, setNewKasir] = useState({
    kodeKasir: '',
    nama: '',
    wa: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingKasirId, setEditingKasirId] = useState(null);

  useEffect(() => {
    getListKasir();
  }, []);

  const getListKasir = async () => {
    try {
      const response = await axios.get('http://localhost:5000/kasir');
      setKasir(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  return (
    <>
      <div className="card">
        <h3 className="card-header text-center">Kasir</h3>
        <div className="card-body">
          <button className="btn btn-primary" onClick={handleModalOpen}>
            Tambah Kasir
          </button>

          {/* Modal Bootstrap */}
          <div
            className={`modal fade ${modalOpen ? 'show' : ''}`}
            tabIndex="-1"
            style={{ display: modalOpen ? 'block' : 'none' }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingKasirId ? 'Edit' : 'Tambah'} Kasir</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleModalClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <label className="mx-2">
                      Kode Kasir:
                      <input
                        type="text"
                        name="kodeKasir"
                        value={newKasir.kodeKasir}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </label>
                    <label className="mx-2">
                      Nama:
                      <input
                        type="text"
                        name="nama"
                        value={newKasir.nama}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </label>
                    <label className="mx-2">
                      WA:
                      <input
                        type="text"
                        name="satuan"
                        value={newKasir.wa}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </label>
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModalClose}
                  >
                    Tutup
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddOrUpdateKasir}
                  >
                    {editingKasirId ? 'Update' : 'Tambah'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Akhir Modal Bootstrap */}

          <div className="card flex-fill my-3">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-striped text-center border">
                  <thead>
                    <tr>
                      <th>Kode Kasir</th>
                      <th>Nama</th>
                      <th>WA</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kasir.map((item) => (
                      <tr key={item.id}>
                        <td>{item.kodeKasir}</td>
                        <td>{item.nama}</td>
                        <td>{item.wa}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => openEditModal(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteKasir(item.id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Colors
