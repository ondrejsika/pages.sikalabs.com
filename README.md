[pages.sikalabs.com](https://pages.sikalabs.com) | [SikaLabs (sikalabs.com)](https://sikalabs.com) | [Ondrej Sika (sika.io)](https://sika.io)

# pages.sikalabs.com

pages.sikalabs.com is a public website with shared how-to pages, such as how to install Terraform, Vault, or kubectl. We link to these pages from our client documentation, so common information lives in one place and is easy to keep up to date.

## Markdown versions for LLMs

Every page is also available as clean Markdown for LLMs by adding `.md` to its URL, for example [/install_kubectl.md](https://pages.sikalabs.com/install_kubectl.md) for [/install_kubectl](https://pages.sikalabs.com/install_kubectl). [/llms.txt](https://pages.sikalabs.com/llms.txt) lists all pages with links to their Markdown versions.

The `.md` files are generated from `content/*.mdx` by `scripts/generate-md.mjs` into `public/` (ignored by git). The script runs automatically before `npm run dev` and `npm run build`, or manually with:

```
npm run generate-md
```

The script removes training ads and layout-only JSX, turns `<InfoBox>` into blockquotes, and rewrites internal links to absolute `.md` URLs. When you edit content while `npm run dev` is running, run it again (or restart dev) to update the `.md` files.
