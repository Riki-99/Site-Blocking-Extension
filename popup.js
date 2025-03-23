// Array for dealing with the urls.
let urlArray = new Array();

// The input field for inputting value
let addr = document.querySelector("#website-url");

// The button that's clicked to input value
let btn = document.querySelector("#adder");

// Configuring adding the new website url to the chrome local storage

btn.addEventListener("click", async () =>
{
    // New site url to be added
    let newSiteUrl = addr.value;

    await getData();
    console.log(newSiteUrl); 
    urlArray.push(newSiteUrl);

    // Stores the updated siteUrlArray in the chrome local storage
    await new Promise((resolve) => {
        chrome.storage.local.set({siteUrlArray : urlArray}, () =>
            {
                console.log("Url successfully added. The array is : ");
                console.log(urlArray);
                console.log("Url added complete");
                console.log();
                resolve();
             })
    })
    displayTables();
    }
)
    
    

// Displays the tables in popup.html

async function displayTables()
{
    urlArray = await getData();
    let table = document.querySelector("#blocked-list");
    console.log("Displaying array : ")
    console.log(urlArray)
    console.log("Display complete")
    console.log();
    len = urlArray.length;

    // Reseting the output table
    table.innerHTML = '';

    for(i = 0; i < len; i++)
    {
       let tr = document.createElement("tr");
       tr.innerHTML = `<td>${i+1}.</td> <td> ${urlArray[i]}</td>`;
       table.appendChild(tr);
    }
}

// Async function to make sure siteUrlArray isn't accessed before it is completely read
function getData()
{
    // Wrapping the getting of data in a new promise to ensure that data isn't accessed before being read
    return new Promise((resolve) => {
        chrome.storage.local.get(function(result){
            //Returns the stored array or if an array isn't stored, it returns a new array
            resolve(result.siteUrlArray || []);
        });
    })
}


async function reset()
{
    await new Promise ((resolve) => {
            chrome.storage.local.set({siteUrlArray : new Array()}, () =>{
            console.log("Reset complete");
        }), resolve
    })
}

//Displaying Tables at start
displayTables();