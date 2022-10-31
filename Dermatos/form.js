function save()
{
    let partecuerpo = document.getElementById('parte').value
    let sint = document.getElementById('sintomas').value
    let observ = document.getElementById('observaciones').value
    let person = document.getElementById('apersonales').value
    let fami = document.getElementById('afamiliares').value
    let sol = document.getElementById('concuctasol').value
    let foto = document.getElementById('fototipo').value

    console.log(partecuerpo, sint, observ, person, fami, sol, foto)
}