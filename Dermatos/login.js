function save() {
    let email = document.getElementById('correo').value
    let contra = document.getElementById('contrasenia').value
    

    fetch('http://localhost:3000/api/usuario/login', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        body: {
            email: email,
            contrasenia: contra,
        }
      }).then(response => response.json())  
      .then(json => res.send(json))    
      .catch(err => console.log('Error:', err));
} 

//save();