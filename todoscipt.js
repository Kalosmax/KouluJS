// Hakee tehtävät kun sivu latautuu
haeTehtavat()
// Hakee tehtävät muistista
function haeTehtavat(){
    let tehtavat=localStorage.getItem("todo")
    const tehtavalista=document.getElementById("tehtavalista")
    tehtavalista.innerHTML=""
    if (!tehtavat) return
    tehtavat=JSON.parse(tehtavat)
    tulostaTehtavat(tehtavat)
   };
// Tulostaa muistista haetut tehtävät
function tulostaTehtavat(tehtavat){
    tehtavat.forEach((tehtava, indeksi) => {
        const li = document.createElement("li");
        const span=document.createElement("span")

        if (tehtava[1]){
            li.className="checked"
        }
        span.innerText=tehtava[0]
        // Luo uuden listan ja vaihtaa klikatun tehtävän tilaa käänteiseksi
        span.addEventListener("click", function(e){
            const uusilista = []
            tehtavat.forEach((t, i) => {
                if (i === indeksi) {
                    uusilista.push([t[0], !t[1]])
                } else {
                    uusilista.push(t)
                }
            })

            localStorage.setItem("todo", JSON.stringify(uusilista))
            haeTehtavat()
        })
        // Lisää napin
        console.log(tehtava)
        const nappi=document.createElement("button")
        nappi.textContent="X"
        // Tallentaa muistiin kaikki tehtävät paitsi poistetun
        nappi.addEventListener("click", function(e){
            const uusilista = []
            tehtavat.forEach((t, i) => {
                if (i !== indeksi) {
                    uusilista.push(t)
                }
            })
            localStorage.setItem("todo", JSON.stringify(uusilista))
            haeTehtavat()
        })

        li.appendChild(span)
        li.appendChild(nappi)
        nappi.className="close";
        const tehtavalista=document.getElementById("tehtavalista")
        tehtavalista.appendChild(li)
      })

}
// Tallentaa uuden tehtävän listana, jossa ensimmäinen indeksi on tehtävän nimi ja tehtävän tila
function uusiTehtava(){
    const tehtavakentta=document.getElementById("tehtava-nimi")
    const tehtavannimi=tehtavakentta.value
    tehtavakentta.value=""
    if (tehtavannimi === '') {
        alert("Et voi jättää kenttää tyhjäksi!");
        return
      }
    let tehtavat=localStorage.getItem("todo")
    if (tehtavat) {
        console.log("Lista", tehtavat)
        tehtavat = JSON.parse(tehtavat)
        tehtavat.push([tehtavannimi, false])
        localStorage.setItem("todo", JSON.stringify(tehtavat))
    } else {
        localStorage.setItem("todo", JSON.stringify([[tehtavannimi, false]]))
    }
    haeTehtavat()
}