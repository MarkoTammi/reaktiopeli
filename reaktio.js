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

  var seuraava = arvoUusi(nykyinen);

  if (aktiivisetNappulat.length > 9) {
    lopetaPeli();
  } else {
    aktiivisetNappulat.push(seuraava);

    // päivitä nappuloiden värit: vanha mustaksi, uusi punaiseksi
    nappulat[nykyinen].style.backgroundColor = "black"; // vanha mustaksi
    nappulat[seuraava].style.backgroundColor = "red"; // uusi punaiseksi

    nykyinen = seuraava;

    // aseta ajastin seuraavalle vaihdolle, vaihtumistahti kiihtyy koko ajan!
    ajastin = setTimeout(aktivoiSeuraava, (aika * 0.99), (aika * 0.99));
  }
}

function arvoUusi(edellinen) {

  while (true) {
    let uusi = Math.floor((Math.random() * 3));
    if (uusi != edellinen) {
      return uusi;
    }
  }
}

// Tätä funktiota kutsutaan aina, kun jotain nappulaa painetaan
function painallus(i) {

  if (i === aktiivisetNappulat[0]) {
    painallustenLkm++;
    document.getElementById("tulos").innerHTML = painallustenLkm;
    aktiivisetNappulat.shift(0);
  } else {
    lopetaPeli();
  }
}


// funktiota, kun peli loppuu.
function lopetaPeli() {

  clearTimeout(ajastin); // pysäytä ajastin
  for (var i = 0; i < 3; i++) {
    nappulat[i].style.backgroundColor = "red"; // aseta kaikki punaisiksi
    nappulat[i].onclick = null; // disabloi nappuloiden käsittelijät
    //console.log("nappula" + i);
  }

  // lopputulos näkyviin
  document.getElementById("overlay").style.visibility = 'visible';
  document.getElementById("gameover").innerHTML = "GAME OVER<br>" +
    "onnistuneita painalluksia<br>" + painallustenLkm;

  // lopetuksen äänimerkki
  let promise = document.getElementById("loppuAani").play();

  // estää virheilmoituksen jos käyttäjä ei ole painanut kertaakaan ja soittaa äänen
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

    // TÄSTÄ ETEENPÄIN ON VIELÄ TYÖNALLA
    
    //Kutsutaan funktiota pelin lopuksi joka tallentaa pelaajien nimet tallennaMuistiin.
  // talletaTulosSimppeli();
}

function talletaTulosSimppeli() {
    console.log("talletaTulosSimppeli funktio alkaa");
    document.getElementById("pelaajanNimiForm").style.visibility = 'visible';
}

// jos key ei löydy localStoragesta metodi paluttaa 'null'

function talletaNimi() {
    var nimi = document.getElementById("pelaajanNimi").value;
    var top10 = localStorage.getItem("topPelaajat");
    console.log("top10 - " + top10);
    console.log("painallus - " + painallustenLkm); 
    if (top10 == null) {
      var pelaajatPisteet = nimi.concat("," , toString(painallustenLkm));
      console.log("pelaajatPisteet - " + pelaajatPisteet);
      localStorage.setItem("topPelaajat", pelaajatPisteet)
    }
    console.log(topPelaajat);
}


/*
// SEKALAISTA KAMAA - DO NOT CARE
function talletaTulosComplex() {

    let top10Tulokset = [];
    let i;
    for (i = 0; i < localStorage.length; i++) {
      top10Tulokset[i] = localStorage.getItem(i);
    }

    console.log(top10Tulokset);

    top10Tulokset.push(painallustenLkm);
    top10Tulokset.sort(function(a, b){return b - a});
    for (i = 0; i < 10; i++) {
      console.log(i + " - " + top10Tulokset[i]);
    }

    for (i = 0; i < 10; i++) {
      localStorage.setItem(i, top10Tulokset[i]);
    }*/