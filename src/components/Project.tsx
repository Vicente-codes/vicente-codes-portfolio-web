import React from "react";
import mock01 from '../assets/images/mock01.png';
import mock02 from '../assets/images/mock02.png';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import mock08 from '../assets/images/mock08.png';
import mock09 from '../assets/images/mock09.png';
import mock10 from '../assets/images/camis.png';
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Proyectos Personales</h1>
        <div className="projects-grid">
            <div className="project">
                <a href="https://github.com/Vicente-codes/laravel-myshop-custom-camis" target="_blank" rel="noreferrer"><img src={mock10} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/Vicente-codes/laravel-myshop-custom-camis" target="_blank" rel="noreferrer"><h2>Custom Camis</h2></a>
                <p>App de comercio electrónico desarrollada principalmente en PHP con Laravel para la gestión y venta de camisetas personalizadas. Permite a los usuarios explorar productos, gestionar su carrito de compras y realizar pedidos, mientras ofrece a los administradores un panel completo para gestionar productos, categorías y usuarios.</p>
            </div>
        </div>
    </div>
    );
}

export default Project;