
const api_url = 'https://mindicador.cl/api'

async function getCoins(url){
    try {
        const monedas = await fetch(url);
        const {dolar, euro, utm, uf, ivp} = await monedas.json();
        return [dolar , euro, utm, uf, ivp];
    } catch (error) {
        console.log(error);
    }
}              
//renderizado de monedas al contenedor: selecciona el contenedor desde el html
//se asigna el arrays de getCoins a la constante coins
//foreach a coins y se crea una nueva opcion dentro de la etiqueta html
//el valor de option ahora es el contenido de coins_info['codigo']
//select_container se agrega el valor de option
//se invoca la funcion con su argumento aapi_url: renderCoinOption(api_url)
async function renderCoinOptions(){
    try {
        const select_container = document.getElementById('select_coin')
        const coins = await getCoins(api_url);
        coins.forEach((xCadaElemento)=>{
        // a la constante option se le asigna el elemnto html "option"
        const option = document.createElement('option')
        //el valor de option se le aplica la function coin_info que 
        //contiene el elemento: 'codigo'
        option.value = xCadaElemento['codigo'];         
        option.innerHTML = xCadaElemento['nombre'];
        select_container.appendChild(option);
        })
    } catch (error) {
        console.log(error);
    }
}

//extraccion de datos de una sola moneda
async function getCoinDetails(url,coinID){
    try { 
        if(coinID){
            const coin = await fetch(`${url}/${coinID}`);
            const {serie} =  await coin.json();
            const obj1 = serie[0];
            return obj1.valor;
        } else{
            alert('selecciona una moneda')
        }        
    } catch (error) {
        throw new Error(error)
    }
}
    // evento en boton para obtener Id y tedalles 
document.getElementById('search').addEventListener('click', async(event) =>{
    const option_selected = document.getElementById('select_coin').value;
    const valorMoneda = await getCoinDetails(api_url,option_selected);
    const inputPesos = Number(document.getElementById('inputPesos').value);
    const convertion = (inputPesos / valorMoneda).toFixed(2); 
    document.getElementById('display').innerHTML = convertion;
})

renderCoinOptions(api_url)

async function createChart(url, coinID){
    const coin = await fetch(`${url}/${coinID}`);
    const {serie} =  await coin.json();
}

new Chart("myChart", {
type: "line",
data: {
    labels: xValues,
    datasets: [{
    backgroundColor:"rgba(0,0,255,1.0)",
    borderColor: "rgba(0,0,255,0.1)",
    data: yValues
    }]
},
options:{...}
});
