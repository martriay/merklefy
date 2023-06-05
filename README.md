# Merklefy 🍃
[![Netlify Status](https://api.netlify.com/api/v1/badges/b312fd88-d78f-464d-a2a9-7c8997cf2f7f/deploy-status)](https://app.netlify.com/sites/merklefy/deploys)

Web app to generate merkle trees and proofs. Deployed at https://merklefy.marto.lol

![](https://github.com/martriay/merklefy/blob/main/merklefy.gif)

## To do

- [ ] Support custom schemas (today only `(address, uint256)` is supported)
- [ ] Generate proofs
- [ ] Validate proofs
- [ ] There's a [single merkle tree](https://github.com/martriay/merklefy/blob/main/app/page.tsx#L10-L12) that's not supported by the app due to _reasons_. Fix it.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Licence

Released under the MIT License.
