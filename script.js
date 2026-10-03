document.addEventListener("DOMContentLoaded", function () {

    /* ================= NAVBAR ================= */

    const nav = document.getElementById("site-nav");

    if (nav) {
        nav.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
            <div class="container">

                <a class="navbar-brand fw-bold brand" href="index.html">
                    💊 CarePlus <span>Pharmacy</span>
                </a>

                <button class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#nav">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="nav">

                    <ul class="navbar-nav ms-auto align-items-lg-center">

                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="medicines.html">Medicines</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="categories.html">Categories</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="health-products.html">
                                Health Products
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="services.html">Services</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="offers.html">Offers</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="contact.html">Contact</a>
                        </li>

                        <li class="nav-item">
                            <a class="btn btn-primary rounded-pill px-4 ms-lg-2"
                               href="login.html">
                               Login
                            </a>
                        </li>

                        <li class="nav-item ms-lg-2">
                            <a class="btn btn-outline-primary rounded-pill"
                               href="cart.html">
                               🛒 Cart
                               <span id="cartCount" class="badge bg-danger">0</span>
                            </a>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
        `;
    }


    /* ================= SEARCH ================= */

    const search = document.getElementById("medicineSearch");

    if (search) {

        search.addEventListener("input", function () {

            const value = search.value.toLowerCase().trim();

            const items = document.querySelectorAll(".medicine-item");

            let found = 0;

            items.forEach(function (item) {

                const text = item.innerText.toLowerCase();

                if (text.includes(value)) {
                    item.style.display = "";
                    found++;
                } else {
                    item.style.display = "none";
                }

            });

            let noResult = document.getElementById("noResult");

            if (!noResult) {

                noResult = document.createElement("div");

                noResult.id = "noResult";

                noResult.className =
                    "alert alert-warning text-center mt-4";

                noResult.innerText = "No medicines found.";

                search.parentElement.appendChild(noResult);
            }

            if (value !== "" && found === 0) {
                noResult.style.display = "block";
            } else {
                noResult.style.display = "none";
            }

        });

    }


    /* ================= ADD TO CART ================= */

    let cart = JSON.parse(localStorage.getItem("careplusCart")) || [];


    function updateCartCount() {

        const countElement = document.getElementById("cartCount");

        if (countElement) {

            let total = 0;

            cart.forEach(function (item) {
                total += item.quantity;
            });

            countElement.innerText = total;
        }
    }


    function saveCart() {

        localStorage.setItem(
            "careplusCart",
            JSON.stringify(cart)
        );

        updateCartCount();
    }


    document.querySelectorAll(".add-to-cart").forEach(function (button) {

        button.addEventListener("click", function () {

            const productCard =
                button.closest(".medicine-item") ||
                button.closest(".product-card") ||
                button.closest(".card");

            if (!productCard) {

                alert("Product details not found.");

                return;
            }


            const productNameElement =
                productCard.querySelector(".product-name") ||
                productCard.querySelector("h3") ||
                productCard.querySelector("h4") ||
                productCard.querySelector("h5") ||
                productCard.querySelector("h6");

            const priceElement =
                productCard.querySelector(".price");


            const productName =
                productNameElement
                    ? productNameElement.innerText.trim()
                    : "Medicine";


            let price = 0;

            if (priceElement) {

                price =
                    parseFloat(
                        priceElement.innerText
                            .replace("₹", "")
                            .replace(",", "")
                            .trim()
                    ) || 0;
            }


            const existingProduct =
                cart.find(function (item) {

                    return item.name === productName;

                });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name: productName,

                    price: price,

                    quantity: 1

                });

            }


            saveCart();


            button.innerText = "✓ Added to Cart";

            button.classList.remove("btn-primary");

            button.classList.add("btn-success");


            setTimeout(function () {

                button.innerText = "Add to Cart";

                button.classList.remove("btn-success");

                button.classList.add("btn-primary");

            }, 1500);


            alert(productName + " added to cart!");

        });

    });


    updateCartCount();



    /* ================= LOGIN ================= */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value.trim();


            if (
                email === "travel@gmail.com" &&
                password === "travel123"
            ) {

                localStorage.setItem(
                    "careplusLoggedIn",
                    "true"
                );

                alert(
                    "Login Successful! 🎉 Welcome to CarePlus Pharmacy."
                );

                window.location.href = "index.html";

            } else {

                alert(
                    "Invalid Email or Password ❌\n\nUse:\nEmail: travel@gmail.com\nPassword: travel123"
                );

            }

        });

    }

});


/* ================= PASSWORD ================= */

function togglePassword() {

    const password =
        document.getElementById("password");

    if (!password) return;


    if (password.type === "password") {

        password.type = "text";

    } else {

        password.type =