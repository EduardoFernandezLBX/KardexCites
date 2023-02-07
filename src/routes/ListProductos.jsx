import { KardexService } from '../service/KardexService';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { PrimeIcons } from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog ,confirmDialog } from 'primereact/confirmdialog';
import React, { useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';


function ListProductos() {
  
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idprod, setIDprod] = useState('');
  const [catprod, setCatProd] = useState('');
  const [nameprod, setNameProd] = useState('');
  const [unidad, setUnidad] = useState('');
  const toast = useRef(null);

  const [filters, setFilters] = useState(true);
  const [loading, setLoading] = useState(true);
  
  const items = [
    {
      label : 'Nuevo',
      icon : PrimeIcons.PLUS,
      command : () => {showSaveModal()}
    },
    {
      label : 'Eliminar',
      icon : PrimeIcons.TRASH,
      command : () => {showConfirmDelete()}
    }
  ]

  useEffect(() => {
    let  kardexService = new KardexService();
    kardexService.getProductos().then(res => setProductos(res));
  });

  useEffect(() => {
    let  kardexService = new KardexService();
    kardexService.getProductos().then(res => { setProductos(getProducto(res));
    setLoading(false) }); initFilters();
  }, []);

  const getProducto = (data) => {
    return [...data || []].map(d => {
        d.date = new Date(d.date);
        return d;
    });
  }

  const renderFooter = () => {
    return (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-check" onClick={() => saveProducto()} autoFocus />
        </div>
    );
    }

    const showSaveModal = () => {
        setIDprod('');
        setCatProd('');
        setNameProd('');
        setUnidad('');
        setShowModal(true);
    }

    const saveProducto = () => {
      let producto = {};
      producto.ID_PROD = idprod;
      producto.CATEGORIA = catprod;
      producto.NAME_PRODUCTO = nameprod;
      producto.TIPO_UNIDAD = unidad;

      let  kardexService = new KardexService();
      kardexService.saveProducto(producto).then(res => {
          setIDprod('');
          setCatProd('');
          setNameProd('');
          setUnidad('');
          setShowModal(false);
          toast.current.show({severity:'success', summary: 'Success Message', detail:'Producto Guardado Correctamente', life: 3000});
      });
    };

    //Funcion de editar productos
    // const editProducto = () => {
    //   setIDprod(selectedProducto.ID_PROD);
    //   setCatProd(selectedProducto.CATEGORIA);
    //   setNameProd(selectedProducto.NAME_PRODUCTO);
    //   setUnidad(selectedProducto.TIPO_UNIDAD);
    //   setShowModal(true);
    // };

    const deleteProducto = () => {
      let kardexService = new KardexService();
      kardexService.delProducto(selectedProducto.ID_PROD).then(res => {
        toast.current.show({severity:'info', summary: 'Info Message', detail:'Registro Eliminado Correctamente', life: 3000});
      });
    };

    const showConfirmDelete = () => {
      confirmDialog({
        message: '¿Esta seguro que desea eliminar este registro?',
        header: '¡Atencion!',
        icon: 'pi pi-exclamation-triangle',
        acceptClassName: 'p-button-danger',
        accept: () => deleteProducto(),
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
      setSelectedProducto(value);
    }

    const initFilters = () => {
      setFilters({
          'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
          'ID_PROD': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'CATEGORIA': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'NAME_PRODUCTO': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }] },
          'TIPO_UNIDAD': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      });
      setSelectedProducto('');
    }

    const renderHeader = () => {
      return (
          <div className="flex justify-content-end">
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={selectedProducto} onChange={onGlobalFilterChange} placeholder="Buscar" />
              </span>
              <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter} />
          </div>
      )
    }

  const header = renderHeader();

  return (

    <div style={{margin: '0 auto', marginTop:'20px'}}>
        
      <Toast ref={toast} />
      <ConfirmDialog />
        <Panel header="PRODUCTOS">
          <Menubar model={items} style={{MarginBottom:'20px'}}/>
          <DataTable value={productos} selectionMode = "single"
                      selection = {selectedProducto} 
                      onSelectionChange={e => setSelectedProducto(e.value)}
                      dataKey = "ID_PROD"
                      style={{marginTop: '20px'}}

                      filters={filters} loading={loading}
                      globalFilterFields={['ID_PROD', 'CATEGORIA', 'NAME_PRODUCTO', 'TIPO_UNIDAD']}
                      header={header} emptyMessage="No customers found."

                      paginator responsiveLayout="scroll"
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}

                      className="p-datatable-gridlines">
            <Column field="ID_PROD" header="ID PROD" style={{ width: '25%' }}></Column>
            <Column field="CATEGORIA" header="CATEGORIA" style={{ width: '25%' }}></Column>
            <Column field="NAME_PRODUCTO" header="NOMBRE PRODUCTO" style={{ width: '25%' }}></Column>
            <Column field="TIPO_UNIDAD" header="TIPO UNIDAD" style={{ width: '25%' }}></Column>
          </DataTable>
        </Panel>

        <Dialog header="Nuevo Producto" visible={showModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setShowModal(false)}>
          <div className='p-fluid'>
            <form id='producto-form'>

              <div className='p-field'>
                <span className="p-float">
                  <label htmlFor="ID PROD">ID del Producto</label>
                  <InputText name="ID_PROD" value={idprod} onChange={(e) => setIDprod(e.target.value)} />
                </span>
              </div>

              <div className='p-field'>
                <span className="p-float">
                <label htmlFor="CATEGORIA">Categoria</label>
                  <InputText name="CATEGORIA" value={catprod} onChange={(e) => setCatProd(e.target.value)} />
                </span>
              </div>

              <div className='p-field'>
                <span className="p-float">
                  <label htmlFor="NAME">Nombre del Producto</label>
                  <InputText name="NAME_PRODUCTO" value={nameprod} onChange={(e) => setNameProd(e.target.value)} />
                </span>
              </div>

              <div className='p-field'>
                <span className="p-float">
                  <label htmlFor="UNIDAD">Tipo de Unidad</label>
                  <InputText name="TIPO_UNIDAD" value={unidad} onChange={(e) => setUnidad(e.target.value)} />
                </span>
              </div>

            </form>
          </div>
        </Dialog>

    </div>
);
}

export default ListProductos