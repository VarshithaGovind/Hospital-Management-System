document.getElementById("donationForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;

    console.log("Donation Submitted:", { name, email, type, amount });

    alert(`Thank you ${name} for your generous donation!`);
});
