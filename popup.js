// Array for dealing with the urls.
let siteUrlArray = new Array();

// The input field for inputting value
let addr = document.querySelector("#website-url");

// The button that's clicked to input value
let btn = document.querySelector("#adder");

// Configuring adding the new website url to the chrome local storage

btn.addEventListener("click", async () =>
{
    // New site url to be added
    let newSiteUrl = addr.value;

    getData();
    await new Promise((resolve) => setTimeout(resolve, 200))
    console.log(newSiteUrl); 
    siteUrlArray.push(newSiteUrl);
    await new Promise((resolve) => setTimeout(resolve, 200))


    // Stores the updated siteUrlArray in the chrome local storage
    chrome.storage.local.set({username : siteUrlArray}, () =>{
        console.log("Username successfully added. The array is : ");
        console.log(siteUrlArray);
        console.log("Username added complete");
        console.log();
    })
    displayTables();
})

// Displays the tables in popup.html

async function displayTables()
{
    let table = document.querySelector("#blocked-list");
    await new Promise((resolve) => setTimeout(resolve, 200))
    console.log("Displaying array : ")
    console.log(siteUrlArray)
    console.log("Display complete")
    console.log();
    len = siteUrlArray.length;

    // Reseting the output table
    table.innerHTML = '';

    for(i = 0; i < len; i++)
    {
       let tr = document.createElement("tr");
       tr.innerHTML = `<td>${i+1}.</td> <td> ${siteUrlArray[i]}</td>`;
       table.appendChild(tr);
    }
}

// Async function to make sure siteUrlArray isn't accessed before it is completely read
async function getData()
{
    chrome.storage.local.get(['username'], function(result){
        let returnObj = result;
        siteUrlArray = returnObj.username;
    });
    // Waits 1 sec before handing control over to the next statement
    await new Promise((resolve) => setTimeout(resolve, 200))
}

// Displaying Tables at the start
document.addEventListener("load", () => {
    getData();
    displayTables();
})

function reset()
{
    chrome.storage.local.set({username : new Array()}, () =>{
        console.log("Reset complete");
    })
}