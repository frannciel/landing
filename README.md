# RecebeGov Landing Page

Landing page responsiva em Next.js para recrutamento de empresas para o programa piloto do RecebeGov.

## Executar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Configurar o formulário

O formulário envia os leads por e-mail usando Resend.

1. Crie uma conta em `resend.com`.
2. Valide o domínio que enviará os e-mails, ou use `onboarding@resend.dev` durante os testes.
3. Copie `.env.example` para `.env.local`.
4. Preencha:
   - `RESEND_API_KEY`
   - `LEADS_EMAIL`
   - `FROM_EMAIL`
5. No Vercel, adicione as mesmas variáveis em **Settings > Environment Variables**.

## Adicionar o vídeo

Abra `app/page.tsx`, localize `VIDEO_ID` e substitua pelo ID do vídeo do YouTube.

Exemplo: se o endereço for `https://www.youtube.com/watch?v=abc123`, use `abc123`.

## Publicar no GitHub e Vercel

```bash
git init
git add .
git commit -m "Landing page RecebeGov"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

No Vercel:

1. Clique em **Add New > Project**.
2. Importe o repositório do GitHub.
3. Adicione as variáveis de ambiente.
4. Clique em **Deploy**.

## Personalizações recomendadas antes da publicação

- Substituir `https://recebegov.vercel.app` em `app/layout.tsx` pelo domínio final.
- Informar o ID do vídeo.
- Configurar o Resend.
- Criar páginas próprias de Política de Privacidade e Termos de Uso antes de iniciar campanhas públicas.
- Revisar a redação com base no comportamento real da busca de dados e nas fontes utilizadas pelo produto.
