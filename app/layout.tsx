import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://recebegov.vercel.app"),
  title: "RecebeGov | Recebimentos de contratos federais",
  description: "Acompanhe pagamentos de contratos federais, notas e recebimentos em um único lugar. Participe do programa piloto do RecebeGov.",
  openGraph: {
    title: "RecebeGov | Controle de recebimentos federais",
    description: "Cadastre o CNPJ e acompanhe contratos federais, notas e pagamentos em painéis intuitivos.",
    images: ["/dashboard-recebimentos.png"],
    locale: "pt_BR",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
