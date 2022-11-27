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

    const doc = new jsPDF();
    doc.setFontSize(40);
    doc.setFont("helvetica", "bold");
    doc.text("Informe", 105, 45, null, null, "center");
    doc.setFontSize(23);
    doc.setFont("helvetica", "normal");
    doc.text("Datos Personales", 30, 95); 
    doc.setFontSize(20);
    doc.setFontSize(23);
    doc.text("Evaluacion", 30, 142);
    doc.setFontSize(20);
    doc.text("Parte del cuerpo: " + parte, 30, 153); 
    doc.text("Síntomas: " + sint, 30, 162);
    doc.text("Antecedentes: " + fami, 30, 172);
    doc.text("Conducta respecto al sol: " + sol, 30, 182);
    doc.text("Fototipo: " + foto, 30, 192);
    doc.setFontSize(23);

    await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      credentials: "include",
      body: formData,
      ContentType: 'application/json'
    }).then(response => response.text)
    .then((result) => {
      doc.text("Resultado: " + result, 30, 212);
      doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");
    })
    .catch(err => console.log('Error:', err));  
    
    
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
