export const DOCTOR_INFO = {
  name: "Dr. Celso Massumoto",
  specialty: "Hematologia",
  subspecialty: "Transplante de Medula Óssea (TMO)",
  clinicalRole: "Diretor Clínico da Oncocenter",
  academicTitle: "Doutor e Mestre pela FMUSP",
  fellowship: "Hematology Fellow — Fred Hutchinson Cancer Research Center (Seattle, EUA)",
  crm: "CRM-SP 48392",
  instagramHandle: "@drcelsomassumoto",
  instagramUrl: "https://www.instagram.com/drcelsomassumoto/",
  institutionName: "Oncocenter",
  institutionUrl: "https://oncocentermedicos.com.br/",
  whatsappNumber: "5511974980162",
  whatsappMessage:
    "Olá! Gostaria de obter informações sobre agendamento de consulta com o Dr. Celso Massumoto.",
  address: {
    street: "R. Adma Jafet, 74 – Conjunto 101",
    neighborhood: "Bela Vista",
    cityState: "São Paulo/SP",
    full: "R. Adma Jafet, 74 – Conjunto 101, São Paulo/SP",
    mapsQuery: "R.+Adma+Jafet,+74,+São+Paulo+-+SP",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=R.+Adma+Jafet,+74,+Bela+Vista,+São+Paulo,+SP",
    embedUrl:
      "https://www.google.com/maps?q=R.+Adma+Jafet,+74,+São+Paulo+-+SP&output=embed",
  },
} as const;

export function getWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage ?? DOCTOR_INFO.whatsappMessage);
  return `https://api.whatsapp.com/send?phone=${DOCTOR_INFO.whatsappNumber}&text=${text}`;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  institution: string;
  description: string;
  badge?: string;
}

export const DOCTOR_TIMELINE: TimelineMilestone[] = [
  {
    year: "1983",
    title: "Graduação em Medicina",
    institution: "Centro de Ciências Médicas e Biológicas de Sorocaba / PUC-SP",
    description:
      "Conclusão da formação médica de base com sólida dedicação às ciências biológicas e clínicas.",
  },
  {
    year: "1984",
    title: "Residência Médica em Clínica Médica",
    institution: "PUC-SP / CCMB Sorocaba",
    description:
      "Aprofundamento no raciocínio clínico geral, diagnóstico diferencial e condutas hospitalares integradas.",
  },
  {
    year: "1986",
    title: "Residência Médica em Hematologia",
    institution: "Faculdade de Medicina da Universidade de São Paulo (FMUSP)",
    description:
      "Especialização médica avançada no estudo, diagnóstico e tratamento das doenças do sangue e medula óssea no principal centro de excelência do país.",
    badge: "FMUSP",
  },
  {
    year: "1988",
    title: "Mestrado em Medicina",
    institution: "Faculdade de Medicina da Universidade de São Paulo (FMUSP)",
    description:
      "Desenvolvimento de pesquisa científica acadêmica e obtenção do título de Mestre em Medicina pela USP.",
    badge: "Mestrado USP",
  },
  {
    year: "1990 – 1992",
    title: "Hematology Fellow (Experiência no Exterior)",
    institution: "Fred Hutchinson Cancer Research Center (Seattle, WA – USA)",
    description:
      "Fellowship internacional no pioneiro e maior centro de referência mundial em Transplante de Medula Óssea e pesquisa onco-hematológica (instituição do pioneiro e Nobel Dr. E. Donnall Thomas).",
    badge: "EUA · Fred Hutch",
  },
  {
    year: "1993",
    title: "Doutorado em Medicina (PhD)",
    institution: "Faculdade de Medicina da Universidade de São Paulo (FMUSP)",
    description:
      "Defesa de tese e titulação como Doutor em Medicina pela USP, consolidando o rigor científico na conduta médica.",
    badge: "Doutorado USP",
  },
  {
    year: "Presente",
    title: "Diretor Clínico da Oncocenter e Consultório Individual",
    institution: "Oncocenter & Consultório Dr. Celso Massumoto (São Paulo/SP)",
    description:
      "Liderança clínica, assistência hematológica especializada, acompanhamento de Transplante de Medula Óssea e dedicação contínua ao cuidado dos pacientes.",
    badge: "Direção Clínica",
  },
];

export const PRACTICE_AREAS = [
  {
    id: "hematologia",
    title: "Hematologia",
    description:
      "Avaliação clínica abrangente das condições relacionadas ao sangue, medula óssea e sistema linfático, com investigação criteriosa e plano de cuidado individualizado.",
    slug: "quando-procurar-um-hematologista",
    icon: "droplet",
  },
  {
    id: "anemias",
    title: "Anemias",
    description:
      "Diagnóstico diferencial das diversas causas de anemia — carenciais, inflamatórias, hemolíticas ou medulares — buscando tratar a origem do quadro com precisão.",
    slug: "o-que-e-anemia",
    icon: "activity",
  },
  {
    id: "hemograma",
    title: "Alterações no Hemograma",
    description:
      "Interpretação especializada de alterações em glóbulos vermelhos, leucócitos e plaquetas, distinguindo achados benignos de situações que exigem investigação aprofundada.",
    slug: "como-identificar-alteracoes-no-hemograma",
    icon: "microscope",
  },
  {
    id: "doencas-hematologicas",
    title: "Doenças Hematológicas",
    description:
      "Acompanhamento de distúrbios hematológicos benignos e onco-hematológicos com conduta baseada em evidências científicas atualizadas e acolhimento contínuo.",
    slug: "o-que-e-uma-doenca-hematologica",
    icon: "shield",
  },
  {
    id: "tmo",
    title: "Transplante de Medula Óssea (TMO)",
    description:
      "Avaliação criteriosa de indicação, protocolos e acompanhamento especializado fundamentado em experiência nacional (FMUSP) e internacional (Fred Hutchinson Cancer Center – EUA).",
    slug: "o-que-e-o-transplante-de-medula-ossea",
    icon: "heartPulse",
  },
  {
    id: "avaliacao-especializada",
    title: "Avaliação Hematológica Especializada",
    description:
      "Segunda opinião médica, investigação diagnóstica integrada e suporte multidisciplinar para pacientes encaminhados por outras especialidades.",
    slug: "quando-investigar-uma-anemia",
    icon: "stethoscope",
  },
] as const;
