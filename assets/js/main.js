$(document).ready(function () {

    $("form").submit(function (event) {

        event.preventDefault();
        let valueInput = $("#superHeroeInput").val();
        if (isNaN(valueInput)) {
            alert("Debes ingresar un número de Heroe valido")
        } else {
            if (valueInput > 732 || valueInput < 1) {
                alert("Debes ingresar un número de Heroe válido (entre 1 y 732)")
            } else {
                $.ajax({
                    url: "https://www.superheroapi.com/api.php/10159249802177744/" + valueInput,
                    success: function (data) {
                        let nombre = data.name;
                        let conexiones = data.connections['group-affiliation']; //para tomar un objeto con - se debe añadir los [''] sin punto
                        let imagen = data.image.url;
                        let publicado = data.biography.publisher
                        let ocupacion = data.work.occupation
                        let primeraAparicion = data.biography['first-appearance']
                        let altura = data.appearance.height;
                        let peso = data.appearance.weight;
                        let alianzas = data.biography.aliases;

                        $("#heroeInfo").html(`
        <div class="m-5">
        <h3>SuperHeroe Encontrado</h3>
        <div class="card mb-3" style="max-width: 1000px;">
        <div class="row">
          <div class="col-md-4">
            <img src="${imagen}" class="card-img" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card text:">Nombre: ${nombre}</h5>
              <p class="card text">Conexiones: ${conexiones}</p>
              <p class="card text">Publicado por: ${publicado}</p>
              <p class="card text">Ocupacion: ${ocupacion}</p>
              <p class="card text">Primera Aparicion: ${primeraAparicion}</p>
              <p class="card text">Altura: ${altura}</p>
              <p class="card text">Peso: ${peso}</p>
              <p class="card text">Alianzas: ${alianzas}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
        `);

                        var chart = new CanvasJS.Chart("chartContainer", {
                            theme: "light1", // "light1", "light2", "dark1", "dark2"
                            exportEnabled: true,
                            animationEnabled: true,
                            title: {
                                text: `Estadisticas de poder para ${nombre}`
                            },
                            data: [{
                                type: "pie",
                                startAngle: 25,
                                toolTipContent: "<b>{label}</b>: {y}%",
                                showInLegend: "true",
                                legendText: "{label}",
                                indexLabelFontSize: 16,
                                indexLabel: "{label} - {y}%",
                                dataPoints: [{
                                        y: data.powerstats.intelligence,
                                        label: "Inteligence"
                                    },
                                    {
                                        y: data.powerstats.strength,
                                        label: "Strength"
                                    },
                                    {
                                        y: data.powerstats.speed,
                                        label: "Speed"
                                    },
                                    {
                                        y: data.powerstats.durability,
                                        label: "Durability"
                                    },
                                    {
                                        y: data.powerstats.power,
                                        label: "Power"
                                    },
                                    {
                                        y: data.powerstats.combat,
                                        label: "Combat"
                                    }
                                ]
                            }]
                        });
                        chart.render();


                    } //cierre success

                }); //cierre ajax
            }
        } //cierre else
    });

});