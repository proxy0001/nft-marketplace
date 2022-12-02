# NFT Marketplace
This is our first DApp, Learning how to build a DApp by doing a small project that connects your wallet and show your NFTs.

# NFT Marketplace
Our first DApp, Learning how to build a DApp by doing a small project that connects your wallet and show your NFTs.

## Getting Started
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 目標
- 完成一個 DApp，可以連上 MetaMask，展示自己的 NFTs。

## 過程紀錄

### Day 0
主要都在 survey，基礎概念之前就有些了解，因此著重在主流使用的構建方式。這次主要從以太坊的生態開始了解，包含智能合約、用戶介面、錢包互動方式等會使用到的工具。

#### 智能合約開發
Ethereum 開發智能合約的主流語言是 Solidity，Framework 比較多元一點：
- Hardhat: 逐漸主流
- Truffle Suite: 成熟先驅
- Foundry: 後勢可期
- Brownie: For Python
- Remix: online IDE (actually not framework)

大致是這些，選一種開始就可以開發智能合約了，現在入門可以考慮先從 Hardhat or Remix 開始，有看到一篇寫得不錯的 [Hardhat 教程](https://medium.com/my-blockchain-development-daily-journey/%E5%AE%8C%E6%95%B4%E7%9A%84hardhat%E5%AF%A6%E8%B8%90%E6%95%99%E7%A8%8B-a9b005aa4c12)。但這不是我們這次的主題，就先到這裡。[參考文章](https://zhuanlan.zhihu.com/p/459165804)

#### 用戶介面
基本上就是前端領域，但 React 生態更顯活躍，很常看到 Next.js 的身影，TypeScript 是基本配置，CSS 原本想繼續用 Tailwind，卻發現 Chakra UI 好多人用，決定試試。另外 pnpm 感覺也是勢頭很好。

#### 錢包互動
最主要 survey 的部分，Ethereum 上主要就是 web3.js 跟 ethers.js。web3.js 發跡較早，但現在入門感覺都選擇 ethers.js ，更簡單易用上手。原本想說要用 ethers.js 下去學習了，但看到了 wagmi，一個基於 ethers.js 用 React Hooks 包裝的 Library，更適合入門及一般使用。[這裡](https://wagmi.sh/react/comparison#overview)是 wagmi 自己提出的跟其他同類型的 Library: web3-react、useDApp 的比較，可以參考。

總之看了一下 wagmi 的文件之後，發現他已經實現了許多基礎實用的功能，並且文檔非常清楚，入門跟使用都容易，就決定用它摟。以現在來說，入門跟一般使用都建議從這裡開始，對於了解流程與脈絡更為容易，而後續不論是要研究他的做法，或是要自己另外擴充功能，也都有具有很好的參考價值。

#### cli 建置工具
[create-eth-app](https://github.com/paulrberg/create-eth-app) 看起來是個不錯的手腳架，但看了一下文檔跟使用[教學參考](https://ethereum.org/zh/developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/)，發現自己一知半解，表示自己可能對於實際開發情境還不夠了解，因此先跳過，等更熟悉之後再回來看看。

#### 其他重要概念與名詞
遇到一堆名詞像 Signer、Provider、ABI等，大概看了一下，覺得還需要搭配實際應用步驟一起了解可能更清楚些。

#### 另外這裡會 Follow Conventional Commits 的規範進行 Commit
[Conventional Commits](https://www.conventionalcommits.org/zh-hant/v1.0.0/): 就是 git commit 的規範，對應 [SemVer](https://semver.org/lang/zh-TW/)

#### 結論
感覺可以開始了～ 我們這裡會先著重在使用介面跟錢包互動，智能合約放後面一點，先了解概念就好。選擇使用 React、Next.js、Chakra UI、wagmi 開始！