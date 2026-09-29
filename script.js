// NovaMind AI — basic interactions

document.addEventListener("DOMContentLoaded", () => {

    // Smooth scroll for navigation buttons
    const featureButton = document.querySelector(
        '.secondary-btn'
    );

    // Hero buttons
    const heroButtons = document.querySelectorAll(
        '.hero-buttons button'
    );

    heroButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector("#features").scrollIntoView({
                behavior: "smooth"
            });
        });
    });


    // Get Started buttons
    const startButtons = document.querySelectorAll(
        '.primary-btn'
    );

    startButtons.forEach(button => {

        if (
            button.textContent.includes("Get Started") ||
            button.textContent.includes("Start Creating")
        ) {
            button.addEventListener("click", () => {

                alert(
                    "Welcome to NovaMind AI! Your AI workspace is coming soon."
                );

            });
        }

    });


    // Pricing buttons
    const pricingButtons = document.querySelectorAll(
        '.price-card button'
    );

    pricingButtons.forEach(button => {

        button.addEventListener("click", () => {

            alert(
                "Thank you for choosing NovaMind AI. Account creation will be available soon."
            );

        });

    });


    // AI input demo
    const inputButton = document.querySelector(
        '.input-box button'
    );

    if (inputButton) {

        inputButton.addEventListener("click", () => {

            alert(
                "NovaMind AI is ready. Connect an AI API to enable real AI responses."
            );

        });

    }

});