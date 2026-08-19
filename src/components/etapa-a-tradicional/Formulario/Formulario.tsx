"use client"

import { useState } from "react"

export default function Formulario() {
    const [userName, setUserName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [personType, setPersonType] = useState<string>("")

    return (
        <div>
            <h2>Dados Pessoais</h2>

            <div className="input-text">
                <label htmlFor="username">Nome Completo:</label>
                <input type="text" id="username" />
            </div>
            <div className="input-email">
                <label htmlFor="username">E-mail:</label>
                <input type="text" id="username" />
            </div>
            <div className="input-type">
                <p>Tipo:</p>
                <label>
                    <input type="radio" name="type" value="typePF" onChange={(e) => {
                        setPersonType(e.target?.value)
                    }} />PF
                </label>
                <label>
                    <input type="radio" name="type" value="typePJ" onChange={(e) => {
                        setPersonType(e.target?.value)
                    }} />PJ
                </label>
            </div>
            {personType === "typePF" &&
                <div className="input-text">
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" id="cpf" placeholder="000.000.000-00" />
                </div>
            }
            {personType === "typePJ" &&
                <div className="input-text">
                    <label htmlFor="cpf">CNPJ:</label>
                    <input type="text" id="cpf" placeholder="00.000.000/0000-00" />
                </div>
            }

        </div>
    )
}