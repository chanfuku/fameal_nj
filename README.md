# fameal_nj

### 環境構築方法
下記からvagrantとVirtualBoxをインストールしてください。  
https://www.vagrantup.com/downloads.html  
https://www.virtualbox.org/  

gitは各自でインストールしてくださいしてください。  
macだったら`brew install git`でいけるんじゃないかと。

下記をターミナル上で実行して下さい。
```bash
$git clone https://github.com/chanfuku/fameal_nj.git
$cd fameal_nj && vagrant up
```

5分程かかります。`boot fameal app`と表示されたら、ブラウザで192.168.33.10:3000にアクセスしてください。
famealのサイトが表示されたらOKです。ローカルのファイルを編集すると、仮想環境のファイルに同期されるので、192.168.33.10:3000で変更が確認できます。

### 環境が壊れたら
vagrant destroyで環境を壊してから、vagrant upで再構築してください。

```bash
$cd fameal_nj/
$vagrant destroy
$vagrant up
```
