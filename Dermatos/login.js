function loginSave() {
    let email = document.getElementById('logincorreo').value
    let contra = document.getElementById('logincontrasenia').value
    
    var data = {
        email: email,
        contrasenia: contra,
    }
    console.log(data)

    var jsonResponse = {};

    fetch('http://localhost:3000/api/usuario/login', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        //credentials: "include",
        body: JSON.stringify(data)
      }).then(response => response.json())
      .then(json => jsonResponse = json)  
      .catch(err => console.log('Error:', err));

      window.localStorage.setItem('authtoken', jsonResponse.token);
     
   
} 

//save();