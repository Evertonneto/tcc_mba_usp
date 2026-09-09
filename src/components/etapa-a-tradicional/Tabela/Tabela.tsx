'use client'

import { useState, useEffect, MouseEventHandler, useCallback } from "react";
import data from './data.json'
import styles from './Tabela.module.css'
import { reverse } from "dns";

type Data = typeof data;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
    tableData,
    sortKey,
    reverse,
}: {
    tableData: Data;
    sortKey: SortKeys;
    reverse: boolean;
}) {
    if (!sortKey) return tableData;

    const sortedData = data.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
        return sortedData.reverse();
    }

    return sortedData;
}

function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
}: {
    sortOrder: SortOrder;
    columnKey: SortKeys;
    sortKey: SortKeys;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            onClick={onClick}
            className={`${sortKey === columnKey && sortOrder === "desc"
                    ? `${styles.sortButton} ${styles.sortReverse}`
                    : `${styles.sortReverse}`
                }`}
        >
            ▲
        </button>
    );
}




export function Tabela() {
    const [searchByText, setSearchByText] = useState<string>("")
    const [searchByStatus, setSearchByStatus] = useState<"todos" | "ativos" | "inativos">("todos")
    const [sortKey, setSortKey] = useState<SortKeys>("nome");
    const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

     let sortedData = useCallback(
        () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
        [data, sortKey, sortOrder]
    );

    function changeSort(key: SortKeys) {
        setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

        setSortKey(key);
    }

    let filteredData = sortedData().filter(item  =>
        item.nome.toLowerCase().includes(searchByText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchByText.toLowerCase())
    ).filter(item => {
        if (searchByStatus === "ativos") {
            return item.status === "Ativo"
        } else if (searchByStatus === "inativos") {
            return item.status === "Inativo"
        } else {
            return item
        }
    })

   


    return (
        <div className={styles.tableContainer}>
            <div className={styles.filters}>
                <div className="filterByName">
                    <label htmlFor="">Procurar:</label>
                    <input type="text" value={searchByText} onChange={(e) => {
                        setSearchByText(e?.target?.value)
                    }} />
                </div>

                <div className="filterByStatus">
                    <select name="" id="" onChange={(e) => {
                        setSearchByStatus(e?.target?.value as "todos" | "ativos" | "inativos")
                    }}>
                        <option value="todos">Todos</option>
                        <option value="ativos">Ativos</option>
                        <option value="inativos">Inativos</option>
                    </select>
                </div>

            </div>

            <div className="tableDiv">
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.tr}>
                            <th className={styles.th}>Id</th>
                            <th className={styles.th}>Nome <SortButton columnKey="nome" onClick={()=> changeSort("nome")} {...{sortOrder,sortKey}} /></th>
                            <th className={styles.th}>E-mail</th>
                            <th className={styles.th}>Cargo</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th}>Data de Cadastro <SortButton columnKey="dataCadastro" onClick={()=> changeSort("dataCadastro")} {...{sortOrder,sortKey}} /></th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>

                        {filteredData.length > 0 ? (filteredData.map((value, key) => {
                            return (
                                <tr key={value.id} className={styles.tr}>
                                    <td className={styles.tr}>{value.id} </td>
                                    <td className={styles.tr}>{value.nome} </td>
                                    <td className={styles.tr}>{value.email}</td>
                                    <td className={styles.tr}>{value.cargo}</td>
                                    <td className={styles.tr}>{value.status}</td>
                                    <td className={styles.tr}>{value.dataCadastro} </td>
                                </tr>
                            )
                        })) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: "center" }}>Não foram encontrados registros.</td>
                            </tr>)}

                    </tbody>

                </table>
            </div>
        </div>
    )
}