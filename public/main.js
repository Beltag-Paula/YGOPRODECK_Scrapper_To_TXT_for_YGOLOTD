
    const btn = document.getElementById("btn")

    const btn2 = document.getElementById("btn2")
    const btn3 = document.getElementById("btn3")
    const btn4 = document.getElementById("btn4")

    const urlInput = document.getElementById("url");

    urlInput.addEventListener('keypress', (event) =>{
        if(event.key==="Enter") btn.click();
    })


    async function myFunction() {
        // extract text from url input
        const newURL = new URL(urlInput.value);
   
            try{
            //console.log(urlInput.value, newURL.hostname);
            if(newURL.hostname !== "ygoprodeck.com"){
                alert("Invalid hostname! Please use the ygoprodeck.com domain")
                throw new Error("Invalid hostname");
             }
            }
            catch (err){
            console.error(err);
            return
        }
        
        
        // you got the text -> make request with the text to /extract
        const response = await fetch("/extract", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput.value })
        })
        const dataToSave = await response.text();

        
        const fileHandler = await showSaveFilePicker({
            types: [
                {
                    description: "Text file",
                    accept: { "text/plain": [".txt"] },
                },
            ],
        });

        const writable =  await fileHandler.createWritable();

        await writable.write(dataToSave);

        await writable.close();

    }


    btn.addEventListener('click', myFunction)

    btn2.addEventListener('click', () => window.open("https://github.com/MoonlitDeath/Link-Evolution-Editing-Guide/wiki"));
    btn3.addEventListener('click', () => window.open("https://github.com/nzxth2/YGO_LOTD_LE_YDC_Converter/releases"));
    btn4.addEventListener('click', () => window.open("https://www.virtualbox.org/"));

