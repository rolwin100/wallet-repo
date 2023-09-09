import type { DocumentContext, DocumentInitialProps } from 'next/document'
import Document, { Html, Main } from 'next/document'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'

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
        <body>
          <Main />
        </body>
      </Html>
    )
  }
}

export default MyDocument