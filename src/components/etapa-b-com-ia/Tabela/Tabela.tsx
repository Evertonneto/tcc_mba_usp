"use client";

import { useMemo, useState } from "react";
import styles from "./Tabela.module.css";

type Status = "Ativo" | "Inativo";
type StatusFilter = "todos" | "ativos" | "inativos";
type SortKey = "nome" | "dataCadastro";
type SortDirection = "asc" | "desc";

type Usuario = {
	id: number;
	nome: string;
	email: string;
	cargo: string;
	status: Status;
	dataCadastro: string;
};

const USUARIOS: Usuario[] = [
	{ id: 1, nome: "Ana Beatriz Costa", email: "ana.costa@email.com", cargo: "Analista", status: "Ativo", dataCadastro: "2024-01-15" },
	{ id: 2, nome: "Bruno Henrique Lima", email: "bruno.lima@email.com", cargo: "Desenvolvedor", status: "Ativo", dataCadastro: "2024-01-22" },
	{ id: 3, nome: "Carla Mendes Rocha", email: "carla.rocha@email.com", cargo: "Gerente", status: "Inativo", dataCadastro: "2024-02-03" },
	{ id: 4, nome: "Daniel Oliveira", email: "daniel.oliveira@email.com", cargo: "Designer", status: "Ativo", dataCadastro: "2024-02-11" },
	{ id: 5, nome: "Eduarda Martins", email: "eduarda.martins@email.com", cargo: "Analista", status: "Ativo", dataCadastro: "2024-02-18" },
	{ id: 6, nome: "Felipe Santos", email: "felipe.santos@email.com", cargo: "Desenvolvedor", status: "Inativo", dataCadastro: "2024-03-01" },
	{ id: 7, nome: "Gabriela Alves", email: "gabriela.alves@email.com", cargo: "Coordenadora", status: "Ativo", dataCadastro: "2024-03-09" },
	{ id: 8, nome: "Henrique Barbosa", email: "henrique.barbosa@email.com", cargo: "Suporte", status: "Ativo", dataCadastro: "2024-03-17" },
	{ id: 9, nome: "Isabela Ferreira", email: "isabela.ferreira@email.com", cargo: "Analista", status: "Inativo", dataCadastro: "2024-03-25" },
	{ id: 10, nome: "João Pedro Souza", email: "joao.souza@email.com", cargo: "Desenvolvedor", status: "Ativo", dataCadastro: "2024-04-02" },
	{ id: 11, nome: "Karen Rodrigues", email: "karen.rodrigues@email.com", cargo: "Gerente", status: "Ativo", dataCadastro: "2024-04-10" },
	{ id: 12, nome: "Lucas Almeida", email: "lucas.almeida@email.com", cargo: "Designer", status: "Inativo", dataCadastro: "2024-04-18" },
	{ id: 13, nome: "Mariana Nogueira", email: "mariana.nogueira@email.com", cargo: "Analista", status: "Ativo", dataCadastro: "2024-04-26" },
	{ id: 14, nome: "Nathan Carvalho", email: "nathan.carvalho@email.com", cargo: "Suporte", status: "Ativo", dataCadastro: "2024-05-04" },
	{ id: 15, nome: "Olivia Teixeira", email: "olivia.teixeira@email.com", cargo: "Coordenadora", status: "Inativo", dataCadastro: "2024-05-12" },
	{ id: 16, nome: "Paulo Ribeiro", email: "paulo.ribeiro@email.com", cargo: "Desenvolvedor", status: "Ativo", dataCadastro: "2024-05-20" },
	{ id: 17, nome: "Quitéria Lopes", email: "quiteria.lopes@email.com", cargo: "Analista", status: "Ativo", dataCadastro: "2024-05-28" },
	{ id: 18, nome: "Rafael Gomes", email: "rafael.gomes@email.com", cargo: "Gerente", status: "Inativo", dataCadastro: "2024-06-05" },
	{ id: 19, nome: "Sabrina Duarte", email: "sabrina.duarte@email.com", cargo: "Designer", status: "Ativo", dataCadastro: "2024-06-13" },
	{ id: 20, nome: "Tiago Moreira", email: "tiago.moreira@email.com", cargo: "Suporte", status: "Ativo", dataCadastro: "2024-06-21" },
	{ id: 21, nome: "Ursula Freitas", email: "ursula.freitas@email.com", cargo: "Analista", status: "Inativo", dataCadastro: "2024-06-29" },
	{ id: 22, nome: "Vinicius Castro", email: "vinicius.castro@email.com", cargo: "Desenvolvedor", status: "Ativo", dataCadastro: "2024-07-07" },
	{ id: 23, nome: "Wesley Martins", email: "wesley.martins@email.com", cargo: "Coordenador", status: "Ativo", dataCadastro: "2024-07-15" },
	{ id: 24, nome: "Yasmin Cardoso", email: "yasmin.cardoso@email.com", cargo: "Analista", status: "Inativo", dataCadastro: "2024-07-23" },
	{ id: 25, nome: "Zelia Fernandes", email: "zelia.fernandes@email.com", cargo: "Gerente", status: "Ativo", dataCadastro: "2024-07-31" },
	{ id: 26, nome: "Alice Monteiro", email: "alice.monteiro@email.com", cargo: "Designer", status: "Ativo", dataCadastro: "2024-08-08" },
	{ id: 27, nome: "Bernardo Pires", email: "bernardo.pires@email.com", cargo: "Suporte", status: "Inativo", dataCadastro: "2024-08-16" },
	{ id: 28, nome: "Cecilia Araujo", email: "cecilia.araujo@email.com", cargo: "Analista", status: "Ativo", dataCadastro: "2024-08-24" },
	{ id: 29, nome: "Diego Moura", email: "diego.moura@email.com", cargo: "Desenvolvedor", status: "Ativo", dataCadastro: "2024-09-01" },
	{ id: 30, nome: "Elisa Campos", email: "elisa.campos@email.com", cargo: "Coordenadora", status: "Inativo", dataCadastro: "2024-09-09" },
];

const ITENS_POR_PAGINA = 5;

function compararUsuarios(a: Usuario, b: Usuario, sortKey: SortKey): number {
	if (sortKey === "dataCadastro") {
		return a.dataCadastro.localeCompare(b.dataCadastro);
	}

	return a.nome.localeCompare(b.nome, "pt-BR");
}

export default function Tabela() {
	const [termo, setTermo] = useState("");
	const [status, setStatus] = useState<StatusFilter>("todos");
	const [sortKey, setSortKey] = useState<SortKey>("nome");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
	const [pagina, setPagina] = useState(1);

	const usuariosFiltrados = useMemo(() => {
		const termoNormalizado = termo.trim().toLocaleLowerCase();

		return USUARIOS
			.filter((usuario) => {
				const correspondeAoTexto = usuario.nome.toLocaleLowerCase().includes(termoNormalizado)
					|| usuario.email.toLocaleLowerCase().includes(termoNormalizado);
				const correspondeAoStatus = status === "todos"
					|| (status === "ativos" && usuario.status === "Ativo")
					|| (status === "inativos" && usuario.status === "Inativo");

				return correspondeAoTexto && correspondeAoStatus;
			})
			.sort((a, b) => {
				const resultado = compararUsuarios(a, b, sortKey);
				return sortDirection === "asc" ? resultado : -resultado;
			});
	}, [sortDirection, sortKey, status, termo]);

	const totalPaginas = Math.max(1, Math.ceil(usuariosFiltrados.length / ITENS_POR_PAGINA));
	const paginaAtual = Math.min(pagina, totalPaginas);
	const usuariosDaPagina = usuariosFiltrados.slice(
		(paginaAtual - 1) * ITENS_POR_PAGINA,
		paginaAtual * ITENS_POR_PAGINA,
	);

	function alterarOrdenacao(chave: SortKey) {
		if (sortKey === chave) {
			setSortDirection((direcao) => direcao === "asc" ? "desc" : "asc");
			return;
		}

		setSortKey(chave);
		setSortDirection("asc");
	}

	function indicadorOrdenacao(chave: SortKey): string {
		if (sortKey !== chave) return "";
		return sortDirection === "asc" ? " ↑" : " ↓";
	}

	function ariaSort(chave: SortKey): "ascending" | "descending" | "none" {
		if (sortKey !== chave) return "none";
		return sortDirection === "asc" ? "ascending" : "descending";
	}

	return (
		<section className={styles.container} aria-labelledby="titulo-tabela-utilizadores">
			<header className={styles.header}>
				<div>
					<p className={styles.eyebrow}>Gestão de acessos</p>
					<h2 id="titulo-tabela-utilizadores">Utilizadores</h2>
					<p className={styles.description}>Consulte e organize os utilizadores registados.</p>
				</div>
				<span className={styles.total}>{usuariosFiltrados.length} registos</span>
			</header>

			<div className={styles.controls} role="search">
				<div className={styles.field}>
					<label htmlFor="pesquisa-utilizadores">Pesquisar</label>
					<input
						id="pesquisa-utilizadores"
						type="search"
						value={termo}
						onChange={(evento) => {
							setTermo(evento.target.value);
							setPagina(1);
						}}
						placeholder="Nome ou e-mail"
						className={styles.input}
					/>
				</div>
				<div className={styles.field}>
					<label htmlFor="filtro-status">Status</label>
					<select
						id="filtro-status"
						value={status}
						onChange={(evento) => {
							setStatus(evento.target.value as StatusFilter);
							setPagina(1);
						}}
						className={styles.select}
					>
						<option value="todos">Todos</option>
						<option value="ativos">Ativos</option>
						<option value="inativos">Inativos</option>
					</select>
				</div>
			</div>

			<div className={styles.tableWrapper}>
			<table className={styles.table}>
				<caption className={styles.visuallyHidden}>Lista de utilizadores com nome, e-mail, cargo, status e data de cadastro.</caption>
				<thead>
					<tr>
						<th className={styles.cell} scope="col">ID</th>
						<th className={styles.cell} scope="col" aria-sort={ariaSort("nome")}>
							<button type="button" className={styles.headerButton} onClick={() => alterarOrdenacao("nome")} aria-label={`Ordenar por nome, atualmente ${ariaSort("nome")}`}>
								Nome{indicadorOrdenacao("nome")}
							</button>
						</th>
						<th className={styles.cell} scope="col">E-mail</th>
						<th className={styles.cell} scope="col">Cargo</th>
						<th className={styles.cell} scope="col">Status</th>
						<th className={styles.cell} scope="col" aria-sort={ariaSort("dataCadastro")}>
							<button type="button" className={styles.headerButton} onClick={() => alterarOrdenacao("dataCadastro")} aria-label={`Ordenar por data de cadastro, atualmente ${ariaSort("dataCadastro")}`}>
								Data de Cadastro{indicadorOrdenacao("dataCadastro")}
							</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{usuariosDaPagina.length > 0 ? usuariosDaPagina.map((usuario) => (
						<tr key={usuario.id}>
							<td className={styles.cell}>{usuario.id}</td>
							<td className={`${styles.cell} ${styles.name}`}>{usuario.nome}</td>
							<td className={styles.cell}>{usuario.email}</td>
							<td className={styles.cell}>{usuario.cargo}</td>
							<td className={styles.cell}><span className={`${styles.status} ${usuario.status === "Ativo" ? styles.active : styles.inactive}`}>{usuario.status}</span></td>
							<td className={styles.cell}>{usuario.dataCadastro}</td>
						</tr>
					)) : (
						<tr>
							<td className={styles.empty} colSpan={6}>Nenhum registo encontrado.</td>
						</tr>
					)}
				</tbody>
			</table>
			</div>

			<nav className={styles.pagination} aria-label="Paginação da tabela">
				<button type="button" disabled={paginaAtual === 1} onClick={() => setPagina((paginaAnterior) => paginaAnterior - 1)}>
					Anterior
				</button>
				<span aria-live="polite">Página {paginaAtual} de {totalPaginas}</span>
				<button type="button" disabled={paginaAtual === totalPaginas} onClick={() => setPagina((paginaAnterior) => paginaAnterior + 1)}>
					Próximo
				</button>
			</nav>
		</section>
	);
}
