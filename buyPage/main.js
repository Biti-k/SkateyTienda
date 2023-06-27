const shoppingCartAmount = document.querySelector('.amount');
const productos = document.querySelectorAll('.producto');
const shoppingCartButton = document.querySelector('.iconShop');
const shoppingCartDiv = document.querySelector('.shoppingCartService');
const list = document.querySelector(".list");
const totalP = shoppingCartDiv.querySelector("p");
const ekis = document.querySelector(".ekis")
const spinner = document.querySelector("#spinner")
let arrayProductos = [];
let arrayValorInput = [];
addlistenerstoX(ekis);
let precioTotal = 0;
//Pasar por cada producto y controlar aumentar la lista en el carrito de compra, precios totales...
for(let i = 0; i < productos.length; i++){
    productos[i].addEventListener("click", () => {
        let nAmount = 1;
        for(let i = 0; i < arrayProductos.length; i++){
           nAmount += Number(arrayProductos[i].inputValue);
        }
        shoppingCartAmount.innerHTML = nAmount;
        const listElement = document.createElement("li");
        let amountOfThisProduct = 0;
        let ekis2 = ekis.cloneNode();
        listElement.innerHTML = productos[i].querySelector(".info").querySelector("h3").innerHTML
        let precio = productos[i].querySelector(".info").querySelector("p").innerHTML.substring("8");
        precioTotal += Number(precio.substring(0, precio.length - 1))
        listElement.innerHTML += " - " + precio;
        listElement.append(ekis2);
        let cloneSpinner = spinner.cloneNode();
        cloneSpinner.value = 1;
        cloneSpinner.min = 1;
        cloneSpinner.max = 10;
        addListenerToInputNumber(cloneSpinner);
        listElement.append(cloneSpinner);
        
        for(let i = 0; i < arrayProductos.length; i++){
            if(arrayProductos[i].item.innerHTML === listElement.innerHTML){
                arrayProductos[i].inputValue++;
                amountOfThisProduct++;
                let input = arrayProductos[i].item.querySelector("#spinner");
                console.log(input);
                input.value++;
            }
        }

        if(amountOfThisProduct === 0){
            const itemAndInputValue = {
                item: listElement,
                inputValue: cloneSpinner.value
            };
            arrayProductos.push(itemAndInputValue);
            list.append(listElement);
        }

        totalP.innerHTML = "Precio total: " + precioTotal.toFixed(2) + "€";
        console.log(arrayProductos)
        addlistenerstoX(ekis2);
    })
    precioTotal.toFixed(2);
}
//Controlar cuando usan el input number, cambiar precio 
function addListenerToInputNumber(input){
    input.addEventListener("change", (event) => {
        let item = input.parentNode;
        let inputValueActual = Number(event.target.value);
        let inputValueAnterior;
        for(let i = 0; i < arrayProductos.length; i++){
            if(arrayProductos[i].item.innerHTML === item.innerHTML){
                console.log("mismo item");
                inputValueAnterior = Number(arrayProductos[i].inputValue);
            }
        }
        console.log("input value anterior", inputValueAnterior);
        console.log("input value actual",inputValueActual);
        let precioItem = item.innerText.substring(item.innerText.indexOf("-") + 2, item.innerText.indexOf("€"))
        console.log("preciodelitem",precioItem);
        precioTotal = Number(precioTotal);
        if(inputValueActual > inputValueAnterior){
            console.log("sumando input");
            console.log("precio Total", precioTotal);
            precioTotal = Number(precioTotal) + Number(precioItem);
            shoppingCartAmount.innerHTML = Number(shoppingCartAmount.innerHTML) + 1;
        }else{
            if(inputValueAnterior > 1){
                shoppingCartAmount.innerHTML = Number(shoppingCartAmount.innerHTML) - 1;
                console.log("restando input");
                precioTotal -= precioItem;
            }
        }
        precioTotal = Number(precioTotal);
        console.log("Precio total despues de sumar",precioTotal)
        totalP.innerHTML = "Precio total: " + precioTotal.toFixed(2) + "€";
        for(let i = 0; i < arrayProductos.length; i++){
            if(arrayProductos[i].item.innerHTML === item.innerHTML){
                console.log("mismo item");
                arrayProductos[i].inputValue = inputValueActual;
            }
        }

    })
}

//mostrar el carrito de compra cuando presionas el icono
shoppingCartButton.addEventListener("click", () => {
    if(shoppingCartDiv.classList.contains("display")){
        shoppingCartDiv.classList.remove('display');
    }else{
        shoppingCartDiv.classList.add('display');
    }
})

function addlistenerstoX(ekis){
        ekis.addEventListener("click", () => {
            let parent = ekis.parentNode;
            let qt = parent.querySelector("#spinner").value;
            if(Number(shoppingCartAmount.innerText) > 0){
                shoppingCartAmount.innerText = Number(shoppingCartAmount.innerText) - Number(qt);
            }
            
            let item = ekis.parentNode;
            if(item){
                if(!item.innerHTML.includes("Panecillo de regalo")){
                    item.style.display = "none";
                    let amount = item.querySelector("#spinner").value;
                    let valorItem = item.innerHTML;
                    let precioItem = Number(valorItem.substring(valorItem.indexOf("-") + 1, valorItem.indexOf("€")));
                    arrayProductos.splice(arrayProductos.indexOf(item.innerHTML),1)
                    precioTotal = precioTotal - precioItem * amount;
                    console.log(precioTotal)
                    console.log(precioItem)
                    totalP.innerHTML = precioTotal.toFixed(2) + "€";
                }
            }
        })

}

