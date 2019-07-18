import { isBrowser } from "./isbrowser"

interface InjectScriptArg {
  url: string;
  id: string;
}

export const injectScript = ({ url, id }: InjectScriptArg): Promise<any> => {
  if (!isBrowser) {
    return Promise.reject(new Error("document is undefined"))
  }

  return new Promise(function injectScriptCallback(resolve, reject) {
    const existingScript = document.getElementById(id) as HTMLScriptElement | undefined
    if (existingScript) {
      // Same script id/url: keep same script
      if (existingScript.src === url) {
        return resolve(id)
      }
      // Same script id but url changed: recreate the script
      else {
        existingScript.remove()
      }
    }

    const script = document.createElement("script")

    script.type = "text/javascript"
    script.src = url
    script.id = id
    script.async = true
    script.onload = function onload() {
      resolve(id)
    }
    script.onerror = reject

    document.head.appendChild(script)
  })
    // eslint-disable-next-line @getify/proper-arrows/name
    .catch(err => {
      console.error('injectScript error: ', err)
    })
}
