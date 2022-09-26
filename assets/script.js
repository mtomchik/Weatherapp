function Fetch{
    async getCurrent(input){
        var myKey = "975aa03a6a36a51b07662a5c36266148";

        var response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}"
        );
        var data = await response.json();

        console.log(data);

        return data
    }
}
function UI {
    varructor() {
        this.uiContainer = document.getElementById("content");
        this.city
    }

    populateUI(data) {
        this.uiContainer.innerHTML = `        
        <div class="card mx-auto mt-5" style="width: 18rem;">
        <div class="card-body justify-content-center">
            <h5 class="card-title">${data.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Highs of ${data.main.temp_max}. Lows of ${data.main.temp_min}</h6>
            <p class="card-text ">Weather conditions are described as: ${data.weather[0].description}</p>
            
        </div>
    </div>
    
    `;
    }
}

var ft = Fetch();
var ui = UI();

var search = document.getElementById("city");
var button = document.getElementById("btn")

button.addEventListener("click", ()=> {
    var currentVal = search.value;

    ft.getCurrent(currentVal).then((data)=>{
        ui.populateUI(data);
        ui.saveToLS(data);
    })
})