function registerSave() {
    let nombre = document.getElementById('nombres').value
    let apellido = document.getElementById('apellidos').value
    let email = document.getElementById('correo').value
    let contrasenia = document.getElementById('contrasenia').value
    
    var data = {
        nombre:nombre, 
        apellido: apellido,
        email: email,
        contrasenia: contrasenia
    }
   

    fetch('http://localhost:3000/api/usuario/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials: "include",
      body: JSON.stringify(data)
      
    }).catch(err => console.log('Error:', err));
    // .then(response => response.json())
    // .then(json => res.send(json))
    // .catch(err => console.log('Error:', err))
    console.log(response.json());
    console.log(data);
    return response.json();


    
    

}