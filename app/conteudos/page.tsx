import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { readDb } from "@/lib/db";
import { ArticlesDirectory } from "@/components/ArticlesDirectory";

export const metadata: Metadata = {
  title: "Conteúdos e Educação em Saúde",
  description:
    "Artigos educativos sobre Hematologia, anemia, alterações no hemograma e Transplante de Medula Óssea escritos com rigor científico.",
};

async function ArticlesLoader() {
  await connection();
  const db = await readDb();
  const sorted = [...db.articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return <ArticlesDirectory articles={sorted} />;
}

export default function ConteudosPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-light-blue/60 to-white py-16 lg:py-20 border-b border-border-subtle/70">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-institutional">
            Educação em Saúde
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-navy">
            Informação de qualidade também faz parte do cuidado.
          </h1>
          <p className="text-base text-text-muted leading-relaxed">
            Publicações informativas sobre Hematologia, exames laboratoriais e Transplante de Medula Óssea para orientar pacientes e familiares com clareza.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-80 rounded-2xl bg-soft-gray animate-pulse border border-border-subtle"
                  />
                ))}
              </div>
            }
          >
            <ArticlesLoader />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
