# Wacoal Web Store Template Project

ワコール公式ECサイト用のVite + Nunjucks + SCSS + Biomeテンプレートプロジェクト

## 技術スタック

- **ビルドツール**: Vite 6.3.5
- **テンプレートエンジン**: Nunjucks (@vituum/vite-plugin-nunjucks)
- **CSSプリプロセッサ**: Sass + LightningCSS
- **JavaScriptリンター/フォーマッター**: Biome 2.1.3
- **CSS リンター**: Stylelint
- **HTMLリンター**: Markuplint
- **E2Eテスト**: Playwright
- **アクセシビリティテスト**: @axe-core/playwright

## Command

### init：初期設定

```bash
npm i
```

### .envファイルの編集

FILE_NAME：ビルド時のディレクトリ名になります
ASSETS_PATH：ビルド時のディレクトリ名になります

### 開発モード時の相対パス

開発時と本番でcssから画像までの相対パスが異なるため、Viteの設定で開発時と本番の相対パスを切り替えています。
`scss`から画像を参照する際は、以下のように変数`$base-dir`を挟むようにしてください。

background-image: url($base-dir + 'img/master/icon_arrow01.svg' );

### development：開発

```bash
npm run dev
```

開発サーバーは `http://localhost:4173` で起動します。

### build：納品データ作成

```bash
npm run build
```

ステージング用とプロダクション用のビルドを並行実行し、HTMLの整形も行います。

| 説明                                          |
| :-------------------------------------------- |
| ステージング用ビルド (`../dist/staging`)      |
| プロダクション用ビルド (`../dist/production`) |

### check：コードチェック

```bash
npm run check
```

| npm script           | command                                    |                                |
| :------------------- | :----------------------------------------- | :----------------------------- |
| `npm run check:js`   | `biome check src/js/**/*.js`               | JSチェック(lint/format/import) |
| `npm run check:html` | `markuplint './dist/production/**/*.html'` | HTMLチェック                   |
| `npm run check:css`  | `stylelint 'src/css/**/*.{css,scss}'`      | CSSチェック                    |

### fix：コード修正

```bash
npm run fix
```

| npm script        | command                                     |                            |
| :---------------- | :------------------------------------------ | :------------------------- |
| `npm run fix:js`  | `biome check --write src/js/**/*.js`        | JS修正(lint/format/import) |
| `npm run fix:css` | `stylelint --fix 'src/css/**/*.{css,scss}'` | CSS修正                    |

## Directory

```
├─ dist/                              # ビルド出力ディレクトリ
│   ├─ staging/                       # ステージング環境用
│   └─ production/                    # プロダクション環境用
├─ src/                               # ソースコード
│   ├─ asset/                         # 静的ファイル
│   │   └─ img/                       # 画像ファイル
│   │       ├─ sample_logo.svg
│   │       └─ sample.png
│   ├─ css/                           # スタイルシート
│   │   ├─ foundation/                # 基盤レイヤー
│   │   │   ├─ mixin/                 # SCSSの@mixin, @function
│   │   │   │   ├─ _function.scss
│   │   │   │   ├─ _index.scss
│   │   │   │   └─ _mixin.scss
│   │   │   └─ variable/              # CSS変数
│   │   │       ├─ _color.scss
│   │   │       ├─ _index.scss
│   │   │       └─ _keyframes.scss
│   │   ├─ global/                    # グローバル変数
│   │   │   └─ _variables.scss
│   │   ├─ object/                    # オブジェクトレイヤー
│   │   │   ├─ component/             # UIコンポーネント（再利用可能な最小単位）
│   │   │   │   └─ _c-sample.scss
│   │   │   ├─ page/                  # ページ固有のスタイル
│   │   │   │   └─ _p-sample.scss
│   │   │   └─ utility/               # ユーティリティクラス
│   │   │       └─ _display.scss
│   │   └─ styles.scss                # メインスタイルシート
│   ├─ data/                          # データファイル
│   │   └─ site.json                  # サイト共通データ
│   ├─ js/                            # JavaScript
│   │   ├─ modules/                   # モジュール
│   │   │   └─ menu.js
│   │   └─ main.js                    # メインJSファイル
│   ├─ layouts/                       # Nunjucksレイアウト
│   │   └─ main.njk                   # メインレイアウト
│   └─ pages/                         # ページテンプレート
│       └─ topics/
│           └─ feature/
│               └─ template.njk       # サンプルページテンプレート
├─ biome.json                         # Biome設定
├─ package.json                       # npm設定
├─ playwright.config.js               # Playwrightテスト設定
├─ vite.config.js                     # Vite設定
└─ README.md
```

## 開発環境とビルド設定

### 環境変数

プロジェクトは2つの環境で動作します：

- **development (staging)**: ステージング環境用（相対パス使用）
- **production**: プロダクション環境用（絶対パス + `?$staticlink$`付与）

### Nunjucksテンプレート

#### フィルター機能

- `hrefPath`: リンクパスの環境別変換
    - ステージング: 相対パス
    - プロダクション: 絶対パス
- `imgPath`: 画像パスの環境別変換
    - ステージング: ルートパス
    - プロダクション: `asset` + `ASSETS_PATH` + `?$staticlink$`

#### 使用例

```njk
<!-- リンク -->
<a href="{{ '/about/' | hrefPath }}">リンク</a>

<!-- 画像 -->
<img src="{{ '/img/sample.png' | imgPath }}" alt="">
```

### CSS設定

#### SCSS設定

```scss
// 自動的にインポートされるファイル
@use 'sass:math';
@use '@/css/foundation/mixin' as *;
@use '@/css/foundation/variable' as *;
```

#### LightningCSS

- Browserslistの設定に基づいて最適化
- `browserslist-config-baseline`を使用
- CSS Transformerとして使用

### JavaScript設定

#### 主要ライブラリ

- **GSAP**: アニメーション（ScrollTrigger含む）
- **Splide**: スライダー
- **modern-normalize**: CSSリセット

## CSS設計指針

### FLOCSS アーキテクチャ

このプロジェクトでは[FLOCSS](https://github.com/hiloki/flocss)をベースにしたCSS設計を採用しています。

#### Foundation レイヤー

- `mixin/`: SCSSの@mixin, @function
- `variable/`: CSS変数、色定義、キーフレーム

#### Object レイヤー

- **Component**: 再利用可能なUIコンポーネント
    - 例: ボタン、カード、フォーム要素
    - ファイル名: `_c-*.scss`

- **Page**: ページ固有のスタイル
    - Component の組み合わせや、ページ特有のレイアウト
    - ファイル名: `_p-*.scss`
    - 複雑なページの場合は `page/pagename/_p-pagename-*.scss` のように細分化

- **Utility**: ユーティリティクラス
    - 単一目的のヘルパークラス
    - ファイル名: `_u-*.scss`

### 設計ガイドライン

- **BEM記法**を推奨: `.block__element--modifier`
- **コンポーネントの分割**: 見通しを良くするため、大きなファイルは機能ごとに分割
- **再利用性**: Componentは他のページでも使用できるよう汎用的に設計

### リセットCSS

`modern-normalize`を使用してブラウザ間の差異を正規化しています。

## 開発ツール設定

### Biome

JavaScriptのリンティング・フォーマッティングに使用：

- ESLint + Prettierの代替
- Import文の自動整理
- Single quote使用
- EditorConfigに準拠

### Stylelint

CSSのリンティングに使用：

- `stylelint-config-standard-scss`: SCSS標準ルール
- `stylelint-config-recess-order`: プロパティの並び順

### Markuplint

HTMLのバリデーションとアクセシビリティチェックに使用。

## 参考資料

- [FLOCSS](https://github.com/hiloki/flocss) - CSS設計手法
- [BEM](https://getbem.com/introduction/) - 命名規則
- [rscss](https://rstacruz.github.io/rscss/) - CSS設計アプローチ
- [Vite](https://vite.dev/) - ビルドツール
- [Nunjucks](https://mozilla.github.io/nunjucks/) - テンプレートエンジン
- [Biome](https://biomejs.dev/) - JavaScript linter/formatter
