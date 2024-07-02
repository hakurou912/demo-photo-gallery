## About this

独学でNext.jsを学んでいます。  
成果物として、firebaseのstorageから取得した画像をPinerestのようなグリッドレイアウトで表示する画面を作成しました。 
グリッドレイアウトを実現するために、今回はreact-stack-gridを利用しました。 
下にスクロールするたび画像が表示されます（全部で100枚ほど）

使用したもの
- [picsum.photos](https://picsum.photos/) - デモ用に用意した画像
- [Bootstrap@5.3.0](https://getbootstrap.jp/)  - スタイル適用
- [react-stack-grid](https://www.npmjs.com/package/react-stack-grid)  - スタイル適用（画像表示）  
- Next.js 14.2.4

```bash
npm install firebase  
npm install i dotenv  
npm install react-stack-grid
```

理解したこと
- NextResponseを利用したAPI実装方法  
- API取得したデータを画面に表示する方法  
- firebaseとの連携
- firebaseのstorageから画像URLを取得する実装方法  
- 外部から取得した画像の幅と高さを取得する方法  
- IntersectionObserverを使ったスクロール検知  
- react-stack-gridの利用方法  