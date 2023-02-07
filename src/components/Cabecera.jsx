import React from 'react';
import { Link } from "react-router-dom";
import { Panel } from 'primereact/panel';
import "./Cabecera.css";

const Cabecera = () => { 

    const items = [
        {
            label: 'Productos', 
            cName: 'btn-menu',
            path:"/"
        },
        {
            label: 'Entradas', 
            cName: 'btn-menu',
            path:"/entradas"
        },
        {
            label: 'Salidas',  
            cName: 'btn-menu',
            path:"/salidas"
        },
    ];

    return (
        
        <div>
            <Panel>
            <div className="cabecera">
                {
                    items.map((item, index) => { 
                        return(
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                        );
                    })
                }
            </div>
            </Panel>
        </div>
    )
}

export default Cabecera