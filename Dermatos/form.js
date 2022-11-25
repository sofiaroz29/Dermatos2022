async function save() {
    let parte = document.getElementById('parte').value
    let sint = document.getElementById('sintomas').value
    let fami = document.getElementById('afamiliares').value
    let sol = document.getElementById('conductasol').value
    let foto = document.getElementById('fototipo').value
    let img = document.getElementById('img').files

    let formData = new FormData(); // esto se hace solo porque el content type es multipart/form-data porque se sube una imagen
    const fileField = document.querySelector('input[type="file"]');

    
    // formData.append("parte_del_cuerpo", parte);
    // formData.append("sintomas", sint);
    // formData.append("antecedentes", fami)
    // formData.append("conducta_sol", sol)
    // formData.append("fototipos", foto)
    for (let i = 0; i < img.length; i++) {
      formData.append("imagen", img[i]);
    }


    // Simulate a mouse click:
    // window.location.href = "descarga.html";
    // formData.append("imagen", fileField.files[0]);

    // const response = await 

    await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      credentials: "include",
      body: formData,
      ContentType: 'application/json'
    }).then(response => response.json())
    .then(json => jsonResponse = json)  
    .then(result => console.log(result))
    .catch(err => console.log('Error:', err));
  }
