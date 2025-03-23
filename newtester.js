async function addUrls(url)
{
    urlArr = await getUrls();
    urlArr.push(url);
    await new Promise((resolve) => {chrome.storage.local.set({urlArray : urlArr}, resolve)})
}


async function getUrls()
{
    return new Promise((resolve) => {
        chrome.storage.local.get((result) => resolve (result.urlArray || []))
    })
}