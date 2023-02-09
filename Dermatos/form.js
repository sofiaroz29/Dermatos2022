async function save(){
    // const boton = document.querySelector("btn");

    // boton.addEventListener("click", btnClick, false);

    // function btnClick(event) {
    //   event.preventDefault();
    // }

    let parte = document.getElementById('parte').value
    let sint = document.getElementById('sintomas').value
    let fami = document.getElementById('afamiliares').value
    let sol = document.getElementById('conductasol').value
    let foto = document.getElementById('fototipo').value
    let img = document.getElementById('img').files

    let formData = new FormData(); // esto se hace solo porque el content type es multipart/form-data porque se sube una imagen
    const fileField = document.querySelector('input[type="file"]');

    for (let i = 0; i < img.length; i++) {
      formData.append("imagen", img[i]);
    }

    // Simulate a mouse click:
    // window.location.href = "descarga.html";
    // formData.append("imagen", fileField.files[0]);

    // const response = await 

    // Get a reference to the file input
    // const imagen = document.querySelector("img");

    // // Listen for the change event so we can capture the file
    // imagen.addEventListener('change', (e) => {
    //     // Get a reference to the file
    //     const file = e.target.files[0];

    //     // Encode the file using the FileReader API
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         console.log(reader.result);
    //         // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
    //     };
    //     reader.readAsDataURL(file);
    // });
    
    const doc = new jsPDF();

    
    doc.setFillColor(48, 44, 84);
    doc.rect(0,0,220,10, 'F');
    doc.rect(0,290,220,10, 'F');


    doc.setFontSize(40);
    
    doc.setFont("helvetica", "bold");
    
    doc.text("Informe", 105, 30, null, null, "center");
    
    doc.setFontSize(23);
    doc.setFont("helvetica", "normal");
    doc.text("Datos Ingresados", 18, 55); 
    doc.line(15,58,85,58);
    
    doc.setFontSize(20);
    doc.text("Parte del cuerpo: " + parte, 18, 75); 
    doc.text("Síntomas: " + sint, 18, 95);
    doc.text("Antecedentes: " + fami, 18, 115);
    doc.text("Conducta respecto al sol: " + sol, 18, 135);
    doc.text("Fototipo: " + foto, 18, 135);
    //doc.setFontSize(23);
    
    // doc.addImage(img.path, 'JPEG', 30, 225, 50, 50);

    await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      credentials: "include",
      body: formData,
      ContentType: 'application/json'
    }).then(res => res.text())
    .then((data) => {
      if (data == 'benigno')
      {
        doc.text("Recomendacion: No se detectaron indicios", 18, 190) 
        doc.text("de melanoma, aun asi recomendamos consultar ", 18, 200)
        doc.text("con un profesional", 18, 210);
      }

      else if (data == 'maligno')
      {
        doc.text("Recomendacion: Se detectaron indicios", 18, 190) 
        doc.text("de melanoma, recomendamos consultar ", 18, 200)
        doc.text("con un profesional lo mas pronto posible", 18, 210);
      }

    })
    .catch(err => console.log('Error:', err));  
    
    window.location.href = "descarga.html";

    
    doc.line(25,230,185,230);

    doc.setFontSize(15);
    doc.text("Aviso: Los resultados no son 100% confiables.", 30, 243);
    doc.text("Ante cualquier duda sobre la condicion de su piel,", 45, 250);
    doc.text("consultar con un profesional", 45, 257);
    doc.text("Los controles de lunares se deben hacer", 45, 264) 
    doc.text("por lo menos una vez al año.", 45, 271);
    doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");

    
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch(err => console.log('Error:', err));

    // doc.text("Resultado: " + resultado, 30, 212);
    // doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");

    // .then(response => 
    //   {
    //     doc.text("Resultado: " + response, 30, 212);
    //     doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");
    //   })
    
    // .then((response) => {
    //   doc.text("Resultado: " + response, 30, 212);
    //   doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");
    // })
    // .then((response) => response.text())
    // .then((data) => console.log(data))
    // .catch(err => console.log('Error:', err));



    // const result = await fetch('http://localhost:3000/api/analysisresults')
    
    // doc.text("Resultado: " + resultado, 30, 212);
    // doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");

    // .then((response) => response.text())
    // .then((data) => console.log(data))
    // .then((result) => console.log(result))
    // .catch(err => console.log('Error:', err));

    // .then((response) => {if (response = 'benigno')
    // {
    //   doc.text("Resultado: benigno", 30, 212);
    //   doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");
    // }
    
    // else if (response = 'maligno')
    // {
    //   doc.text("Resultado: maligno", 30, 212);
    //   doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");
    // }})

    // .then((result) => {if (result = 'benigno')
    // {
    //   doc.text("Resultado: benigno", 30, 212);
    //   doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");
    // }
    
    // else if (result = 'maligno')
    // {
    //   doc.text("Resultado: maligno", 30, 212);
    //   doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");
    // }})
  }
