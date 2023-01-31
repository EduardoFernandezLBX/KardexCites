import { KardexService } from '../service/KardexService';

import { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { PrimeIcons } from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';

function ListSalidas (){

    const [salidas, setSalidas] = useState([]);
    const [selectedSalida, setSelectedSalida] = useState(null);
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    const [numRegistro, setNumRegistro] = useState(0);
    const [idprod, setIDprod] = useState('');
    const [catprod, setCatProd] = useState('');
    const [nameprod, setNameProd] = useState('');
    const [comentario, setComentario] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const toast = useRef(null);

    const [filters, setFilters] = useState(true);
    const [loading, setLoading] = useState(true);
    
    const items = [
      {
        label : 'Nuevo',
        icon : PrimeIcons.PLUS,
        command : () => {showSaveModal()}
      },
    ]

    useEffect(() => {
      let  kardexService = new KardexService();
      kardexService.getProductos().then(res => setProductos(res));
    }, []);

    useEffect(() => {
      let  kardexService = new KardexService();
      kardexService.getSalidas().then(res => setSalidas(res));
    });
  
    useEffect(() => {
      let  kardexService = new KardexService();
      kardexService.getSalidas().then(res => { setSalidas(getSalida(res));
        setLoading(false) }); initFilters();
      }, []);

    const getSalida = (data) => {
      return [...data || []].map(d => {
          d.date = new Date(d.date);
          return d;
      });
    }
  
    const renderFooter = () => {
      return (
          <div>
              <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text" />
              <Button label="Guardar" icon="pi pi-check" onClick={() => saveSalida()} autoFocus />
          </div>
      );
      }
  
      const showSaveModal = () => {
            setFecha('');
            setNumRegistro();
            setIDprod('');
            setCatProd('');
            setNameProd('');
            setComentario('');
            setCantidad();
            setShowModal(true);
      }
  
      const saveSalida = () => {
        let salida = {};
        salida.FECHA = fecha;
        salida.NUM_REGISTRO = numRegistro;
        salida.ID_PROD = idprod;
        salida.CATEGORIA = catprod;
        salida.NAME_PRODUCTO = nameprod;
        salida.COMENTARIO = comentario;
        salida.CANTIDAD = cantidad;
  
        let  kardexService = new KardexService();
        kardexService.saveSalida(salida).then(res => {
            setFecha('');
            setNumRegistro();
            setIDprod('');
            setCatProd('');
            setNameProd('');
            setComentario('');
            setCantidad();
            setShowModal(false);
            toast.current.show({severity:'success', summary: 'Success Message', detail:'Ingreso Guardado Correctamente', life: 3000});
        });
      };
  
      const clearFilter = () => {
        initFilters();
      }
  
      const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
  
        setFilters(_filters);
        setSelectedSalida(value);
      }
  
      const initFilters = () => {
        setFilters({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'FECHA': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'NUM_REGISTRO': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'ID_PROD': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'CATEGORIA': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'NAME_PRODUCTO': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }] },
            'COMENTARIO': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }] },
        });
        setSelectedSalida('');
      }
  
      const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={selectedSalida} onChange={onGlobalFilterChange} placeholder="Buscar" />
                </span>
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter} />
            </div>
        )
      }
  
    const header = renderHeader();

    return (
  
      <div style={{margin: '0 auto', marginTop:'20px'}}>
        <Toast ref={toast} />
          <Panel header="SALIDAS">
            <Menubar model={items} style={{MarginBottom:'20px'}}/>
            <DataTable value={salidas} selectionMode = "single"
                        selection = {selectedSalida} 
                        onSelectionChange={e => setSelectedSalida(e.value)}
                        dataKey = "ID_PROD"
                        style={{marginTop: '20px'}}

                        filters={filters} loading={loading}
                        globalFilterFields={['FECHA', 'NUM_REGISTRO', 'ID_PROD', 'CATEGORIA', 'NAME_PRODUCTO', 'COMENTARIO']}
                        header={header} emptyMessage="No customers found."

                        paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}

                        className="p-datatable-gridlines">
                <Column field="FECHA" header="FECHA"></Column>
                <Column field="NUM_REGISTRO" header="NUMERO DE REGISTRO"></Column>             
                <Column field="ID_PROD" header="ID PROD"></Column>
                <Column field="CATEGORIA" header="CATEGORIA"></Column>
                <Column field="NAME_PRODUCTO" header="NOMBRE PRODUCTO"></Column>
                <Column field="COMENTARIO" header="COMENTARIO"></Column>
                <Column field="CANTIDAD" header="CANTIDAD"></Column>
            </DataTable>
          </Panel>
  
          <Dialog header="Registro de salida" visible={showModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setShowModal(false)}>
            <div className='p-fluid'>
              <form id='salida-form'>

              <div className='field col-12 md:col-4'>
                  <span className="p-float">
                    <label htmlFor="FECHA">Fecha Ingreso</label>
                    <InputText name="FECHA" value={fecha} onChange={(e) => setFecha(e.target.value)} dateFormat="yy-mm-dd" showIcon showButtonBar/>
                  </span>
                </div>

                <div className='p-field'>
                  <span className="p-float">
                    <label htmlFor="NUMERO DE REGISTRO">Numero de Registro</label>
                    <InputNumber name="NUM_REGISTRO" value={numRegistro} onValueChange={(e) => setNumRegistro(e.value)} useGrouping={false} />
                  </span>
                </div>
  
                <div className='p-field'>
                  <span className="p-float">
                    <label htmlFor="ID PROD">ID del Producto</label>
                    {/* <Dropdown name="ID_PROD" 
                    value={GetIdProd} 
                    onChange={(e) => setIDprod(e.target.value)} /> */}
                    <div>
                    <select name="ID_PROD" onChange={(e) => setIDprod(e.target.value)}>
                      <option>Seleccione un id producto</option>
                      {
                      productos.map( (productoget)=> 
                      <option key={ productoget.ID_PROD}> {productoget.ID_PROD} </option> )
                      }
                    </select>
                    </div>
                  </span>
                </div>
  
                <div className='p-field'>
                  <span className="p-float">
                  <label htmlFor="CATEGORIA">Categoria</label>
                    {/* <InputText name="CATEGORIA" value={catprod} onChange={(e) => setCatProd(e.target.value)} /> */}
                    <div>
                    <select name="CATEGORIA" onChange={(e) => setCatProd(e.target.value)}>
                      <option>Seleccione una Categoria</option>
                      {
                      productos.map( (productoget)=> 
                      <option key={ productoget.ID_PROD}> {productoget.CATEGORIA} </option> )
                      }
                    </select>
                    </div>
                  </span>
                </div>
  
                <div className='p-field'>
                  <span className="p-float">
                    <label htmlFor="NAME">Nombre del Producto</label>
                    {/* <InputText name="NAME_PRODUCTO" value={nameprod} onChange={(e) => setNameProd(e.target.value)} /> */}
                    <div>
                    <select name="NAME_PRODUCTO" onChange={(e) => setNameProd(e.target.value)}>
                      <option>Seleccione un producto</option>
                      {
                      productos.map( (productoget)=> 
                      <option key={ productoget.ID_PROD}> {productoget.NAME_PRODUCTO} </option> )
                      }
                    </select>
                    </div>
                  </span>
                </div>

                <div className='p-field'>
                  <span className="p-float">
                    <label htmlFor="COMENTARIO">Comentario</label>
                    <InputText name="COMENTARIO" value={comentario} onChange={(e) => setComentario(e.target.value)} />
                  </span>
                </div>

                <div className='p-field'>
                  <span className="p-float">
                    <label htmlFor="CANTIDAD">Cantidad</label>
                    <InputNumber name="CANTIDAD" value={cantidad} onValueChange={(e) => setCantidad(e.value)} useGrouping={false} />
                  </span>
                </div>
  
              </form>
            </div>
          </Dialog>
  
      </div>
  );
  }

  export default ListSalidas