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
・別のコントラクトアドレスが生成されます。




## advance
ローカルチェーンデプロイしていじってみよう

```shell
$ npx hardhat node

# 別タブ
$ npx hardhat console
> ...
```
