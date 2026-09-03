"use client"

import { useState, useEffect, use } from "react"
import styles from './Formulario.module.css'

export default function Formulario() {
    const [userName, setUserName] = useState<string>("")
    const [nameError, setNameError] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<boolean>(false)
    const [cpf, setCpf] = useState<string>("")
    const [cnpj, setCnpj] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [personType, setPersonType] = useState<string>("")
    const [cpfError, setCpfError] = useState<boolean>(false)
    const [cnpjError, setCnpjError] = useState<boolean>(false)
    const [differentPasswords, setDifferentPasswords] = useState<boolean>(false)
    const [lengthErrorPasswords, setlengthErrorPasswords] = useState<boolean>(false)
    const [structurePasswords, setStructurePasswords] = useState<boolean>(false)
    const [submitState, setSubmitState] = useState<boolean>(true)
    const [submitMessage, setSubmitMessage] = useState<boolean>(false)






    useEffect(() => {
        // Validação do length do username em pelo menos 3 dígitos
        if (userName.length < 3) {
            setNameError(true)
        } else {
            setNameError(false)
        }
        // Validação do E-mail
        console.log(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setEmailError(false)
        }else{
            setEmailError(true)
        }


        // Validação do cnpj ou cpf
         if (cpf.length !== 11) {
            setCpfError(true)
        } else {
            setCpfError(false)
        }

        if (cnpj.length !== 14) {
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

        if(password.length < 8){
            setlengthErrorPasswords(true)
        }else{
            setlengthErrorPasswords(false)
        }
        if(confirmPassword.length < 8){
            setlengthErrorPasswords(true)
        }else{
            setlengthErrorPasswords(false)
        }

        if(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
            setStructurePasswords(true)
        }else{
            setStructurePasswords(false)
        }
        if(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(confirmPassword)){
            setStructurePasswords(true)
        }else{
            setStructurePasswords(false)
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
        setPersonType('')
        setCnpj('')
        setCpf('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <form className={styles.form} onSubmit={submitForm}>
            <h2 className={styles.title}>Dados Pessoais</h2>

            <div className="input-text">
                <label htmlFor="username">Nome Completo*</label>
                <input type="text" className={styles.input} id="username" value={userName} required onChange={(e) => { setUserName(e.target.value) }} />
                {nameError && <p style={{ color: "red", fontSize: "12px" }}>O Nome deve conter pelo menos 3 caracteres.</p>}
            </div>
            <div className="input-email">
                <label htmlFor="email">E-mail*</label>
                <input type="text" className={styles.input} id="email" value={email} required onChange={(e) => { setEmail(e.target.value) }}/>
                 {emailError && <p style={{ color: "red", fontSize: "12px" }}>Não foi possível validar o e-mail.</p>}
            </div>
            <div className={styles.inputType}>
                <p>Tipo*</p>
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
                    <input type="text" className={styles.input} id="cpf" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    {cpfError && <p style={{ color: "red", fontSize: "12px" }}>O CPF deve conter 11 dígitos.</p>}
                </div>
            }
            {personType === "typePJ" &&
                <div className="input-text">
                    <label htmlFor="cpf">CNPJ*:</label>
                    <input type="text" className={styles.input} id="cpf" placeholder="00.000.000/0000-00" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                    {cnpjError && <p style={{ color: "red", fontSize: "12px" }}>O CNPJ deve conter 14 dígitos.</p>}
                </div>
            }

            <div className={styles.inputPassword}>
                <label htmlFor="pass">Senha*:</label>
                <input type="password" className={styles.input} value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <label htmlFor="confirmPass">Repita a senha*:</label>
                <input type="password" className={styles.input} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} required />
                {differentPasswords && <p style={{ color: "red", fontSize: "12px" }}>Senhas diferentes, por favor realize a correção.</p>}
                {lengthErrorPasswords && <p style={{ color: "red", fontSize: "12px" }}>Senha deve conter no mínimo 8 caracteres.</p>}
                {structurePasswords && <p style={{ color: "red", fontSize: "12px" }}>Senhas deve conter pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.</p>}
            </div>

            <div className="button-submit">
                <button type="submit" className={styles.submitButton} disabled={submitState}>Enviar Formulário</button>
                {submitMessage && <p style={{color:'green',fontSize:'8px'}}>Formulário Enviado!</p>}
            </div>
        </form>
    )
}