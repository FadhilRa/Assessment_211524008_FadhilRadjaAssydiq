import React, { useState, useEffect } from 'react'
import axios from 'axios'

const formatRupiah = (angka) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
  return formatter.format(angka)
}

const Dashboard = () => {
  const [barang, setBarang] = useState([])
  const [newBarang, setNewBarang] = useState({
    kodeBarang: '',
    namaBarang: '',
    satuan: '',
    hargaSatuan: '',
    stok: '',
  })
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    getListBarang()
    deleteBarang()
  }, [])

  const getListBarang = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barang')
      setBarang(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const deleteBarang = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/barang/${:id}')
      setBarang(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBarang((prevBarang) => ({ ...prevBarang, [name]: value }))
  }

  const handleAddBarang = async () => {
    try {
      // Lakukan permintaan HTTP POST untuk menambahkan barang
      await axios.post('http://localhost:5000/barang', newBarang)
      // Tutup modal setelah berhasil menambahkan barang
      setModalOpen(false)
      // Perbarui daftar barang
      getListBarang()
    } catch (error) {
      console.error('Error adding barang:', error)
    }
  }

  return (
    <>
    <div className="card">
      <h3 className="card-header text-center">Barang</h3>
      <div className="card-body">
        <button className="btn btn-primary" onClick={handleModalOpen}>
          Tambah Barang
        </button>

        {/* Modal Bootstrap */}
        {/* ... (kode modal sebelumnya) */}
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
                          onClick={() => deleteBarang(barang.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          // Handle fungsi hapus di sini
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

export default Dashboard