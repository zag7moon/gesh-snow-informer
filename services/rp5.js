const xvfb = require('../lib/xvfb')

async function getSnowLevel (url) {
  const close = await xvfb()
  const nightmare = require('../lib/nightmare')

  console.log('Visit page', url)
  await nightmare.goto(url)
  await nightmare.wait('#archiveTable div.sss_0.dfs')
  const snowLevel = await nightmare.evaluate(() => document.querySelectorAll('#archiveTable div.sss_0.dfs')[0].textContent)
  await nightmare.end()
  await close()

  return snowLevel
}

module.exports = {
  getSnowLevel
}
