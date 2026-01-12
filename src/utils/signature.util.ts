import crypto from 'crypto'

/**
 * Recreates the Java 'O.dramabox' string decryption function.
 * Found in: APP\DramaBox\j7\O.java
 */
function decryptString (s: string): string {
  let sb = ''
  if (!s) return ''
  for (let i = 0; i < s.length; i++) {
    const char1 = s.charCodeAt(i)
    if (char1 >= 33 && char1 <= 126) {
      // '!' to '~'
      let c = char1 - 20
      if (c < 33) {
        sb += String.fromCharCode(c + 93)
      } else {
        sb += String.fromCharCode(c)
      }
    } else {
      sb += s.charAt(i)
    }
  }
  return sb
}

// ---------------------------------------------------------
// Reconstruct the Private Key from j7.dramaboxapp(1).java
// ---------------------------------------------------------

const part1 =
  'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9Q4Y5QX5j08HrnbY3irfKdkEllAU2OORnAjlXDyCzcm2Z6ZRrGvtTZUAMelfU5PWS6XGEm3d4kJEKbXi4Crl8o2E/E3YJPk1lQD1d0JTdrvZleETN1ViHZFSQwS3L94Woh0E3TPebaEYq88eExvKu1tDdjSoFjBbgMezySnas5Nc2xF28'

// The encrypted middle part (copied from Java source)
const encryptedPart2 =
  'l|d,WL$EI,?xyw+*)^#?U`[whXlG`-GZif,.jCxbKkaY"{w*y]_jax^/1iVDdyg(Wbz+z/$xVjCiH0lZf/d|%gZglW)"~J,^~}w"}m(E\'eEunz)eyEy`XGaVF|_(Kw)|awUG"\'{{e#%$0E.ffHVU++$giHzdvC0ZLXG|U{aVUUYW{{YVU^x),J\'If`nG|C[`ZF),xLv(-H\'}ZIEyCfke0dZ%aU[V)"V0}mhKvZ]Gw%-^a|m\'`\\f}{(~kzi&zjG+|fXX0$IH#j`+hfnME"|fa/{.j.xf,"LZ.K^bZy%c.W^/v{x#(J},Ua,ew#.##K(ki)$LX{a-1\\MG/zL&JlEKEw\'Hg|D&{EfuKYM[nGKx1V#lFu^V_LjVzw+n%+,Xd'

// Decrypt the part
const part2 = decryptString(encryptedPart2)

const part3 =
  'x52e71nafqfbjXxZuEtpu92oJd6A9mWbd0BZTk72ZHUmDcKcqjfcEH19SWOphMJFYkxU5FRoIEr3/zisyTO4Mt33ZmwELOrY9PdlyAAyed7ZoH+hlTr7c025QROvb2LmqgRiUT56tMECgYEA+jH5m6iMRK6XjiBhSUnlr3DzRybwlQrtIj5sZprWe2my5uYHG3jbViYIO7GtQvMTnDrBCxNhuM6dPrL0cRnbsp/iBMXe3pyjT/aWveBkn4R+UpBsnbtDn28r1MZpCDtr5UNc0TPj4KFJvjnV/e8oGoyYEroECqcw1LqNOGDiLhkCgYEAwaemNePYrXW+MVX/hatfLQ96tpxwf7yuHdENZ2q5AFw73GJWYvC8VY+TcoKPAmeoCUMltI3TrS6K5Q/GoLd5K2BsoJrSxQNQFd3ehWAtdOuPDvQ5rn/2fsvgvc3rOvJh7uNnwEZCI/45WQg+UFWref4PPc+ArNtp9Xj2y7LndwkCgYARojIQeXmhYZjG6JtSugWZLuHGkwUDzChYcIPd'

const part4 =
  'W25gdluokG/RzNvQn4+W/XfTryQjr7RpXm1VxCIrCBvYWNU2KrSYV4XUtL+B5ERNj6In6AOrOAifuVITy5cQQQeoD+AT4YKKMBkQfO2gnZzqb8+ox130e+3K/mufoqJPZeyrCQKBgC2fobjwhQvYwYY+DIUharri+rYrBRYTDbJYnh/PNOaw1CmHwXJt5PEDcml3+NlIMn58I1X2U/hpDrAIl3MlxpZBkVYFI8LmlOeR7ereTddN59ZOE4jY/OnCfqA480Jf+FKfoMHby5lPO5OOLaAfjtae1FhrmpUe3EfIx9wVuhKBAoGBAPFzHKQZbGhkqmyPW2ctTEIWLdUHyO37fm8dj1WjN4wjRAI4ohNiKQJRh3QE11E1PzBTl9lZVWT8QtEsSjnrA/tpGr378fcUT7WGBgTmBRaAnv1P1n/Tp0TSvh5XpIhhMuxcitIgrhYMIG3GbP9JNAarxO/qPW6Gi0xWaF7il7Or'

// Concatenate all parts to get the Base64 PKCS8 string
const privateKeyBase64 = part1 + part2 + part3 + part4

// Format as PEM for Node.js
const pemBody = privateKeyBase64.match(/.{1,64}/g)?.join('\n') || ''
const privateKeyPem = `-----BEGIN PRIVATE KEY-----\n${pemBody}\n-----END PRIVATE KEY-----`

// ---------------------------------------------------------
// Generates the 'sn' (Signature) header value
// ---------------------------------------------------------
/**
 * Generates the 'sn' signature for Dramabox API requests
 * @param timestamp - Current timestamp (Date.now().toString())
 * @param body - The request body string (utf8). Empty string if none
 * @param deviceId - Header 'device-id' value
 * @param androidId - Header 'android-id' value
 * @param tn - Header 'tn' value (bearer token)
 * @returns Base64 encoded RSA-SHA256 signature
 */
export function generateSn (
  timestamp: string,
  body: string,
  deviceId: string,
  androidId: string,
  tn: string
): string {
  // Logic from F7\O.java:
  // 1. Calculate base string
  let signBasedStr = 'timestamp=' + timestamp

  // 2. Append body (dramabox var in java)
  // Note: In Java, it appends the body content. If POST and not multipart, it's the body string.
  if (body) {
    signBasedStr += body
  }

  // 3. Append headers if they exist
  // j7.l.dramabox(s) returns s if not empty, else ""
  if (deviceId && deviceId.length > 0) {
    signBasedStr += deviceId
  }
  if (androidId && androidId.length > 0) {
    signBasedStr += androidId
  }
  if (tn && tn.length > 0) {
    signBasedStr += tn
  }

  // 4. Sign using RSA-SHA256
  const sign = crypto.createSign('SHA256')
  sign.update(signBasedStr)
  sign.end()

  // 5. Return Base64 signature
  return sign.sign(privateKeyPem, 'base64')
}
