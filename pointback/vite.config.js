/*
  # Configでの環境変数の使用について
  https://vite.dev/config/#using-environment-variables-in-config
*/

import { defineConfig, loadEnv } from 'vite'
import vituum from 'vituum'
import { globSync } from 'glob'
import { browserslistToTargets } from 'lightningcss'
import { fileURLToPath } from 'url'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import vitePluginSsinc from 'vite-plugin-ssinc'
import sassGlobImports from 'vite-plugin-sass-glob-import'
import path from 'path'
import browserslist from 'browserslist'
import fs from 'fs'

// カスタムプラグイン：scriptタグからtype="module"とcrossorigin属性を削除、本番環境でパス調整
function removeModuleAttributes(isStg) {
  return {
    name: 'remove-module-attributes',
    apply: 'build',
    writeBundle(options, bundle) {
      // ビルド後のHTMLファイルを直接編集
      const outDir = options.dir
      const globPattern = path.join(outDir, '**/*.html')
      const htmlFiles = globSync(globPattern)

      htmlFiles.forEach(filePath => {
        try {
          let content = fs.readFileSync(filePath, 'utf-8')
          // type="module"属性を削除
          // content = content.replace(/\s*type="module"/g, '')
          // crossorigin属性を削除（属性値ありなしの両方に対応）
          content = content.replace(/\s*crossorigin(?:="[^"]*")?/g, '')

          // 本番環境（isStg = false）の場合、パスにasset/を追加
          if (!isStg) {
            // scriptタグのsrc属性を調整
            content = content.replace(
              /src="\/([^"]*\.js[^"]*)"/g,
              'src="asset/$1?$staticlink$"',
            )
            // linkタグのhref属性を調整（CSSファイル）
            content = content.replace(
              /href="\/([^"]*\.css[^"]*)"/g,
              'href="asset/$1?$staticlink$"',
            )
          }

          fs.writeFileSync(filePath, content, 'utf-8')
          console.log(`Updated: ${filePath}`)
        } catch (error) {
          console.error(`Error processing ${filePath}:`, error)
        }
      })
    },
  }
}

/*
<!-- [dev]  [/dev] -->
で囲まれたコメントをビルド時に削除

【例】
<!-- [dev] <script>
GoogleTagManagerのコード
</script> [/dev] -->

↓

<script>
GoogleTagManagerのコード
</script>

 */

export default defineConfig(({ mode, command }) => {
  const isStg = mode === 'development'
  const isDev = command === 'serve' // npm run dev の場合
  const ASSETS = isStg ? '@/assets/' : '../'
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // root: './src',
    publicDir: './asset',
    envDir: '../',
    server: {
      port: 4173,
      open: env.ASSETS_PATH + env.DIRECTORY_NAME + '.html',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vituum(),
      sassGlobImports(),
      vitePluginSsinc({
        includeExtensions: ['shtml', 'html'],
        apply: 'serve',
      }),
      nunjucks({
        root: './src',
        globals: {
          env: env,
          DIRECTORY_NAME: env.DIRECTORY_NAME,
          ASSETS_PATH: env.ASSETS_PATH,
        },
        filters: {
          hrefPath: url => {
            // Viteの環境変数で判定
            if (isStg) {
              return 'https://store.wacoal.jp' + url // 相対パス
            } else {
              return '../..' + url // 絶対パス
            }
          },
          imgPath: src => {
            // Viteの環境変数で判定
            if (isStg) {
              return '/src/' + src // 開発環境では /src/ + パス
            } else {
              // 本番環境では asset/ + ASSETS_PATH + DIRECTORY_NAME + /img/ + ファイル名のみ
              const fileName = src.split('/').pop() // ファイル名のみ取得
              return (
                'asset/' +
                env.ASSETS_PATH +
                env.DIRECTORY_NAME +
                '/img/' +
                fileName +
                '?$staticlink$'
              )
            }
          },
          ogpPath: src => {
            // Viteの環境変数で判定
            if (isStg) {
              return (
                'https://wacoalstore2.evoworx.net/' +
                env.ASSETS_PATH +
                env.DIRECTORY_NAME +
                '/' +
                src
              ) // 相対パス
            } else {
              return (
                'asset/' +
                env.ASSETS_PATH +
                env.DIRECTORY_NAME +
                '/' +
                src +
                '?$staticlink$'
              )
            }
          },
          pageUrl: fileName => {
            if (isStg) {
              return (
                'https://wacoalstore2.evoworx.net/' +
                env.ASSETS_PATH +
                fileName +
                '.html'
              ) // 相対パス
            } else {
              return (
                'https://store.wacoal.jp/' +
                env.ASSETS_PATH +
                fileName +
                '.html'
              )
            }
          },
          includePath: path => {
            // 開発サーバー（npm run dev）の場合は相対パスのまま、ビルド時は絶対パスに変更
            if (isDev) {
              return path // 開発サーバーでは相対パスのまま
            } else {
              return path.replace('../_includes/', '/_includes/')
            }
          },
        },
      }),
      removeModuleAttributes(isStg), // カスタムプラグインにisStgパラメータを渡す
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $base-dir: '${ASSETS}';
            @use "sass:math";
            @use "@/css/foundation/mixin" as *;
            @use "@/css/foundation/variable" as *;
          `,
          logger: {
            warn(message, options) {
              if (message.includes('@import rules are deprecated')) return
              console.warn(`Warning: ${message}`)
            },
          },
        },
      },
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist()), // extend browserslist-config-baseline
      },
    },
    build: {
      outDir: isStg ? './dist/staging' : './dist/production',
      emptyOutDir: true,
      copyPublicDir: false,
      assetsInlineLimit: 0,
      minify: false, // JavaScriptのminifyを無効化
      cssMinify: false, // 'lightningcss',
      cssCodeSplit: true,
      rollupOptions: {
        input: [
          //
          './src/pages/**/*.html',
          './src/pages/**/*.njk',
          './src/assets/**',
        ],
        output: {
          assetFileNames: assetInfo => {
            const name = assetInfo.names
            const originalFileName = assetInfo.originalFileNames[0]

            // フォント
            if (/\.(eot|otf|ttf|woff|woff2)$/.test(name ?? '')) {
              return env.ASSETS_PATH + env.DIRECTORY_NAME + `/font/[name].[ext]`
            }
            // 画像
            if (/\.(gif|jpeg|jpg|png|svg|webp)$/.test(name ?? '')) {
              return env.ASSETS_PATH + env.DIRECTORY_NAME + `/img/[name].[ext]`
            }
            // 動画
            if (/\.(mp4|webm|ogv)$/.test(name ?? '')) {
              return (
                env.ASSETS_PATH + env.DIRECTORY_NAME + `/video/[name].[ext]`
              )
            }
            // 音声
            if (/\.(mp3|wav|ogg)$/.test(name ?? '')) {
              return (
                env.ASSETS_PATH + env.DIRECTORY_NAME + `/audio/[name].[ext]`
              )
            }
            // CSS
            if (/\.css$/.test(name ?? '')) {
              return (
                env.ASSETS_PATH +
                env.DIRECTORY_NAME +
                `/css/${env.DIRECTORY_NAME}.css`
              )
            }
            return env.ASSETS_PATH + env.DIRECTORY_NAME + `/common/[name].[ext]`
          },
          entryFileNames:
            env.ASSETS_PATH +
            env.DIRECTORY_NAME +
            `/js/${env.DIRECTORY_NAME}.js`,
          chunkFileNames:
            env.ASSETS_PATH + env.DIRECTORY_NAME + `/js/[name].js`,
        },
      },
    },
  }
})
