import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Outlet, Link } from "react-router-dom";

const Cabecera = () => { 

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', url:"/"},
        //{label: 'Movimientos', icon: 'pi pi-fw pi-file', url:"/movimientos"},
        {label: 'Entradas', icon: 'pi pi-fw pi-file', url:"/entradas"},
        {label: 'Salidas', icon: 'pi pi-fw pi-file', url:"/salidas"},
    ];

    return (

        <div>
            <div className="cabecera">
                {
                    // items.map(item => {
                    //     <>
                    //         <Link href={item.url}>
                    //                 {item.label}
                    //         </Link>
                    //     </>
                    // })
                }
                <TabMenu model={items} />
            </div>
        </div>


    )
}

export default Cabecera