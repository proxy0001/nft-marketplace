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

### was

照著 [wagmi](https://wagmi.sh/) 官網安裝 wagmi 跟 ethers。
```
npm i wagmi ethers
```

#### 小結
就這樣，結果今天就搞這個而已 ...，原本是要花時間在 wagmi 上的，結果都在搞 Chakra UI + Next.js。 Chakra UI 的那個說明跟範例怎麼看怎麼不順，害得我一股腦想搞懂它到底在幹嘛，也就順手了解了一點 Next.js 的機制。明天要專心在 wagmi 上了！