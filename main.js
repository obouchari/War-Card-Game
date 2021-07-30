import $ from "jquery";
import { Offcanvas } from "bootstrap/dist/js/bootstrap.esm";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./public/font/font.css";
import "./style.css";

const navBarToggler = $(".navbar-toggler");
const offCanvasNav = $(".offcanvas");
const bsOffCanvasNav = new Offcanvas(offCanvasNav);

navBarToggler.on("click", (evt) => bsOffCanvasNav.show());
offCanvasNav.on("click", ".nav-link", (evt) => bsOffCanvasNav.hide());
