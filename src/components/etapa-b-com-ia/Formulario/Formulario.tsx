"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import styles from "./Formulario.module.css"

type PersonType = "PF" | "PJ" | ""

type FormState = {
	fullName: string
	email: string
	personType: PersonType
	cpf: string
	cnpj: string
	companyName: string
	password: string
	confirmPassword: string
}

const initialForm: FormState = {
	fullName: "",
	email: "",
	personType: "",
	cpf: "",
	cnpj: "",
	companyName: "",
	password: "",
	confirmPassword: "",
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function onlyDigits(value: string): string {
	return value.replace(/\D/g, "")
}

function maskCpf(value: string): string {
	const digits = onlyDigits(value).slice(0, 11)
	return digits
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

function maskCnpj(value: string): string {
	const digits = onlyDigits(value).slice(0, 14)
	return digits
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1/$2")
		.replace(/(\d{4})(\d{1,2})$/, "$1-$2")
}

export default function Formulario() {
	const [form, setForm] = useState<FormState>(initialForm)
	const [submitMessage, setSubmitMessage] = useState("")

	const nameIsValid = form.fullName.trim().length >= 3
	const emailIsValid = emailPattern.test(form.email)
	const cpfIsValid = onlyDigits(form.cpf).length === 11
	const cnpjIsValid = onlyDigits(form.cnpj).length === 14
	const companyNameIsValid = form.companyName.trim().length > 0
	const passwordIsValid = form.password.length >= 8
		&& /[A-Z]/.test(form.password)
		&& /\d/.test(form.password)
		&& /[^A-Za-z\d]/.test(form.password)
	const passwordsMatch = form.password === form.confirmPassword
	const conditionalFieldsAreValid = form.personType === "PF"
		? cpfIsValid
		: form.personType === "PJ" && cnpjIsValid && companyNameIsValid
	const isFormValid = nameIsValid
		&& emailIsValid
		&& Boolean(form.personType)
		&& conditionalFieldsAreValid
		&& passwordIsValid
		&& passwordsMatch

	function updateField(field: keyof FormState, value: string): void {
		setSubmitMessage("")
		setForm((currentForm) => ({ ...currentForm, [field]: value }))
	}

	function handleTextChange(field: keyof FormState) {
		return (event: ChangeEvent<HTMLInputElement>): void => {
			updateField(field, event.target.value)
		}
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault()
		if (!isFormValid) return

		setForm(initialForm)
		setSubmitMessage("Cadastro realizado com sucesso!")
	}

	return (
		<section className={styles.section} aria-labelledby="registration-title">
			<div className={styles.intro}>
				<span className={styles.eyebrow}>Novo cadastro</span>
				<h2 id="registration-title" className={styles.title}>Crie seu acesso</h2>
				<p id="registration-description" className={styles.description}>
					Preencha seus dados para criar uma conta com segurança.
				</p>
			</div>

			<form
				className={styles.form}
				onSubmit={handleSubmit}
				noValidate
				aria-describedby="registration-description"
			>
				<div className={styles.fields}>

				<div className={styles.field}>
					<label className={styles.label} htmlFor="fullName">Nome completo <span aria-hidden="true">*</span></label>
				<input
					className={styles.input}
					id="fullName"
					name="fullName"
					type="text"
					autoComplete="name"
					maxLength={120}
					value={form.fullName}
					onChange={handleTextChange("fullName")}
					aria-invalid={form.fullName.length > 0 && !nameIsValid}
					required
				/>
					{form.fullName.length > 0 && !nameIsValid && (
						<p className={styles.error} role="alert">Informe pelo menos 3 caracteres.</p>
					)}
				</div>

				<div className={styles.field}>
					<label className={styles.label} htmlFor="email">E-mail <span aria-hidden="true">*</span></label>
					<input
						className={styles.input}
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						maxLength={254}
						value={form.email}
						onChange={handleTextChange("email")}
						aria-invalid={form.email.length > 0 && !emailIsValid}
						required
					/>
					{form.email.length > 0 && !emailIsValid && (
						<p className={styles.error} role="alert">Informe um e-mail válido.</p>
					)}
				</div>

				<fieldset className={styles.fieldset}>
					<legend className={styles.label}>Tipo de pessoa <span aria-hidden="true">*</span></legend>
					<div className={styles.radioGroup}>
						<label className={styles.radioCard} htmlFor="person-pf">
							<input
								className={styles.radio}
								id="person-pf"
								type="radio"
								name="personType"
								value="PF"
								checked={form.personType === "PF"}
								onChange={() => updateField("personType", "PF")}
								required
							/>
							<span>Pessoa Física</span>
						</label>
						<label className={styles.radioCard} htmlFor="person-pj">
							<input
								className={styles.radio}
								id="person-pj"
								type="radio"
								name="personType"
								value="PJ"
								checked={form.personType === "PJ"}
								onChange={() => updateField("personType", "PJ")}
							/>
							<span>Pessoa Jurídica</span>
						</label>
					</div>
				</fieldset>

				{form.personType === "PF" && (
					<div className={styles.field}>
						<label className={styles.label} htmlFor="cpf">CPF <span aria-hidden="true">*</span></label>
						<input
							className={styles.input}
							id="cpf"
							name="cpf"
							type="text"
							inputMode="numeric"
							autoComplete="off"
							placeholder="000.000.000-00"
							value={form.cpf}
							onChange={(event) => updateField("cpf", maskCpf(event.target.value))}
							aria-invalid={form.cpf.length > 0 && !cpfIsValid}
							aria-describedby="cpf-hint"
							maxLength={14}
							required
						/>
						<span className={styles.hint} id="cpf-hint">Use apenas números.</span>
						{form.cpf.length > 0 && !cpfIsValid && (
							<p className={styles.error} role="alert">Informe um CPF com 11 dígitos.</p>
						)}
					</div>
				)}

				{form.personType === "PJ" && (
					<div className={styles.conditionalFields}>
						<div className={styles.field}>
							<label className={styles.label} htmlFor="cnpj">CNPJ <span aria-hidden="true">*</span></label>
							<input
								className={styles.input}
								id="cnpj"
								name="cnpj"
								type="text"
								inputMode="numeric"
								autoComplete="off"
								placeholder="00.000.000/0001-00"
								value={form.cnpj}
								onChange={(event) => updateField("cnpj", maskCnpj(event.target.value))}
								aria-invalid={form.cnpj.length > 0 && !cnpjIsValid}
								maxLength={18}
								required
							/>
							{form.cnpj.length > 0 && !cnpjIsValid && (
								<p className={styles.error} role="alert">Informe um CNPJ com 14 dígitos.</p>
							)}
						</div>
						<div className={styles.field}>
							<label className={styles.label} htmlFor="companyName">Razão social <span aria-hidden="true">*</span></label>
							<input
								className={styles.input}
								id="companyName"
								name="companyName"
								type="text"
								maxLength={160}
								autoComplete="organization"
								value={form.companyName}
								onChange={handleTextChange("companyName")}
								required
							/>
						</div>
					</div>
				)}

				<div className={styles.field}>
					<label className={styles.label} htmlFor="password">Senha <span aria-hidden="true">*</span></label>
					<input
						className={styles.input}
						id="password"
						name="password"
						type="password"
						autoComplete="new-password"
						value={form.password}
						onChange={handleTextChange("password")}
						aria-invalid={form.password.length > 0 && !passwordIsValid}
						aria-describedby="password-hint"
						required
					/>
					<span className={styles.hint} id="password-hint">Mínimo de 8 caracteres, uma letra maiúscula, um número e um caractere especial.</span>
					{form.password.length > 0 && !passwordIsValid && (
						<p className={styles.error} role="alert">A senha ainda não atende aos requisitos.</p>
					)}
				</div>

				<div className={styles.field}>
					<label className={styles.label} htmlFor="confirmPassword">Confirmação de senha <span aria-hidden="true">*</span></label>
					<input
						className={styles.input}
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						autoComplete="new-password"
						value={form.confirmPassword}
						onChange={handleTextChange("confirmPassword")}
						aria-invalid={form.confirmPassword.length > 0 && !passwordsMatch}
						required
					/>
					{form.confirmPassword.length > 0 && !passwordsMatch && (
						<p className={styles.error} role="alert">As senhas devem coincidir.</p>
					)}
				</div>
				</div>

				<div className={styles.actions}>
					<button className={styles.submitButton} type="submit" disabled={!isFormValid}>Cadastrar</button>
					{submitMessage && <p className={styles.success} role="status" aria-live="polite">{submitMessage}</p>}
				</div>
			</form>
		</section>
	)
}
