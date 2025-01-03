import React from 'react';
import HeaderCatalogo from '../CarCatalogo/HeadrCatalago';
import Produtos from '../CarCatalogo/Produto';

function LoginForm() {
    return (
        <div>
            <HeaderCatalogo />
            <main className="flex-fill">
                <div className="container">
                    <div className="row justify-content-center">
                        <form className="col-sm-10 col-md-8 col-lg-6">
                            <h1>Identifique-se, por favor</h1>

                            <div className="form-floating mb-3">
                                <input type="email" id="txtEmail" className="form-control" placeholder=" " autoFocus />
                                <label htmlFor="txtEmail">E-mail</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password" id="txtSenha" className="form-control" placeholder=" " />
                                <label htmlFor="txtSenha">Senha</label>
                            </div>

                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" value="" id="chkLembrar" />
                                <label htmlFor="chkLembrar" className="form-check-label">Lembrar de mim</label>
                            </div>

                            <button type="button" onClick={() => window.location.href = "/catálogo"} className="btn btn-lg btn-danger">Entrar</button>

                            <p className="mt-3">
                                Ainda não é cadastrado? <a href="/cadastro" className="text-decoration-none text-danger">Clique aqui</a> para se cadastrar.
                            </p>

                            <p className="mt-3">
                                Esqueceu sua senha? <a href="/recuperarsenha" className="text-decoration-none text-danger">Clique aqui</a> para recuperá-la.
                            </p>
                        </form>
                    </div>
                </div>
            </main>
            
        </div>

    );
}

export default LoginForm;
