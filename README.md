# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# hands on
## 必要なもの

・このリポジトリ

・エディタ（VS Codeがおすすめ。）

・テスト用の秘密鍵（本番でもいいが、.envに残り続けるのが気持ち悪い人は別アカウントで）

・GoerliテストネットのETH

https://goerli-faucet.pk910.de/

・インフラプロバイダのKEYを取得

https://dashboard.alchemyapi.io/

※ Alchemyは開発者に対してEthererumのNodeを提供するサービス

Alchemy / Infraあたりが有名

https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/


## ゴール

・コントラクト開発するときのなんとなくのイメージを掴む

・既存のコントラクトから少し手を入れて、コードを改変してみる。

・（アドバンス）簡単なコントラクトを一から作れる。

※ 文法の理解はそのうち...


## 準備

```shell
$ git clone git@github.com:EthicalEatingAndEarn/hardhat-hands-on.git
```

```shell
$ cd hardhat-hands-on
$ yarn install
```

```shell
$ touch .env
```

## テストを動かしてGreeterの仕様を把握しよう

```shell
$ npx hardhat test test/GreeterTest.ts
```

※ hardhat shorthandというツールで `npx hardhat` を `hh` のみでショートカットできます。

https://hardhat.org/hardhat-runner/docs/guides/command-line-completion

タスク

・コードを眺めてみよう

・初期値を変えてみる（ `/deploy/01_greeter.ts` で変更可能。）

・テスト通す。

## テストネットにデプロイしてみよう

・ウォレットの秘密鍵（デプロイ時にガスを払うアカウント）

・AlchemyのAPI_KEY


テスト用の漏れてもいいアカウントの鍵を登録してください。（メタマスクのアカウントの詳細からいけます。）

```.env
PRIVATE_KEY="b00002c5d...."
ALCHEMY_API_KEY="NJRgdUMjZ3tb..."
```

※ GoerilテストネットのETHはこちらでマイニング可能

https://goerli-faucet.pk910.de/


Goerliテストネットにデプロイ

```shell
$ npx hardhat deploy --network goerli

ex:
Nothing to compile
No need to generate any newer typings.
deploying "Greeter" (tx: 0x4cbef8183e214108b863592b966cec2e7694c8150d315834bfefff79e5a5cf86)...: deployed at 0xe3189083bfD9158382E7BE569D9B6A19e6C67De6 with 383521 gas
```


constructorの中身は `/deploy/01_greeter.ts` で定義されています。

ここを変更すれば初期値を変えられます。


Tx確認

https://goerli.etherscan.io/


(ex)

Tx: https://goerli.etherscan.io/tx/0x4cbef8183e214108b863592b966cec2e7694c8150d315834bfefff79e5a5cf86

Contract: https://goerli.etherscan.io/address/0xe3189083bfD9158382E7BE569D9B6A19e6C67De6


## Goerliにデプロイされたコントラクトにトランザクションを送って、greetを変えてみよう

Goerliネットワークのコンソールに入って確認。

```shell
$ npx hardhat console --network goerli

> const Greeter = await ethers.getContractFactory("Greeter")
> let greeter = await ethers.getContractAt("Greeter", "ここにデプロイしたコントラクトアドレスを入れる")
> await greeter.greet()
'Hello'
```

変えてみる。

```shell
> await greeter.setGreeting("helloooo!!!")
→ txinfo...

> await greeter.greet()
```

## コントラクト自体を変更して再デプロイしてみよう。
タスク

・uintの変数countを追加(public)

・inc()メソッドを作成して、countを+1する。

↓ 変更後のコントラクト

https://github.com/EthicalEatingAndEarn/hardhat-hands-on/blob/update/contracts/Greeter.sol

※ 別のコントラクトアドレスが生成されます。

※ deployments/のjsonは上書き

```shell
$ npx hardhat deploy --network goerli

ex:
Generating typings for: 2 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 6 typings!
Compiled 2 Solidity files successfully
deploying "Greeter" (tx: 0x642a8f2ba0f59b4581df8c3efc32c81e757b3532401861ac902d98cf1081a4e0)...: deployed at 0x2A5b1D985870999fEe4A3E4ECdE04deC3460119A with 407952 gas
```

Goerliネットに接続して確認

・count変数にアクセス

・inc()メソッドを叩く

・count変数の確認


```shell
$ npx hardhat console --network goerli
> const Greeter = await ethers.getContractFactory("Greeter")
> let greeter = await ethers.getContractAt("Greeter", "ここにデプロイしたコントラクトアドレスを入れる")
> await greeter.count()
> await greeter.inc()
> await greeter.count()
> await greeter.inc()
> await greeter.count()
```


## 一個前にデプロイしたアドレスを確認してみよう

・count変数にアクセスができない

・inc()メソッドがない

→ スマートコントラクトの特徴


↓ ex
```shell
> const Greeter = await ethers.getContractFactory("Greeter")

> let greeter = await ethers.getContractAt("Greeter", "0xe3189083bfD9158382E7BE569D9B6A19e6C67De6")

> await greeter.count()
Uncaught:
Error: missing revert data in call exception; Transaction reverted without a reason string [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (data="0x", transaction={"from":"0x822E38d8cc0B128711fB92231b3330b18bBb5e34","to":"0xe3189083bfD9158382E7BE569D9B6A19e6C67De6","data":"0x06661abd","accessList":null}, error={"name":"ProviderError","code":-32000,"_isProviderError":true}, code=CALL_EXCEPTION, version=providers/5.6.8)
    at step (/Users/two_0109/git/hardhat-hands-on/node_modules/@ethersproject/providers/lib/json-rpc-provider.js:48:23)
    at EthersProviderWrapper.<anonymous> (/Users/two_0109/git/hardhat-hands-on/node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:603:20)
    at checkError (/Users/two_0109/git/hardhat-hands-on/node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:66:16)
    at Logger.throwError (/Users/two_0109/git/hardhat-hands-on/node_modules/@ethersproject/logger/src.ts/index.ts:273:20)
    at Logger.makeError (/Users/two_0109/git/hardhat-hands-on/node_modules/@ethersproject/logger/src.ts/index.ts:261:28) {
  reason: 'missing revert data in call exception; Transaction reverted without a reason string',
  code: 'CALL_EXCEPTION',
  data: '0x',
  transaction: {
    from: '0x822E38d8cc0B128711fB92231b3330b18bBb5e34',
    to: '0xe3189083bfD9158382E7BE569D9B6A19e6C67De6',
    data: '0x06661abd',
    accessList: null
  },
  error: ProviderError: execution reverted
      at HttpProvider.request (/Users/two_0109/git/hardhat-hands-on/node_modules/hardhat/src/internal/core/providers/http.ts:78:19)
      at LocalAccountsProvider.request (/Users/two_0109/git/hardhat-hands-on/node_modules/hardhat/src/internal/core/providers/accounts.ts:188:34)
      at processTicksAndRejections (node:internal/process/task_queues:96:5)
      at async EthersProviderWrapper.send (/Users/two_0109/git/hardhat-hands-on/node_modules/@nomiclabs/hardhat-ethers/src/internal/ethers-provider-wrapper.ts:13:20)
}


> await greeter.greet()
'helloooo!!!'

```


## advance
・ローカルチェーンデプロイしていじってみよう

テストネットだとテストETHとか手に入れるのがめんどくさいので。等

```shell
$ npx hardhat node

# 別タブ
$ npx hardhat console
> ...
```


・hardhatのタスクを作成してみよう
└ 自作コマンドを作成できる。

ref

https://hardhat.org/hardhat-runner/docs/advanced/create-task



## Next Action

・count変数を増やす/減らすコントラクトを一から作ってみる。

・何かゲームを作ってみる。

・クリプトゾンビ

Solidityの基礎

https://cryptozombies.io/jp/


・Solidity by Example

基礎/実用的なコードのサンプル集。写すだけでなくテストまで作成すると理解深まります。

ERC20/ERC721とかも一応あります。

https://solidity-by-example.org/


・openzeppelinでERC20とかをコーディング

「openzepplin erc20」 とかで検索



## References

・solidityのドキュメント

https://solidity-jp.readthedocs.io/ja/latest/index.html


・ethers.jsのドキュメント（主にフロントエンド）

https://docs.ethers.io/v5/


・ethereum-waffleドキュメント（テスト）

https://ethereum-waffle.readthedocs.io/en/latest/index.html


などなど...