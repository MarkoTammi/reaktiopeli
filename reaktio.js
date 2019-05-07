// js suorittaa koodia tiukasti speksin mukaisesti
"use strict";

// nappulaelementit taulukkoon
var nappulat = [
  document.getElementById('nappula0'),
  document.getElementById('nappula1'),
  document.getElementById('nappula2')
];

// onclick-käsittelyjät kaikille nappuloille
nappulat[0].onclick = function () { painallus(0) };
nappulat[1].onclick = function () { painallus(1) };
nappulat[2].onclick = function () { painallus(2) };

var nykyinen = 0;   // nykyinen aktiivinen nappula

// käynnistetään kone
// arvotaan ensimmäinen aktiivinen nappula 1500ms päästä, sitten 1000ms
// 1500 on parametri setTimeout-funktiolle
// 1000 on parametri aktivoiSeuraava-funktiolle
var ajastin = setTimeout(aktivoiSeuraava, 1500, 1000);

// muuttuja joka kertoo montako osumaa
var painallustenLkm = 0;
document.getElementById("tulos").innerHTML = painallustenLkm;

var aktiivisetNappulat = [];
var tulokset = [];

// funktio, joka pyörittää konetta: aktivoi seuraavan nappulan ja ajastaa
// sitä seuraavan nappulanvaihdon
function aktivoiSeuraava(aika) {
  // arvo seuraava aktiivinen nappula
  //console.log("aika on " + aika);
  var seuraava = arvoUusi(nykyinen);

  if (aktiivisetNappulat.length > 9) {
    lopetaPeli();
  } else {
    aktiivisetNappulat.push(seuraava);
    //console.log(aktiivisetNappulat);

    // päivitä nappuloiden värit: vanha mustaksi, uusi punaiseksi
    nappulat[nykyinen].style.backgroundColor = "black"; // vanha mustaksi
    nappulat[seuraava].style.backgroundColor = "red"; // uusi punaiseksi

    // aseta uusi nykyinen nappula
    nykyinen = seuraava;

    // aseta ajastin seuraavalle vaihdolle
    // Koodaa niin, että vaihtumistahti kiihtyy koko ajan!
    //console.log("Aktiivinen " + nykyinen);
    ajastin = setTimeout(aktivoiSeuraava, (aika * 0.99), (aika * 0.99));
  }
}

function arvoUusi(edellinen) {
  // Tämä on vain demotarkoituksessa näin!
  // Koodaa tämä niin, että seuraava arvotaan. Muista, että sama ei saa
  // tulla kahta kertaa peräkkäin.
  //var uusi = (edellinen + 1) % 3;
  while (true) {
    let uusi = Math.floor((Math.random() * 3));
    //console.log("Random nro " + uusi);
    if (uusi != edellinen) {
      return uusi;
    }
  }
}

// Tätä funktiota kutsutaan aina, kun jotain nappulaa painetaan
// Pelilogiikkasi vaatinee, että lisäät tänne jotain...
function painallus(i) {
  //console.log("Painallus ", i);
  //console.log("aktiivisetNappulat taulukon koko" + aktiivisetNappulat.length);
  if (i === aktiivisetNappulat[0]) {
    painallustenLkm++;
    document.getElementById("tulos").innerHTML = painallustenLkm;
    aktiivisetNappulat.shift(0);
  } else {
    lopetaPeli();
  }
}


// Kutsu tätä funktiota, kun peli loppuu.
// Tämäkin tarvinnee täydennystä
function lopetaPeli() {
  //console.log("funktio lopetaPeli alkaa");
  clearTimeout(ajastin); // pysäytä ajastin
  for (var i = 0; i < 3; i++) {
    nappulat[i].style.backgroundColor = "red"; // aseta kaikki punaisiksi
    nappulat[i].onclick = null; // disabloi nappuloiden käsittelijät
    //console.log("nappula" + i);
  }

  // ilmoita lopputulos
  // Vinkki: dokumentissa on valmiina taustaelementti ja elementti
  // lopputuloksen näyttämiseen. Aseta overlay-elementti näkyväksi
  // ja näytä tulos gameoover-elementissä
  document.getElementById("overlay").style.visibility = 'visible';
  document.getElementById("gameover").innerHTML = "GAME OVER<br>" +
    "onnistuneita painalluksia<br>" + painallustenLkm;

  // lopetuksen äänimerkki
  let promise = document.getElementById("loppuAani").play();
  if (promise !== undefined) {
    promise.then(_ => {
      // Autoplay started!
    }).catch(error => {
      // Autoplay was prevented.
      // Show a "Play" button so that user can start playback.
    })};
    //console.log("promise - " + promise);
    //let lopetusAani = document.getElementById("loppuAani");
    //lopetusAani.play();

    //Kutsutaan funktiota pelin lopuksi joka tallentaa pelaajien nimet tallennaMuistiin.
    // nimiKysely();
  talletaTulos();
  }

function talletaTulos() {
    let top10Tulokset = [];
    let i;
    for (i = 0; i < localStorage.length; i++) {
      top10Tulokset[i] = localStorage.key("i");
    }

    top10Tulokset.push(painallustenLkm);
    top10Tulokset.sort(function(a, b){return b - a});
    for (i = 0; i < 10; i++) {
      console.log(i + " - " + top10Tulokset[i]);
    }

    for (i = 0; i < 10; i++) {
      let name = localStorage.key(i);
      //console.log(name + " - " + localStorage.getItem(name));
    }
}


/*
  // Tallenna nimi ja tulos selaimen muistiin. Tulosta top10 pelaajaa pisteineen.
  function nimiKysely() {
    //console.log("tallennaMuistiin funktio alkaa");
    document.getElementById("pelaajanNimi").style.visibility = 'visible';
  }

  function talletaNimi() {
    var nimi = document.getElementById("pelaajanNimi").value;
    console.log(nimi);
  }*/