$(document).ready(function () {
  // Theme toggle
  $("#theme-toggle").on("click", function () {
    $("body").toggleClass("dark-mode");
    localStorage.setItem(
      "theme",
      $("body").hasClass("dark-mode") ? "dark" : "light"
    );
  });

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    $("body").addClass("dark-mode");
  }

  // Password visibility toggle
  $(".toggle-password").on("click", function () {
    const passwordInput = $("#password");
    const icon = $(this);

    if (passwordInput.attr("type") === "password") {
      passwordInput.attr("type", "text");
      icon.removeClass("fa-eye-slash").addClass("fa-eye");
    } else {
      passwordInput.attr("type", "password");
      icon.removeClass("fa-eye").addClass("fa-eye-slash");
    }
  });

  // Form validation
  $("#login-form").on("submit", function (e) {
    e.preventDefault();

    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    let isValid = true;

    if (!isValidEmail(email)) {
      showError($("#email"), "Please enter a valid email address");
      isValid = false;
    } else {
      hideError($("#email"));
    }

    if (password.length < 6) {
      showError($("#password"), "Password must be at least 6 characters long");
      isValid = false;
    } else {
      hideError($("#password"));
    }

    if (isValid) {
      // Here you would typically send the form data to your server
      alert("Login successful!");
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(input, message) {
    const errorElement = input.next(".error-message");
    if (errorElement.length === 0) {
      input.after(
        `<span class="error-message" style="color: red; font-size: 12px;">${message}</span>`
      );
    } else {
      errorElement.text(message);
    }
    input.css("border-color", "red");
  }

  function hideError(input) {
    input.next(".error-message").remove();
    input.css("border-color", "");
  }
});
