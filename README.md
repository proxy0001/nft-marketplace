# NFT Marketplace
This is our first DApp, Learning how to build a DApp by doing a small project that connects your wallet and show your NFTs.

[Online Demo](https://nft-marketplace-1.vercel.app/)

## 寫在最前面

注意!!!
- 目前一進頁面就會一直去抓 erc721 的交易資料，還沒測試過大量資料的時候會如何
- 鍊只有支援 etheruem，其他都會有問題，因為目前只有接 主網的 erc721 資料

做到的
- 可以用錢包登入
- 可以切換鍊，但功能不齊全，基本只有 Etheruem 使用
- 會呈現自己錢包裡面有的 NFT，理論上應該會全部都跑出來
- 只有接 erc721
- 抓過的資料會緩存在 indexedDB
- API 都有透過 react-query 緩存

沒做到的
- 其他錢包沒測試
- 其他鍊功能不齊全
- 切換鍊之後，應該有很多 Bugs
- 沒做分頁、錯誤處理、測試等
- 還沒接 erc1155
- 進頁面會閃一下，還不知道如何處理
- 更多的資訊還沒取得跟呈現

## Week 1 小結
感覺一口氣接觸太多不熟悉的東西，有點腦死，然後還生病。抓資料使用 opensea-js 會簡單很多，整個專案在第一週的目標完成度也會比較高。選擇下面這個流程來獲取使用者擁有的 NFTs，就目標達成來說，非常不好，但就學習上來說，真的是收穫滿滿。

1. 通過 infiniteQuery 跟 etherscan AIP 獲取當前用戶的所有erc721交易記錄
2. 從交易記錄中找出已經交易過的 Token 及其合約，將爬取到的區塊鏈號緩存起來。 同一用戶下次會繼續從這裡搜索
3. 利用 wagmi 的 useContractReads 執行上面的合約，找出 owner 和 TokenURI，並以此過濾出擁有的 NFTs
4. 根據上面獲取到的 TokenURI，使用 wagmi 的 useQueries 批次獲取 metadata。
5. 將數據整理緩存到 indexedDB 中，並更新當前用戶擁有的 NFTs。

以下是除了腦死以外的收穫
- 第一次做 Dapp
- 第一次使用 wagmi
- 第一次使用 Chakra-UI
- 第一次使用 Dexie & indexedDB
- 第一次大量使用 React Hooks 的方式解決問題
- 學習 React 第二週，對 React Hooks + async 熟悉很多
- 踩了更多的 Next.js + 其他東西的坑
- 對 TypeScript 的泛型多熟悉了一些

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


### Day 1

今天主要就是學習使用 wagmi 。首先先建立環境吧！

#### 建立環境
預計把 Next.js 視為標準配備，所以就直接上吧！用 [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 建立基本環境，包含 TypeScript 跟 ESLint。

```
npx create-next-app@latest nft-marketplace --typescript --eslint
```

然後裝 Chakra UI ，我們是基於 Next.js 所以看[官網這篇](https://chakra-ui.com/getting-started/nextjs-guide)。然後 Setup Provider，應該是為了要讓子組件能夠共享許多東西，需要用 ChakraProvider 把將 APP 的 Root 包起來。

```
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
```

```typescript
// /pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
```

基本上這樣就可以用了，但我們把其他的設置也看一下，應該都滿常用的。

#### Customizing theme
可以自定義 theme，然後丟入 CHakraProvider 即可。基本要照著他定義的格式設置，超級多。我們對 Color Mode 比較有興趣，試著調整一下初始 Color Mode。首先先建立 ./theme/index.ts 放修改的設置。基本上照著[官網說明](https://chakra-ui.com/docs/styled-system/customize-theme)即可。這邊只先修改初始 Mode 為 dark 。
```typescript
// /theme/index.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
}

const theme = extendTheme({ config })
export default theme
```

接著要記得把 新的 theme 注入給 ChakraProvider。
```typescript
// /pages/_app.js
// 3. Pass the new theme to `ChakraProvider`
function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
```

#### [Adding the ColorModeScript](https://chakra-ui.com/docs/styled-system/color-mode#adding-the-colormodescript)

然後要加一個東西，ColorModeScript，主要是為了在 HTML 讀取到 body 之前，就可以抓到儲存在 local storage 的使用者色彩模式偏好紀錄。Next.js 的話要加在 _document.tsx 這裡。這隻初始化的時候不會存在，要修改的話，需要自己新增出來覆蓋掉預設。根據[官網](https://nextjs.org/docs/advanced-features/custom-document)，預設是長這樣：
```typescript
// /pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```
根據[chakra 的說明](https://chakra-ui.com/docs/styled-system/color-mode#for-nextjs)我們調整成這樣：
```typescript
// pages/_document.js
import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from './theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

但是這有個很奇怪的地方，Next.js 是 Server Side Render ...，在 Server 上產 HTML 的時侯，沒辦法拿到 Client 的 local storage 才對。也就是說，實際上這在 Nuxt.js 上應該沒屁用，如果會動，應該還是先產生 body 再改變 theme 的感覺，視覺上會閃一下。解決方法要看他官網這裡的[說明](https://chakra-ui.com/docs/styled-system/color-mode#add-colormodemanager-optional-for-ssr)，也就是說要用到 Next.js SSR 的模式，當使用者請求 HTML 的時候，將 request 裡的帶的 cookie 塞進去給 ChakraProvider，產出來的樣式就會是使用者的偏好紀錄。然後上面提到的 ColorModeScript，基本上就是無用的，可以刪掉了 🙄

#### [Add colorModeManager (Optional, for SSR)](https://chakra-ui.com/docs/styled-system/color-mode#add-colormodemanager-optional-for-ssr)

我們要新增一隻 /components/Chakra.tsx，會回傳裝飾後的 ChakraProvider，以及自定義一隻給 Next.js 用來執行 SSR 的函式 getServerSideProps 讓頁面使用，詳細看 Next.js 的[官方說明]((https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props))。

第一個部分就是根據有沒有 cookies 改變 ChakraProvider 的狀態，如果有就改用 cookieStorageManager，沒有就用預設的 localStorageManager。然後回傳新的 ChakraProvider 定義。

第二個部分就是定義一隻共用的 getServerSideProps 給其他頁面要執行 SSR 時，會從 request 的 header 裡，拿出 cookie 輸入給 page，到時候會是 Next.js 要渲染 HTML 時調用的。

我們依照官網範例做了一些修改，因為幾個原因:
1. 範例不是 TypeScript，只好自己翻找 Type 出來定義
2. 他的範例不太貼心，其他要給 ChakraProvider 的 props 沒有綁在回傳的上面，這樣變成以後要改 ChakraProvider 都要回來這隻身上改，很不直觀。

```typescript
// /components/Chakra.tsx
import type { GetServerSidePropsContext } from 'next'
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
  ChakraProviderProps,
  ColorModeProviderProps,
} from '@chakra-ui/react'

type ChakraProviderWrap = ChakraProviderProps & { cookies: string | undefined }

export function Chakra({ cookies, children, ...restProps }: ChakraProviderWrap): JSX.Element {
  // b) Pass `colorModeManager` prop
  const colorModeManager: ColorModeProviderProps["colorModeManager"] =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager
  return (
    <ChakraProvider colorModeManager={colorModeManager} {...restProps}>
      {children}
    </ChakraProvider>
  )
}

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }: GetServerSidePropsContext) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  }
}
```

然後去 _app.tsx 將原本的 ChakraProvider 改成我們剛剛做的那隻
```typescript
// setup your wrapper in the _app file (e.g: pages/_app.js)
import { Chakra } from "../components/Chakra";
import type { AppProps } from 'next/app'
import theme from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  return <Chakra cookies={pageProps.cookies} theme={theme}>
    <Component {...pageProps} />
  </Chakra>
}
```

以及去到頁面上，設定 Next.js 觸發 SSR 機制，設定方式是在最底下 export 一隻 getServerSideProps，這邊就是 export 我們剛剛寫的共用的那隻。
```typescript
// re-export the reusable `getServerSideProps` function
export { getServerSideProps } from "../components/Chakra"
```

然後可以把 _document.tsx 我們剛剛加的 ColorModeScript 刪掉了 🙄，實際上可以砍掉 _document.tsx 整隻了 🙄

最後去 index.tsx 上面改頁面內容，新增一個可以切換 Color Mode 的按鈕，試試效果。
```jsx
export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div>
          <Button onClick={toggleColorMode} variant='ghost'>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
    </div>
  )
}
```

要看成功與否可以 console.log cookie 出來看看有沒有接到，畫面上的效果比較不明顯，但是是看得出來的。如果把 index.tsx 的 export getServerSideProps 關掉，就會變成預設的模式，這個時候畫面上轉換 theme 的時候，會有一瞬間閃動，原因就是 Theme 的改動實際上是在拿到 HTML 的 body 之後才產生作用的，因為 Next.js 一開始產的 HTML 並不知道現在使用者的預設 Color Mode 改變了。但要注意 SSR 的開銷還是比較大的，這部分的衡量就看狀況而異吧。原理可以看看[這篇](https://ithelp.ithome.com.tw/articles/10266781)

### wagmi

照著 [wagmi](https://wagmi.sh/) 官網安裝 wagmi 跟 ethers。
```
npm i wagmi ethers
```

#### 小結
就這樣，結果今天就搞這個而已 ...，原本是要花時間在 wagmi 上的，結果都在搞 Chakra UI + Next.js。 Chakra UI 的那個說明跟範例怎麼看怎麼不順，害得我一股腦想搞懂它到底在幹嘛，也就順手了解了一點 Next.js 的機制。明天要專心在 wagmi 上了！

### Day 2
今天要專心在 wagmi 的研究上，但先補充一點小東西。

#### [Conventional Commits](https://www.conventionalcommits.org/zh-hant/v1.0.0/)
前面有提到這次會開始用這個，順便裝了一些工具來幫助我們規範，不然之前的 commit 其實也沒確實遵守。
[使用 husky + commitlint 規範 Commit Message 格式是否符合要求](https://www.rickjiang.dev/blog/validate-commit-message-using-commitlint-and-husky)，這篇非常的方便，理解容易，複製貼上就可以開始使用了。

```
# Install commitlint cli and conventional config
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# Install Husky v6
npm install husky --save-dev

# Activate hooks
npx husky install

# Add hook
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

除此之外這次還一起找到了很多好東西，但這次還不實裝。這個 [Template](https://github.com/sozonome/nextarter-chakra) 很值得研究一下，他也是用 Next.js + Chakra-UI + TypeScript，配置好了許多實用工具如下：

- toolings for linting, formatting, and conventions configured
  - eslint
  - prettier
  - husky
  - lint-staged
  - commitlint
  - commitizen
  - standard-version
- PWA-ready
  - next-pwa
- SEO optimization configured
  - next-seo
  - next-sitemap
- e2e Test
  - playwright

另外這篇: [使用ESLint, Prettier, Husky, Lint-staged以及Commitizen提升專案品質及一致性](https://medium.com/@danielhu95/set-up-eslint-pipeline-zh-tw-990d7d9eb68e) 也可以參考。

#### 開始操作錢包

先照著首頁的範例試試看 https://wagmi.sh/，一上來就踩坑了，參考了[這篇](https://ethereum.stackexchange.com/questions/133612/error-hydration-failed-because-the-initial-ui-does-not-match-what-was-rendered)處理。主要都是在看 wagmi 的官網跟原始碼，看一下有哪些東西。

wagmi 針對 Alchemy, Infura 這兩個比較常見的 Provider 有比較完善的支援，剩下的是 public，提供了好幾個公共用的，最後是自定義用的 JSON RPC。出於私心，研究了一下原始碼都是怎麼寫的，想說試試看自己弄一個 Pocket 的 Provider。底層的 ethers.js 有提供 Pocket 的 Provider，想說照著原始碼的方式寫一個，是可以動的，但是後來幾天用起來好像還是有點怪怪的，就先關掉了。

然後嘗試一下 Config Wagmi 以及切換不同的 chain。大致上就完成了 header，可以切換 Chain 跟 使用不同類型的 Connector，但是我們只有試過 Metamask 而已。

### Day 3 & 4

把前幾天寫的 code 整理一下，然後就生病了.........躺了將近兩天

### Day 5

Survey 要怎麼獲取資料。
- opensea-js
- etherscan API
- alchemy SDK
- ...其他廠商出的

看了半天，比較完整的好像是 opensea-js，但聽說他們的 API key 很難申請？etherscan API 的文檔很清楚，也有不少基本用的，但是我們最需要的這隻[Get Address ERC721 Token Holding ](https://docs.etherscan.io/api-endpoints/tokens#get-address-erc721-token-holding) 要 Pro 才可以使用。然後其他的廠商出的 NFT 專用的 API，感覺都不是很主流使用的？而且都有收費機制，看來看去只有 opensea-js 比較主流，其他都好少資訊，不知道能用不能用。然後把一些 erc721 合約有提供的功能看了一下，想像要怎麼串起來。

最後選了一條比較麻煩的路線試試看，用 etherscan 的 API 取得 erc721 的交易紀錄，獲取使用者有交易過的合約跟 Token，再用 wagmi 打合約確認擁有者以及獲取 tokenURI，再根據 tokenURI 取得 metadata。

然後是緩存的問題，因為 Tx 資料量可能會比較多，最後選擇用 indexedDB，然後可以使用 dexie 這個 library，操作 indexedDB 會方便許多。

API 也需要緩存的機制，看起來比較主流的有 react-query 跟 react-SWR，看起來 react-query 比較完整，就選擇使用它了。

一邊 Survey、一邊嘗試實做看看，基本思路是可以運作的，但要處理這麼多非同步請求所串起來的流程，在不熟悉 React Hooks 的情況下，好像會頗辛苦，有一種要開天窗的感覺。


### Day 6 & Day 7

第六天基本上就是想盡辦法用 React hooks 的思路把整個流程實踐出來，最不熟悉的就是 React Hooks 如何加上 一堆 asnyc function 並且是有相依跟連續性質的。因為休息了兩天，時間變得很趕，又有各種東西要熟悉，感覺是真的要開天窗惹。

useNFT 這隻的流程：
1. 通過 infiniteQuery 不斷獲取當前用戶的所有erc721交易記錄
2. 從交易記錄中找出已經交易過的 Token 及其合約，將爬取到的區塊鏈號緩存起來。 同一用戶下次會繼續從這裡搜索
3. 利用 wagmi 的 useContractReads 執行上面的合約，找出 owner 和 TokenURI，並以此過濾出擁有的 NFTs
4. 根據上面獲取到的 TokenURI，使用 wagmi 的 useQueries 批次獲取 metadata。
5. 將數據整理緩存到 indexedDB 中，並更新當前用戶擁有的 NFTs。

第六天大致上寫到 step 3，第七天把 step 4 跟整個流程順一次。第七天一直遇到無限 re-render 的問題，最後參考了些資料，用 useMemo 跟 useCallback 處理掉了。用 useQueries 的時候又遇到一次，參考了[這篇](https://github.com/TanStack/query/issues/3049)的解決方法。最後快速簡單的把呈現介面做了一下，跟紀錄。

