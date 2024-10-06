let cart = []
let itmsObj = {}
let count = 0
class Items{
    constructor(itm, quan, price){
        this.itm = itm,
        this.quan=quan,
        this.price=price
    }
}
function addFun(){
    const itm= document.querySelector("#itmInput")
    const quan= document.querySelector("#quanInput")
    const price= document.querySelector("#priceInput")

    const outputDiv = document.querySelector("#outputSection")
    

    count+=1



        let nDiv = document.createElement("div")
        nDiv.setAttribute("id", count)
        nDiv.classList.add("nDiv")
        let a = new Items(itm.value,quan.value,price.value)
        let b = "i"+count
        itmsObj[b]=a
        
        console.log(itmsObj)
        console.log(itmsObj[b].itm)

        let checkBtn = document.createElement("input")
        checkBtn.setAttribute("type", "checkbox")
        checkBtn.classList.add("cBox")
        checkBtn.addEventListener("click", ()=>{
            if(checkBtn.checked){
                console.log("checked")
                if(itm.value==""||quan.value<=0||price.value<=0){
                    alert("Please enter valid values.")
                    checkBtn.checked = false
                }else{
                    console.log("else")
                    let c = "i"+nDiv.id
                    console.log(itmsObj)
                    let subTotal = itmsObj[c].quan * itmsObj[c].price
                    subTotal = subTotal.toFixed(2)
                    
                    cart.push(subTotal)

                    delBtn.style.display = "none"
                    selectBtn.style.display = "none"

                    p.style.textDecoration = 
                        "line-through"; 

                    totalFun()
                }



            }else{
                console.log("unchecked")
                let c = "i"+nDiv.id
                let subTotal = itmsObj[c].quan * itmsObj[c].price
                let negative = subTotal*-1
                cart.push(negative)

                delBtn.style.display = "flex"
                selectBtn.style.display = "flex"

                p.style.textDecoration = 
                    "none"; 

                totalFun()
            }
        })
        

        let delBtn = document.createElement("button")
        delBtn.innerHTML="DEL"
        delBtn.classList.add("itmBtn")
        delBtn.classList.add("itmDelBtn")
        delBtn.addEventListener("click",()=>{


            outputDiv.removeChild(nDiv)

            // nDiv.innerHTML=""
            // delBtn.remove()
            // selectBtn.remove()
            totalFun()
        })

        let selectBtn = document.createElement("button")
        selectBtn.innerHTML="SELECT"
        selectBtn.classList.add("itmBtn")
        selectBtn.classList.add("itmSelBtn")
        selectBtn.addEventListener("click", ()=>{
            nDiv.classList.add("selected")
            let a = "i"+nDiv.id
            itm.value = itmsObj[a].itm
            quan.value = itmsObj[a].quan
            price.value = itmsObj[a].price
            
            
            editFun(subTotal, cart, nDiv,quan, price, itm, a, p)

        })

       if(quan.value==undefined){
        quan.value = 0
        
       }
       if(price.value==undefined){
        price.value = 0
       }
       subTotal =  quan.value * price.value

        let p = document.createElement("p")
        p.textContent = `${itm.value} x ${quan.value} @ ${price.value} = ${subTotal}`
        nDiv.appendChild(checkBtn)
        nDiv.appendChild(p)

        console.log(nDiv)
        console.log(outputDiv)
        nDiv.appendChild(delBtn)
        nDiv.appendChild(selectBtn)
        outputDiv.appendChild(nDiv)

        totalFun()
    
}

function totalFun(){
    console.log(cart)
    
    const total= document.querySelector("#total")
    let t = 0
cart.forEach(e => {
        let x = parseFloat(e)
        t +=x
    });
    total.textContent = "R"+ t.toFixed(2)

    
}




function editFun(subTotal, cart, nDiv,quan, price, itm, a, p){

    const editBtn = document.querySelector("#editBtn")
editBtn.addEventListener("click", ()=>{
    nDiv.classList.remove("selected")

    // let negative = subTotal*-1
    // cart.push(negative)
    // nDiv.innerHTML=""


    subTotal = quan.value * price.value
    // let p = document.createElement("p")
    p.textContent = `${itm.value} x ${quan.value} @ ${price.value} = ${subTotal}`
    // nDiv.appendChild(p)
    // cart.push(subTotal)




    itmsObj[a].itm = itm.value
    itmsObj[a].quan = quan.value
    itmsObj[a].price = price.value


    // totalFun()

})


}

function saveFun(){
    console.log(itmsObj)
    localStorage.setItem("itemsObj",JSON.stringify(itmsObj))
    alert("List Saved!")
}



function loadFun(){
    // location.reload()



    let unparsedItems = localStorage.getItem("itemsObj")
    let parsedItems = JSON.parse(unparsedItems)
    itmsObj = parsedItems
    console.log(itmsObj)
    let j = 1
    let done = false
    // console.log(parsedItems)
    // console.log(parsedItems[i])
    while(done==false){
        
        let i = "i"+j
        if(parsedItems[i]==undefined){
            console.log("done")
            done = true
        }else{
            console.log("not done")
            const itm= document.querySelector("#itmInput")
            const quan= document.querySelector("#quanInput")
            const price= document.querySelector("#priceInput")
            
            itm.value = parsedItems[i].itm
            quan.value = parsedItems[i].quan
            price.value = parsedItems[i].price

            addFun()

            console.log(parsedItems[i])
            j+=1
            console.log(j)
        }
    }
}


const addBtn = document.querySelector("#addBtn")
addBtn.addEventListener("click", addFun)

const saveBtn = document.querySelector("#saveBtn")
saveBtn.addEventListener("click", saveFun)

const loadBtn = document.querySelector("#loadBtn")
loadBtn.addEventListener("click", loadFun)





