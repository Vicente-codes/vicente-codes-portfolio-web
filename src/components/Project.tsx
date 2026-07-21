import React from "react";
import mock01 from '../assets/images/camis.png';
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Proyectos Personales</h1>
        <div className="projects-grid">
            <div className="project">
                <a href="https://github.com/Vicente-codes/laravel-myshop-custom-camis" target="_blank" rel="noreferrer"><img src={mock01} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/Vicente-codes/laravel-myshop-custom-camis" target="_blank" rel="noreferrer"><h2>Custom Camis</h2></a>
                <p>App de comercio electrónico desarrollada principalmente en PHP con Laravel para la gestión y venta de camisetas personalizadas. Permite a los usuarios explorar productos, gestionar su carrito de compras y realizar pedidos, mientras ofrece a los administradores un panel completo para gestionar productos, categorías y usuarios.</p>
            </div>
        </div>
    </div>
    );
}

export default Project;