function save() {
    let parte = document.getElementById('parte').value
    let sint = document.getElementById('sintomas').value
    let fami = document.getElementById('afamiliares').value
    let sol = document.getElementById('conductasol').value
    let foto = document.getElementById('fototipo').value
    let img = document.getElementById('img').files

    let formData = new FormData();
    formData.append("parte_del_cuerpo", parte);
    formData.append("sintomas", sint);
    formData.append("antecedentes", fami);
    formData.append("conducta_sol", sol);
    formData.append("fototipos", foto);
    formData.append("imagen", img);

    fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        credentials: "include",
        body: formData,
      });

    console.log(img)
} 

save();