import Formulario from "@/components/etapa-a-tradicional/Formulario/Formulario";
import { Tabela } from "@/components/etapa-a-tradicional/Tabela/Tabela";
import Navegacao from "@/components/etapa-a-tradicional/Navegacao/Navegacao";

import FormularioIA from "@/components/etapa-b-com-ia/Formulario/Formulario";


export default function Home() {
  return (
   <>
      <header></header>
      <main style={{height:'100vh'}}>
        {/* <Formulario/> */}
        <FormularioIA/>
        {/* <Tabela/> */}
        {/* <Navegacao/> */}
      </main>
      <footer></footer>
   </>
  );
}
