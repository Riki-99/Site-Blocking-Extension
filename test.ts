// Array for dealing with the urls.
let siteUrlArray = new Array();

// The input field for inputting value
let addr = document.querySelector("#website-url");

// The button that's clicked to input value
let btn = document.querySelector("#adder");

// Configuring adding the new website url to the chrome local storage

btn.addEventListener("click", addUrl)

// Displays the tables in popup.html

async function displayTables()
{
    let table = document.querySelector("#blocked-list");
    console.log("Displaying array : ")
    console.log(siteUrlArray)
    console.log("Display complete")
    console.log();
    len = siteUrlArray.length;

    // Reseting the output table
    table.innerHTML = '';

    for(let i = 0; i < len; i++)
    {
       let tr = document.createElement("tr");
       tr.innerHTML = `<td>${i+1}.</td> <td> ${siteUrlArray[i]}</td>`;
       table.appendChild(tr);
    }
}

// Async function to make sure siteUrlArray isn't accessed before it is completely read
async function getData()
{
    await chrome.storage.local.get(['username'], function(result){
        let returnObj = result;
        siteUrlArray = returnObj.username;
    });
}

// // Displaying Tables at the start
// async function showTableFirstTime()
// {
//     await getData();
//     displayTables();
// }

// window.addEventListener("load", () => {
//       showTableFirstTime(); 
// })


async function reset()
{
    siteUrlArray = [];
    await chrome.storage.local.set({username : new Array()}, () =>{
        console.log("Reset complete");
    })
}


async function addUrl()
{
     // New site url to be added
     let newSiteUrl = addr.value;
     await getData();
     console.log(newSiteUrl); 
     
    siteUrlArray.push(newSiteUrl);
    console.log("Array before await : " + siteUrlArray);
    console.log("Array after await : " + siteUrlArray)
 
     // Stores the updated siteUrlArray in the chrome local storage
     chrome.storage.local.set({username : siteUrlArray}, () =>{
         console.log("Username successfully added. The array is : ");
         console.log(siteUrlArray);
         console.log("Username added complete");
         console.log();
     })
     await new Promise((resolve) => setTimeout(resolve, 200))
     displayTables();
}