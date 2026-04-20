function goToBooking(movie){
    localStorage.setItem("movie", movie);
    window.location.href = "booking.html";
}

function selectShow(time){
    localStorage.setItem("time", time);
    window.location.href = "seats.html";
}
if(window.location.pathname.includes("seats.html")){

    const movie = localStorage.getItem("movie");
    const time = localStorage.getItem("time");

    document.getElementById("movieTitle").innerText = "Movie: " + movie;
    document.getElementById("showTime").innerText = "Show Time: " + time;

    const seats = document.querySelectorAll(".seat");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    let price=190;

    let bookedSeats = JSON.parse(localStorage.getItem(movie + time)) || [];

    seats.forEach(seat =>{
        if(bookedSeats.includes(seat.innerHTML)){
            seat.classList.add("booked");
        }
    });

    seats.forEach(seat =>{
        seat.addEventListener("click", () =>{
            if(seat.classList.contains("booked"))return;

            seat.classList.toggle("selected");
            updateTotal();
        });
    });
    function updateTotal(){
        const selectedSeats = document.querySelectorAll(".seat.selected");
        
        let seatsArr = [];
        selectedSeats.forEach(seat => {
            seatsArr.push(seat.innerText);
        });

        count.innerText = seatsArr.length;
        total.innerText = seatsArr.length * price;

        localStorage.setItem("selectedSeats", JSON.stringify(seatsArr));
    }

    window.bookSeats = function () {
        let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

        let bookedSeats = JSON.parse(localStorage.getItem(movie + time)) || [];

        let finalSeats = [...bookedSeats, ...selectedSeats];

        localStorage.setItem(movie + time, JSON.stringify(finalSeats));

        window.location.href = "beverage.html";
    }
}

// STEP 4: Confirmation page
if (window.location.pathname.includes("confirm.html")) {

    const movie = localStorage.getItem("movie");
    const time = localStorage.getItem("time");
    const seats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    const snackItems = JSON.parse(localStorage.getItem("snackItem")) || [];
    const snackTotal = localStorage.getItem("snackTotal") || 0;

    let ticketTotal = seats.length * 150;
    let finalTotal = ticketTotal + Number(snackTotal);
    
    document.getElementById("movie").innerText = "Movie: " + movie;
    document.getElementById("time").innerText = "Time: " + time;
    document.getElementById("seats").innerText = "Seats: " + seats.join(", ");
    document.getElementById("snacks").innerText = "Snacks: " + snackItems.join(", ");
    document.getElementById("snackTotal").innerText = "Snack Total: ₹" + snackTotal;
    document.getElementById("total").innerText = "Total: ₹" + finalTotal;

    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("snackItems");
    localStorage.removeItem("snackTotal");
}

//beverage page
// ================= BEVERAGE PAGE =================
if (window.location.pathname.includes("beverage.html")) {

    let snackTotal = Number(localStorage.getItem("snackTotal")) || 0;
    let items = JSON.parse(localStorage.getItem("snackItems")) || [];

    document.getElementById("snackTotal").innerText = snackTotal;

    window.addItem = function(name, price) {
        snackTotal += price;
        items.push(name);

        document.getElementById("snackTotal").innerText = snackTotal;

        localStorage.setItem("snackTotal", snackTotal);
        localStorage.setItem("snackItems", JSON.stringify(items));
    }

    window.goToConfirm = function() {
        window.location.href = "confirm.html";
    }
}
function goHome() {
    window.location.href = "index.html";
}