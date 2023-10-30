import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/index";
import Midias from "./pages/Midias/index";
import MidiaDetail from "./pages/Midias/MidiaDetail/index";
import Agenda from "./pages/Agenda";
import Exercicios from "./pages/Exercicios";
import Historico from "./pages/Historico";
import Pacientes from "./pages/Pacientes";
import NewMidia from "./pages/Midias/NewMidia";
import Cadastro from "./pages/Cadastro";
import Plano from "./pages/Plano"
import CadastroFisioterapeuta from "./pages/Fisioterapeuta";
import AcompanhamentoVirtual from "pages/Acompanhar";

const Router = () => {
    return (
        <Routes>
            <Route component={Home} path="/" exact />
            <Route component={Midias} path="/midias" />
            <Route component={MidiaDetail} path="/midia/:id" />
            <Route component={NewMidia} path="/midia/criar" />
            <Route component={Agenda} path="/agenda" />
            <Route component={Exercicios} path="/exercicios" />
            <Route component={Historico} path="/historico" />
            <Route component={Pacientes} path="/pacientes" />
            <Route component={Cadastro} path="/cadastro" />
            <Route component={Plano} path="/plano" />
            <Route component={CadastroFisioterapeuta} path="/fisioterapeuta" />
            <Route component={AcompanhamentoVirtual} path="/acompanhamento" />
        </Routes>
    )
}

export default Router;