function login() {
    let email = document.getElementById('logincorreo').value
    let contra = document.getElementById('logincontrasenia').value
    
    var data = {
        email: email,
        contrasenia: contra,
    }

    fetch('http://localhost:3000/api/usuario/login', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).catch(err => console.log('Error:', err));
      // .then(response => response.json())
      // .then(json => res.send(json))
      // .catch(err => console.log('Error:', err))
      console.log(response.json());
      console.log(data);
      return response.json();
   
} 

//save();