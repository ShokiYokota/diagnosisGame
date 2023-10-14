'use strict'
const userNameInput = document.getElementById('user-name')
const diagnosisButton = document.getElementById('diagnosis')
const resultDivision = document.getElementById('result-area')
const postDivision = document.getElementById('post-area')
let isComposing = false

diagnosisButton.onclick = () => {
  const userName = userNameInput.value
  // 名前が空の時は処理を終了する
  if (!userName) return

  //  診断結果表示エリアの作成
  resultDivision.innerText = ''
  //  headerDivisionの作成
  const headerDivision = document.createElement('div')
  headerDivision.setAttribute('class', 'card-header')
  headerDivision.innerText = '診断結果'

  // bodyDivisionの作成
  const bodyDivision = document.createElement('div')
  bodyDivision.setAttribute('class', 'card-body')

  const paragraph = document.createElement('p')
  paragraph.setAttribute('class', 'card-text')
  const result = diagnosis(userName)
  paragraph.innerText = result
  bodyDivision.appendChild(paragraph)

  // resultDivisionにBootstrapのスタイルを適用
  resultDivision.setAttribute('class', 'card')

  // headerDivisionとbodyDivisionをresultDivisionに差し込む
  resultDivision.appendChild(headerDivision)
  resultDivision.appendChild(bodyDivision)

  // ポストエリアの作成
  postDivision.innerText = ''
  const anchor = document.createElement('a')
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw'
  anchor.setAttribute('href', hrefValue)
  anchor.setAttribute('class', 'twitter-hashtag-button')
  anchor.setAttribute('data-text', result)
  anchor.innerText = 'Post #あなたのいいところ'

  postDivision.appendChild(anchor)

  const script = document.createElement('script')
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
  postDivision.appendChild(script)
}

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
  '###userName###のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function diagnosis(userName) {
  //全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i)
  }

  // 文字コード番号の合計を解答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length
  let result = answers[index]
  result = result.replaceAll('###userName###', userName)
  return result
}

// IME入力中かどうかの判断
userNameInput.addEventListener('compositionstart', (event) => {
  isComposing = true
})

userNameInput.addEventListener('compositionend', (event) => {
  isComposing = false
})

//　IME入力中でないかつEnterを押された時も結果を表示させる
userNameInput.addEventListener('keydown', (event) => {
  if (!isComposing && event.key === 'Enter') {
    diagnosisButton.onclick()
  }
})

//テストコード
console.assert(
  diagnosis('太郎') ===
    '太郎のいいところはユニークさです。太郎だけのその特徴が皆を楽しくさせます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)

console.assert(
  diagnosis('太郎') === diagnosis('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
)
