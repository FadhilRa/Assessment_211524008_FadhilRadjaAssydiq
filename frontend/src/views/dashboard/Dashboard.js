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

  return (
    <>
      <div className="card">
        <h3 className="card-header text-center">Barang</h3>
        <div className="card-body">
          <div className="card flex-fill">
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