import axios from 'axios';

export class KardexService {
    baseUrl = "http://localhost:8080";

    getProductos() {
        return axios.get(this.baseUrl + "/productos/get").then(res => res.data);
    }

    saveProducto(producto) {
        return axios.post(this.baseUrl + "/productos/add", producto).then(res => res.data);
    }

    delProducto(ID_PROD) {
        return axios.post(this.baseUrl + "/productos/del/"+ID_PROD, null).then(res => res.data);
    }

    getEntradas() {
        return axios.get(this.baseUrl + "/entradas/get").then(res => res.data);
    }

    saveEntrada(entrada) {
        return axios.post(this.baseUrl + "/entradas/add", entrada).then(res => res.data);
    }

    getSalidas() {
        return axios.get(this.baseUrl + "/salidas/get").then(res => res.data);
    }

    saveSalida(salida) {
        return axios.post(this.baseUrl + "/salidas/add", salida).then(res => res.data);
    }

}