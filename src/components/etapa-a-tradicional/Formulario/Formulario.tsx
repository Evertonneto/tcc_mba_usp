"use client"

import { useState, useEffect, use } from "react"

export default function Formulario() {
    const [userName, setUserName] = useState<string>("")
    const [nameError, setNameError] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<boolean>("")
    const [cpf, setCpf] = useState<string>("")
    const [cnpj, setCnpj] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [personType, setPersonType] = useState<string>("")
    const [cpfError, setCpfError] = useState<boolean>(false)
    const [cnpjError, setCnpjError] = useState<boolean>(false)
    const [differentPasswords, setDifferentPasswords] = useState<boolean>(false)
    const [submitState, setSubmitState] = useState<boolean>(true)






    useEffect(() => {
        // Validação do length do username em pelo menos 3 dígitos
        if (userName.length < 3) {
            setNameError(true)
        } else {
            setNameError(false)
        }
        // Validação do E-mail
        console.log(email)
        console.log(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/))
        if(email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)){
            setEmailError(false)
        }else{
            setEmailError(true)
        }


        // Validação do cnpj ou cpf
         if (!(cpf.length === 11)) {
            setCpfError(true)
        } else {
            setCpfError(false)
        }

        if (!(cnpj.length === 14)) {
            setCnpjError(true)
        } else {
            setCnpjError(false)
        }

        // Validação da Senha

        if (password !== confirmPassword) {
            setDifferentPasswords(true)
        } else {
            setDifferentPasswords(false)
        }

        // Validação do preenchimento dos campos
        if (userName !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            setSubmitState(false)
        } else {
            setSubmitState(true)
        }



    }, [userName, email, password, confirmPassword, cnpj, cpf])

    function submitForm(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setUserName('')
        setEmail('')
        setPersonType("")
        setCnpj('')
        setCpf('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <form onSubmit={submitForm}>
            <h2>Dados Pessoais</h2>

            <div className="input-text">
                <label htmlFor="username">Nome Completo*:</label>
                <input type="text" id="username" value={userName} required onChange={(e) => { setUserName(e.target.value) }} />
                {nameError && <p style={{ color: "red", fontSize: "8px" }}>O Nome deve conter pelo menos 3 caracteres.</p>}
            </div>
            <div className="input-email">
                <label htmlFor="email">E-mail*:</label>
                <input type="text" id="email" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
                 {emailError && <p style={{ color: "red", fontSize: "8px" }}>Não foi possível validar o e-mail.</p>}
            </div>
            <div className="input-type">
                <p>Tipo*:</p>
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
                    <label htmlFor="cpf">CPF*:</label>
                    <input type="text" id="cpf" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    {cpfError && <p style={{ color: "red", fontSize: "8px" }}>O CPF deve conter 11 dígitos.</p>}
                </div>
            }
            {personType === "typePJ" &&
                <div className="input-text">
                    <label htmlFor="cpf">CNPJ*:</label>
                    <input type="text" id="cpf" placeholder="00.000.000/0000-00" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                    {cnpjError && <p style={{ color: "red", fontSize: "8px" }}>O CNPJ deve conter 14 dígitos.</p>}
                </div>
            }

            <div className="input-password">
                <label htmlFor="pass">Senha*:</label>
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <label htmlFor="confirmPass">Repita a senha*:</label>
                <input type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} required />
            </div>
            {differentPasswords && <p style={{ color: "red", fontSize: "8px" }}>Senhas diferentes, por favor realize a correção.</p>}

            <div className="button-submit">
                <button type="submit" disabled={submitState}>Enviar Formulário</button>
            </div>
        </form>
    )
}