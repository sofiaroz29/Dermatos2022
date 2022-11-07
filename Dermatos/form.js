function save() {
    let parte = document.getElementById('parte').value
    let sint = document.getElementById('sintomas').value
    let fami = document.getElementById('afamiliares').value
    let sol = document.getElementById('conductasol').value
    let foto = document.getElementById('fototipo').value
    let img = document.getElementById('img').value

    fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
        },
        body: {
            parte_del_cuerpo: parte,
            sintomas: sint,
            antecedentes: fami,
            conducta_sol: sol,
            fototipos: foto
        }
      });
} 

save();