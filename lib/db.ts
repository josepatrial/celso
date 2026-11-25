import { promises as fs } from "fs";
import path from "path";

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  author: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
}

export interface InstagramHighlight {
  id: string;
  title: string;
  caption: string;
  mediaType: "image" | "video";
  imageUrl: string;
  postUrl: string;
  publishedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  createdAt: string;
}

export interface Database {
  articles: Article[];
  instagramHighlights: InstagramHighlight[];
  contactMessages: ContactMessage[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

const INITIAL_DB: Database = {
  articles: [
    {
      id: "art-1",
      slug: "o-que-e-anemia",
      title: "O que é anemia?",
      summary:
        "Compreenda o que define a anemia do ponto de vista médico, por que ela ocorre e por que o diagnóstico da causa é fundamental antes de iniciar qualquer tratamento.",
      coverImage: "/images/hematologia-laboratorio.svg",
      category: "Anemias",
      publishedAt: "2026-10-18",
      author: "Dr. Celso Massumoto",
      readTime: "4 min de leitura",
      seoTitle: "O que é anemia? | Dr. Celso Massumoto – Hematologista",
      seoDescription:
        "Entenda o que é anemia, seus principais sintomas e a importância de investigar a causa com um hematologista.",
      content: `A anemia não é uma doença isolada, mas sim um sinal clínico e laboratorial de que algo no organismo precisa de atenção. Ela é caracterizada pela redução da concentração de hemoglobina no sangue — a proteína presente nos glóbulos vermelhos responsável por transportar oxigênio dos pulmões para todos os tecidos do corpo.

## Principais mecanismos da anemia

De forma geral, a anemia pode surgir por três grandes mecanismos:

- Diminuição na produção de glóbulos vermelhos pela medula óssea, como ocorre nas deficiências de ferro, vitamina B12 ou ácido fólico;
- Perda sanguínea aguda ou crônica, muitas vezes discreta e imperceptível no dia a dia;
- Destruição acelerada dos glóbulos vermelhos na circulação, conhecida como anemia hemolítica.

## Sintomas mais comuns

Como há menor oferta de oxigênio aos tecidos, os sintomas costumam incluir cansaço persistente, indisposição, falta de ar aos esforços, palidez cutânea e de mucosas, tontura e dificuldade de concentração. Em quadros leves ou de instalação lenta, o organismo pode se adaptar parcialmente, tornando o diagnóstico dependente de exames laboratoriais.

## Por que evitar a automedicação

Um erro frequente é iniciar suplementação de ferro por conta própria ao notar uma hemoglobina baixa. Nem toda anemia decorre de falta de ferro — e suplementar sem indicação pode mascarar o diagnóstico real ou até causar acúmulo indesejado de ferro no organismo. A avaliação médica permite identificar a causa exata e conduzir o tratamento adequado com segurança.`,
    },
    {
      id: "art-2",
      slug: "como-identificar-alteracoes-no-hemograma",
      title: "Como identificar alterações no hemograma?",
      summary:
        "Saiba o que avaliam as três séries do hemograma — eritrócitos, leucócitos e plaquetas — e quando um resultado fora da faixa de referência merece investigação.",
      coverImage: "/images/hematologia-laboratorio.svg",
      category: "Exames Hematológicos",
      publishedAt: "2026-10-25",
      author: "Dr. Celso Massumoto",
      readTime: "5 min de leitura",
      seoTitle:
        "Como identificar alterações no hemograma? | Dr. Celso Massumoto",
      seoDescription:
        "Entenda como interpretar os principais parâmetros do hemograma e quando procurar avaliação hematológica.",
      content: `O hemograma completo é um dos exames mais solicitados na prática médica. Apesar de rotineiro, sua interpretação exige olhar clínico atento, pois valores discretamente fora da faixa de referência nem sempre representam doença, enquanto determinadas combinações de achados exigem investigação ágil.

## As três séries do hemograma

O exame analisa três grandes grupos celulares produzidos na medula óssea:

- **Série vermelha (eritrograma):** avalia hemácias, hemoglobina, hematócrito e índices hematimétricos como VCM e HCM. Alterações podem indicar anemias ou, no sentido oposto, elevação excessiva de glóbulos vermelhos;
- **Série branca (leucograma):** mede os leucócitos, células ligadas à defesa imunológica. Tanto o aumento (leucocitose) quanto a redução (leucopenia) precisam ser analisados conforme os subtipos celulares e o contexto clínico;
- **Plaquetas (plaquetograma):** células essenciais para a coagulação inicial. Quedas (plaquetopenia) ou elevações (plaquetose) persistentes devem ser avaliadas.

## O valor de referência não conta a história sozinho

Os intervalos de referência de um laboratório representam a média estatística de uma população saudável. Pequenas variações podem ocorrer por hidratação, infecções virais recentes, uso de medicamentos ou características individuais.

## Quando buscar avaliação especializada

Alterações persistentes em exames seriados, quedas ou elevações simultâneas em mais de uma série sanguínea, presença de células imaturas no laudo ou sintomas associados — como fadiga intensa, hematomas espontâneos, infecções de repetição ou perda de peso não intencional — justificam avaliação com o hematologista.`,
    },
    {
      id: "art-3",
      slug: "quando-investigar-uma-anemia",
      title: "Quando investigar uma anemia?",
      summary:
        "Entenda em quais situações a anemia precisa de investigação aprofundada e quais passos o hematologista utiliza para esclarecer a origem do quadro.",
      coverImage: "/images/consulta-acolhimento.svg",
      category: "Anemias",
      publishedAt: "2026-11-02",
      author: "Dr. Celso Massumoto",
      readTime: "4 min de leitura",
      seoTitle: "Quando investigar uma anemia? | Dr. Celso Massumoto",
      seoDescription:
        "Saiba quando a anemia exige investigação médica detalhada e como é conduzida a avaliação hematológica.",
      content: `Toda anemia recém-identificada merece esclarecimento etiológico. Mesmo quando os sintomas são sutis, compreender por que os níveis de hemoglobina caíram é essencial para proteger a saúde do paciente a curto e longo prazo.

## Sinais de alerta que pedem atenção

Alguns cenários tornam a investigação ainda mais prioritária:

- Anemia que não melhora após tratamento inicial ou que retorna logo após a suspensão de suplementos;
- Anemia associada a alterações em leucócitos ou plaquetas no hemograma;
- Presença de perda de peso involuntária, febre persistente ou aumento de gânglios linfáticos;
- Anemia em homens adultos ou mulheres após a menopausa, situações em que perdas ocultas pelo trato gastrointestinal devem ser cuidadosamente descartadas;
- Histórico familiar de doenças hematológicas ou anemias hereditárias.

## Como é feita a investigação

A investigação começa com uma escuta clínica minuciosa — avaliando alimentação, medicamentos, histórico menstrual, cirurgias prévias e sintomas sistêmicos. Em seguida, exames complementares direcionados (como perfil de ferro, dosagem de vitaminas, contagem de reticulócitos e marcadores de hemólise) ajudam a definir o diagnóstico com precisão, evitando exames desnecessários e orientando a melhor conduta.`,
    },
    {
      id: "art-4",
      slug: "o-que-e-uma-doenca-hematologica",
      title: "O que é uma doença hematológica?",
      summary:
        "Conheça o espectro das condições que afetam o sangue, a medula óssea e o sistema linfático — dos quadros benignos tratáveis às doenças onco-hematológicas.",
      coverImage: "/images/hematologia-laboratorio.svg",
      category: "Hematologia",
      publishedAt: "2026-11-08",
      author: "Dr. Celso Massumoto",
      readTime: "5 min de leitura",
      seoTitle: "O que é uma doença hematológica? | Dr. Celso Massumoto",
      seoDescription:
        "Entenda o que são as doenças hematológicas, suas principais categorias e a importância do acompanhamento especializado.",
      content: `As doenças hematológicas englobam todas as condições que afetam a produção, a função ou a sobrevida das células do sangue, bem como os órgãos responsáveis por sua formação e circulação — principalmente a medula óssea, o baço e os linfonodos.

## Condições benignas e onco-hematológicas

O termo abrange um universo amplo e muito diverso de diagnósticos:

- **Condições hematológicas benignas:** incluem as anemias carenciais e hereditárias, alterações da coagulação (como trombofilias e distúrbios hemorrágicos) e alterações benignas de plaquetas ou leucócitos;
- **Condições onco-hematológicas:** envolvem alterações clonais da medula óssea ou do sistema linfático, como leucemias, linfomas, mieloma múltiplo e síndromes mielodisplásicas.

## Avanços científicos e cuidado individualizado

Nas últimas décadas, a Hematologia passou por avanços expressivos no diagnóstico molecular, nas terapias-alvo, na imunoterapia e nos protocolos de Transplante de Medula Óssea. Hoje, cada caso é avaliado de forma altamente individualizada, considerando características biológicas específicas, idade clínica e objetivos de qualidade de vida do paciente.`,
    },
    {
      id: "art-5",
      slug: "o-que-e-o-transplante-de-medula-ossea",
      title: "O que é o Transplante de Medula Óssea?",
      summary:
        "Uma explicação clara e cientificamente responsável sobre o Transplante de Medula Óssea (TMO), suas modalidades, indicações gerais e etapas do acompanhamento.",
      coverImage: "/images/tmo-editorial.svg",
      category: "Transplante de Medula Óssea",
      publishedAt: "2026-11-14",
      author: "Dr. Celso Massumoto",
      readTime: "6 min de leitura",
      seoTitle:
        "O que é o Transplante de Medula Óssea (TMO)? | Dr. Celso Massumoto",
      seoDescription:
        "Entenda o que é o Transplante de Medula Óssea, suas modalidades (autólogo e alogênico) e a importância do acompanhamento especializado.",
      content: `O Transplante de Medula Óssea (TMO), também denominado transplante de células-tronco hematopoéticas, é um procedimento médico de alta complexidade que tem como objetivo substituir ou restaurar a medula óssea doente ou comprometida por células-tronco saudáveis capazes de produzir novas células sanguíneas.

## Modalidades de TMO

De modo geral, existem duas principais modalidades, definidas conforme a origem das células-tronco:

- **Transplante Autólogo:** utiliza as próprias células-tronco do paciente, previamente coletadas e criopreservadas antes de um tratamento intensivo de condicionamento;
- **Transplante Alogênico:** utiliza células-tronco de um doador compatível — que pode ser um familiar ou um doador voluntário cadastrado em bancos de medula óssea.

## Indicações e avaliação criteriosa

O TMO não é indicado para todos os pacientes nem para todas as doenças hematológicas. Sua indicação depende de uma avaliação rigorosa do diagnóstico, da resposta aos tratamentos prévios, das condições clínicas gerais e da análise de riscos e benefícios em cada situação.

## O cuidado em cada etapa

Do preparo pré-transplante (condicionamento) à infusão das células e ao acompanhamento pós-TMO, a atuação integrada de equipe especializada é determinante para monitorar a recuperação medular, prevenir complicações infecciosas e oferecer suporte próximo ao paciente e à família.`,
    },
    {
      id: "art-6",
      slug: "quando-procurar-um-hematologista",
      title: "Quando procurar um hematologista?",
      summary:
        "Saiba quais sintomas, achados laboratoriais e encaminhamentos médicos indicam o momento adequado para uma consulta com o especialista em Hematologia.",
      coverImage: "/images/consulta-acolhimento.svg",
      category: "Orientação ao Paciente",
      publishedAt: "2026-11-20",
      author: "Dr. Celso Massumoto",
      readTime: "4 min de leitura",
      seoTitle: "Quando procurar um hematologista? | Dr. Celso Massumoto",
      seoDescription:
        "Descubra quando é recomendado consultar um médico hematologista e como funciona a avaliação inicial.",
      content: `Muitas pessoas só descobrem o papel do hematologista quando recebem um encaminhamento após um exame de rotina. O hematologista é o médico especialista no diagnóstico e tratamento das doenças do sangue, da medula óssea, dos gânglios linfáticos e da coagulação.

## Motivos frequentes para agendar uma avaliação

- Alterações persistentes no hemograma (anemia, leucócitos altos ou baixos, plaquetas alteradas);
- Suspeita ou diagnóstico de distúrbios de coagulação, tromboses de repetição ou sangramentos anormais;
- Aumento persistente de gânglios linfáticos (ínguas) no pescoço, axilas ou virilha;
- Fadiga inexplicada acompanhada de alterações laboratoriais;
- Necessidade de segunda opinião em doenças hematológicas ou avaliação para Transplante de Medula Óssea (TMO).

## Como se preparar para a consulta

Levar exames anteriores — mesmo os antigos — é muito útil, pois permite ao médico comparar a evolução dos parâmetros ao longo do tempo. Anotar medicamentos em uso e dúvidas principais também contribui para uma consulta clara, acolhedora e objetiva.`,
    },
  ],
  instagramHighlights: [
    {
      id: "ig-1",
      title: "Entendendo o Hemograma Completo",
      caption:
        "O que significam as séries vermelha, branca e plaquetária e quando uma variação merece atenção médica.",
      mediaType: "image",
      imageUrl: "/images/hematologia-laboratorio.svg",
      postUrl: "https://www.instagram.com/drcelsomassumoto/",
      publishedAt: "2026-11-18",
    },
    {
      id: "ig-2",
      title: "Transplante de Medula Óssea: etapas do cuidado",
      caption:
        "Informação responsável sobre avaliação de indicação, preparo e acompanhamento especializado no TMO.",
      mediaType: "video",
      imageUrl: "/images/tmo-editorial.svg",
      postUrl: "https://www.instagram.com/drcelsomassumoto/",
      publishedAt: "2026-11-10",
    },
    {
      id: "ig-3",
      title: "Anemia: por que investigar a causa?",
      caption:
        "Nem toda anemia é falta de ferro. Conhecer a origem do quadro é o primeiro passo para o tratamento correto.",
      mediaType: "image",
      imageUrl: "/images/consulta-acolhimento.svg",
      postUrl: "https://www.instagram.com/drcelsomassumoto/",
      publishedAt: "2026-11-02",
    },
  ],
  contactMessages: [],
};

async function ensureDbFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(INITIAL_DB, null, 2), "utf-8");
  }
}

export async function readDb(): Promise<Database> {
  await ensureDbFile();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as Database;
}

export async function writeDb(data: Database): Promise<void> {
  await ensureDbFile();
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
