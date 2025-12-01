// ==========================================
// Contact Form Submission (Frontend)
// ==========================================
const contactForm = document.getElementById("contactForm"); // Make sure your form has this ID
const toast = document.getElementById("toast");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      // Show toast
      toast.textContent = `Thank you, ${data.name}! We've received your message and will reach out to you soon.`;
      toast.classList.add("show");

      // Hide after 4 seconds
      setTimeout(() => {
        toast.classList.remove("show");
      }, 4000);

      contactForm.reset();
    } else {
      toast.textContent = "Oops! Something went wrong. Please try again.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 4000);
    }
  } catch (err) {
    console.error(err);
    toast.textContent = "Oops! Something went wrong. Please try again.";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }
});
