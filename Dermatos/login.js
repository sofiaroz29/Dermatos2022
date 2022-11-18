function login() {
    let email = document.getElementById('logincorreo').value
    let contra = document.getElementById('logincontrasenia').value
    
    var data = {
        "email": email,
        "contrasenia": contra,
    }
    console.log(data)

    fetch('http://localhost:3000/api/usuario/login', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json;charset UTF-8',
        },
        credentials: "include",
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