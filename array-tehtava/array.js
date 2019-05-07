

let merkkijono = "3,9,200,6,0,20,19,-200";
document.getElementById("alkuperainenMerkkijono").innerHTML = merkkijono;

//luodaan taulukko jonka sisällöksi tulee muuttujan merkkijonon numerot
let array1 = merkkijono.split(",");
document.getElementById("arr1").innerHTML = array1[3];

// lisätään nro 99 taulukon viimeiseksi
array1[array1.length] = 99;
document.getElementById("arr2").innerHTML = array1;

// poistetaan viimeinen alkioi
array1.pop();

// poistetaan ensimmäinen alkioi
array1.shift();

// lisätään numero 135 ensimmäiseksi
array1.unshift(135);
document.getElementById("arr3").innerHTML = array1;

// järjestetään taulukon numerot suuruusjärjestykseen
let array2 = array1.sort(function(a,  b){ return( a - b)});
document.getElementById("arr4").innerHTML = array2;

// tulostetaan taululukkon sisältö indekseillä forEach() metodilla
array2.forEach(taulukonTulostus);
function taulukonTulostus(arvo, index){
    document.getElementById("arr5").innerHTML = 
        document.getElementById("arr5").innerHTML + "index[" + index + "]: "
         + arvo + "<br>";
}