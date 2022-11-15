function save() {
    let parte = document.getElementById('parte').value
    let sint = document.getElementById('sintomas').value
    let fami = document.getElementById('afamiliares').value
    let sol = document.getElementById('conductasol').value
    let foto = document.getElementById('fototipo').value
    let img = document.getElementById('img').files

    let formData = new FormData(); // esto se hace solo porque el content type es multipart/form-data porque se sube una imagen

    formData.append("parte_del_cuerpo", parte);
    formData.append("sintomas", sint);
    formData.append("antecedentes", fami);
    formData.append("conducta_sol", sol);
    formData.append("fototipos", foto);

    for (let i = 0; i < img.length; i++) {
      formData.append("imagen", img[i]);
    }

    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      // credentials: "include",
      body: formData,
    })
    // .then(response => response.json())
    // .then(json => res.send(json))
    // .catch(err => console.log('Error:', err));

   // handle response

    //   axios({
    //     url: '/analyisisresults',
    //     method: 'POST',
    //     responseType: 'blob',
    // }).then((response) => {
    //       const url = window.URL.createObjectURL(new Blob([response.data]));
    //       const link = document.createElement('a');
    //       link.href = url;
    //       link.setAttribute('download', 'Analysis-Dermatos.pdf');
    //       document.body.appendChild(link);
    //       link.click();
    // });

    console.log(formData)
}

