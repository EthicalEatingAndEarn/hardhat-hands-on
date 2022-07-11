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
必要なもの

・このリポジトリ

・テスト用の秘密鍵

・GoerliのETH

https://goerli-faucet.pk910.de/

・インフラプロバイダのKEYを取得

https://dashboard.alchemyapi.io/

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

一旦これだけでOK

テスト用の漏れてもいいアカウントの鍵を登録してください。（メタマスクのアカウントの詳細からいけます。）

```.env
PRIVATE_KEY="b00002c5d...."
```
※ GoerilテストネットのETHはこちらでマイニング可能

https://goerli-faucet.pk910.de/

## テストを動かしてGreeterの仕様を把握しよう

```shell
$ npx hardhat test test/GreeterTest.ts
```

タスク

・コードを眺めてみよう

・/deploy/01_greeter.ts のコンストラクタの中身を変えてみよう

・テストを通そう


## デプロイしてみよう

・APIKEYを.envに入れる。

```.env
ALCHEMY_API_KEY="NJRgdUMjZ3tb..."
```

Goerli
```shell
$ npx hardhat deploy --network goerli

ex:
Nothing to compile
No need to generate any newer typings.
deploying "Greeter" (tx: 0x4cbef8183e214108b863592b966cec2e7694c8150d315834bfefff79e5a5cf86)...: deployed at 0xe3189083bfD9158382E7BE569D9B6A19e6C67De6 with 383521 gas
```

Tx確認

https://goerli.etherscan.io/

## コントラクトにトランザクションを送って、greetを変えてみよう

Goerliネットワークのコンソールに入って確認。

```shell
$ npx hardhat console --network goerli

> const Greeter = await ethers.getContractFactory("Greeter")
> let greeter = await ethers.getContractAt("Greeter", "ここにデプロイしたコントラクトアドレスを入れる")
> await greeter.greet()
'こんにちわ'
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
ローカルチェーンデプロイしていじってみよう

テストネットだとテストETHとか手に入れるのがめんどくさいので。等

```shell
$ npx hardhat node

# 別タブ
$ npx hardhat console
> ...
```
