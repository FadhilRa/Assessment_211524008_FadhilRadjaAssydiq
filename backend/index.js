import express from "express";
import cors from "cors";

// import Barang from "./models/BarangModel.js";
// import Kasir from "./models/KasirModel.js";
// import Nota from "./models/NotaModel.js";
// import BarangNota from "./models/BarangNotaModel.js";
// import Tenan from "./models/TenanModel.js";

import BarangRoute from './routes/BarangRoute.js';
import KasirRoute from './routes/KasirRoute.js';
// import NotaRoute from './routes/NotaRoute.js';
// import BarangNotaRoute from "./models/BarangNotaModel.js";
// import TenanRoute from "./models/TenanModel.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(BarangRoute);
app.use(KasirRoute);
// app.use(NotaRoute);
// app.use(BarangNotaRoute);
// app.use(TenanRoute);

app.listen(5000, ()=> console.log('Server up and running...'))
