import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formatRupiah = (angka) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
  return formatter.format(angka);
};

const Dashboard = () => {
  const [barang, setBarang] = useState([]);
  const [newBarang, setNewBarang] = useState({
    kodeBarang: '',
    namaBarang: '',
    satuan: '',
    hargaSatuan: '',
    stok: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBarangId, setEditingBarangId] = useState(null); // Menyimpan ID barang yang akan diedit

  useEffect(() => {
    getListBarang();
  }, []);

  const getListBarang = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barang');
      setBarang(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openEditModal = (id) => {
    // Temukan data barang yang akan diedit berdasarkan ID
    const editingBarang = barang.find((item) => item.id === id);

    // Set nilai form dengan data barang yang akan diedit
    setNewBarang({
      kodeBarang: editingBarang.kodeBarang,
      namaBarang: editingBarang.namaBarang,
      satuan: editingBarang.satuan,
      hargaSatuan: editingBarang.hargaSatuan,
      stok: editingBarang.stok,
    });

    // Set ID barang yang akan diedit
    setEditingBarangId(id);

    // Buka modal
    setModalOpen(true);
  };

  const handleModalOpen = () => {
    // Bersihkan form jika sedang tidak dalam mode editing
    setNewBarang({
      kodeBarang: '',
      namaBarang: '',
      satuan: '',
      hargaSatuan: '',
      stok: '',
    });

    // Bersihkan ID barang yang akan diedit
    setEditingBarangId(null);

    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBarang((prevBarang) => ({ ...prevBarang, [name]: value }));
  };

  const handleAddOrUpdateBarang = async () => {
    try {
      if (editingBarangId) {
        // Lakukan permintaan HTTP PUT untuk mengupdate barang jika dalam mode editing
        await axios.put(`http://localhost:5000/barang/${editingBarangId}`, newBarang);
      } else {
        // Lakukan permintaan HTTP POST untuk menambahkan barang jika tidak dalam mode editing
        await axios.post('http://localhost:5000/barang', newBarang);
      }

      // Tutup modal setelah berhasil menambahkan atau mengupdate barang
      setModalOpen(false);

      // Perbarui daftar barang
      getListBarang();
    } catch (error) {
      console.error('Error adding/updating barang:', error);
    }
  };

  const deleteBarang = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/barang/${id}`);
      getListBarang();
    } catch (error) {
      console.error('Error deleting barang:', error);
    }
  };

  return (
    <>
      <div className="card">
        <h3 className="card-header text-center">Barang</h3>
        <div className="card-body">
          <button className="btn btn-primary" onClick={handleModalOpen}>
            Tambah Barang
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
                  <h5 className="modal-title">{editingBarangId ? 'Edit' : 'Tambah'} Barang</h5>
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
                      Kode Barang:
                      <input
                        type="text"
                        name="kodeBarang"
                        value={newBarang.kodeBarang}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </label>
                    <label className="mx-2">
                      Nama Barang:
                      <input
                        type="text"
                        name="namaBarang"
                        value={newBarang.namaBarang}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </label>
                    <label className="mx-2">
                      Satuan:
                      <input
                        type="text"
                        name="satuan"
                        value={newBarang.satuan}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </label>
                    <label className="mx-2">
                      Harga Satuan:
                      <input
                        type="number"
                        name="hargaSatuan"
                        value={newBarang.hargaSatuan}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </label>
                    <label className="mx-2">
                      Stok:
                      <input
                        type="number"
                        name="stok"
                        value={newBarang.stok}
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
                    onClick={handleAddOrUpdateBarang}
                  >
                    {editingBarangId ? 'Update' : 'Tambah'}
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
                      <th>Kode Barang</th>
                      <th>Nama Barang</th>
                      <th>Satuan</th>
                      <th>Harga Satuan</th>
                      <th>Stok</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barang.map((item) => (
                      <tr key={item.id}>
                        <td>{item.kodeBarang}</td>
                        <td>{item.namaBarang}</td>
                        <td>{item.satuan}</td>
                        <td>{formatRupiah(item.hargaSatuan)}</td>
                        <td>{item.stok}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => openEditModal(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteBarang(item.id)}
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
  );
};

export default Dashboard;