import type { DocumentContext, DocumentInitialProps } from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'

const NextScriptAny = NextScript as any;
const HeadAsAny = Head as any;
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const cache = createCache()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          (
            <StyleProvider cache={cache} hashPriority='high'>
              <App {...props} />
            </StyleProvider>
          ),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/* hacky code, `extractStyle` does not currently support returning JSX or related data. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `</script>${extractStyle(cache)}<script>`,
            }}
          />
        </>
      ),
    }
  }
  render() {
    return (
      <Html>
        <HeadAsAny />
        <body>
          <Main />
          <NextScriptAny />
        </body>
      </Html>
    )
  }
}

export default MyDocument