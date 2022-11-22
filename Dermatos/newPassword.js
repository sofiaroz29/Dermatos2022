function getUser() {
    let email = document.getElementById('resetcorreo').value

    fetch('http://localhost:3000/api/usuario/forgotpassword', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        //credentials: "include",
        body: JSON.stringify({
            email:email,
        })
      }).then(response => response.json())
      .then(json => console.log(json))  
      .catch(err => console.log('Error:', err));
  
} 

function resetPassword() {
    let email = document.getElementById('correo').value
    let contra = document.getElementById('contrasenia').value
    let confirmcontra = document.getElementById('confirmContrasenia').value

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');

    fetch(`http://localhost:3000/api/usuario/resetpassword/${token}`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        //credentials: "include",
        body: JSON.stringify({
            'email':email,
            'newpassword':contra,
            'confirmpassword':confirmcontra,

        })
      }).then(response => response.json())
      .then(json => console.log(json))  
      .catch(err => console.log('Error:', err));
}