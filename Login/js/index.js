use stric
class Login{
        validateonSubmit() {
            let self = this; // setup calls to the "this" values of the class described in the constructor
            // add a "submit" event listener to the form
            this.form.addEventListener("submit", (e) => {
            // remove default functionality 
            e.preventDefault();
            var error = 0;
            // loop through the fields and check them against a function for validation
            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (self.validateFields(input) == false) {
                    // if a field does not validate, auto-increment our error integer
                    error++;
                }
            });
            // if everything validates, error will be 0 and can continue
            if (error == 0) {
                //do login api here or in this case, just submit the form and set a localStorage item
                localStorage.setItem("auth", 1);
                this.form.submit();
            }
        });
    }
    validateFields(field) {
        // remove any whitespace and check to see if the field is blank, if so return false
        if (field.value.trim() === "") {
            // set the status based on the field, the field label, and if it is an error message
            this.setStatus( field,
                `${field.previousElementSibling.innerText} cannot be blank`,
                "error"
                );
                return false;
            } else {
                // if the field is not blank, check to see if it is password
                if (field.type == "password") {
                    // if it is a password, check to see if it meets our minimum character requirement
                    if (field.value.length < 8) {
                        // set the status based on the field, the field label, and if it is an error message
                        this.setStatus( field,
                            `${field.previousElementSibling.innerText} must be at least 8 characters`,
                            "error"
                            );
                            return false;
                        } else {
                            // set the status based on the field without text and return a success message
                            this.setStatus(field, null, "success");
                            return true;
                        }
                    } else {
                        // set the status based on the field without text and return a success message
                        this.setStatus(field, null, "success");
                        return true;
                    }
                }
            }
            setStatus(field, message, status) {
                // create variable to hold message
                const errorMessage = field.parentElement.querySelector(".error-message");

                // if success, remove messages and error classes
                if (status == "success") {
                    if (errorMessage) {
                        errorMessage.innerText = "";
                    }
                    field.classList.remove("input-error");
                }
                // if error, add messages and add error classes
                if (status == "error") {
                    errorMessage.innerText = message;
                    field.classList.add("input-error");
                }
            }

            // create a variable for the login form
            const form = document.querySelector(".loginForm");
            // if the form exists, run the class
            if (form) {
                // setup the fields we want to validate, we only have two but you can add others
                const fields = ["username", "password"];
                // run the class
                const validator = new Login(form, fields);
            }
            class Auth {
                // setup the class and hide the body by default
                constructor() {
                document.querySelector("body").style.display = "none";
                const auth = localStorage.getItem("auth");
                this.validateAuth(auth);
            }
            // check to see if the localStorage item passed to the function is valid and set
            validateAuth(auth) {
                if (auth != 1) {
                    window.location.replace("/");
                } else {
                    document.querySelector("body").style.display = "block";
                }
            }
            // will remove the localStorage item and redirect to login  screen
            logOut() {
                localStorage.removeItem("auth");
                window.location.replace("/");
            }
        }
    }
