async function save() {
    let parte = document.getElementById('parte').value
    let sint = document.getElementById('sintomas').value
    let fami = document.getElementById('afamiliares').value
    let sol = document.getElementById('conductasol').value
    let foto = document.getElementById('fototipo').value
    let img = document.getElementById('img').files

    let formData = new FormData(); // esto se hace solo porque el content type es multipart/form-data porque se sube una imagen
    const fileField = document.querySelector('input[type="file"]');

    formData.append("fototipos", foto);

    for (let i = 0; i < img.length; i++) {
      formData.append("imagen", img[i]);
    }

    // Simulate a mouse click:
    window.location.href = "descarga.html";

    function download(){
      var doc = new jsPDF();
      doc.text("prueba 123", 10, 10);
      doc.save("a4.pdf");
    }

    // formData.append("imagen", fileField.files[0]);


    // const response = await 
    const respone = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      credentials: "include",
      body: formData,
      ContentType: 'application/json'
    })

   // handle response
    console.log(formData)
}

