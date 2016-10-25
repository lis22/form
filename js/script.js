/******************************************************************************/
/* Treehouse Full Stack Javascript Tech Degree                                */
/* Project #3: Interactive Form + EXTRA CREDIT                                */
/* Author: lis22                                                              */
/* Date: Oct 24, 2016                                                         */
/******************************************************************************/

//IFFE to wrap up variables from being global
(function(){

    setupForm();

    /**************************************************************************/
    /* setupForm()                                                            */
    /* Gives focus to the first text field & hides Color Select to be         */
    /* displayed later for EXTRA CREDIT. Selects Credit card option by        */
    /* default. Calls to create total elements and calls to toggle which      */
    /* payment info is displayed                                              */
    /**************************************************************************/
    function setupForm() {
        var index = 1;
        document.getElementById("name").focus();
        document.getElementById("colors-js-puns").classList.add("is-hidden");
        document.getElementById("other-title").classList.add("is-hidden");
        document.getElementById("payment").selectedIndex = index;

        createTotal();
        togglePaymentDiv(index);
    }

    /**************************************************************************/
    /*  Job Role Title Event Handler                                          */
    /*  reveals a text field when the "Other" option is selected from the     */
    /* "Job Role" drop down menu                                              */
    /**************************************************************************/
    document.getElementById("title").addEventListener("change", function() {
        if(this.selectedIndex === 5) {
            document.getElementById("other-title").classList.remove("is-hidden");
        }
        else if (document.getElementById("other-title")){
            document.getElementById("other-title").classList.add("is-hidden");

        }
    });

    /**************************************************************************/
    /*  T-shirt Event Handler                                                 */
    /*  When the user selects "Theme - JS Puns" then the color menu should    */
    /*  display "Cornflower Blue," "Dark Slate Grey," and "Gold."             */
    /*  If the user selects "Theme - I ♥ JS" then the color menu should       */
    /*  display "Tomato," "Steel Blue," and "Dim Grey."                       */
    /*  EXTRA CREDIT: Hide the "Color" label and select menu until a T-Shirt  */
    /*  design is selected from the "Design" menu.                            */
    /**************************************************************************/
    document.getElementById("design").addEventListener("change", function() {
        var colorSelect = document.getElementById("colors-js-puns");

        if(this.selectedIndex===0) {
            colorSelect.classList.add("is-hidden");
        }
        else {
            removeSelectElements("color");

            if(this.selectedIndex===1) {
                createSelectElement("cornflowerblue", "Cornflower Blue", "color");
                createSelectElement("darkslategrey", "Dark Slate Grey", "color");
                createSelectElement("gold", "Gold", "color");
            }
            else if (this.selectedIndex===2){
                createSelectElement("tomato", "Tomato", "color");
                createSelectElement("steelblue", "Steel Blue", "color");
                createSelectElement("dimgrey", "Dim Grey", "color");
            }
            colorSelect.classList.remove("is-hidden");
        }
    });

    /**************************************************************************/
    /* createSelectElement()                                                  */
    /* Accepts value, text, and an id and uses it to create a select option   */
    /* element.                                                               */
    /**************************************************************************/
    function createSelectElement(value, text, id) {
        var element = document.createElement("option");
        element.value = value;
        element.textContent = text;
        document.getElementById(id).appendChild(element);
    }

    /**************************************************************************/
    /*removeSelectElements()                                                  */
    /* Accepts id and removes element                                         */
    /**************************************************************************/
    function removeSelectElements(id) {
        document.getElementById(id).innerHTML = "";
    }

    /**************************************************************************/
    /* Activities Event Handler                                               */
    /* Determines which activity was checked or unchecked                     */
    /* Updates total price and calls to disable conflicting time slot         */
    /* activities or enable previously conflicting activities state           */
    /**************************************************************************/
    document.getElementsByClassName("activities")[0].addEventListener("change", function(event) {
        var name = event.target.name;
        var isChecked = event.target.checked;

        if (name === "all")
            updateTotal(200, isChecked);
        else
            updateTotal(100, isChecked);

        if (name === "js-frameworks")
            toggleActivityState("express",isChecked);

        else if (name === "js-libs")
            toggleActivityState("node",isChecked);

        else if (name === "express")
            toggleActivityState("js-frameworks",isChecked);

        else if (name === "node")
            toggleActivityState("js-libs",isChecked);
    });

    /**************************************************************************/
    /* toggleActivityState()                                                  */
    /* Accepts a checkbox name and boolean if it should be disabled           */
    /* If it should be disabled, changes style to indicate it is.             */
    /* Otherwise resets styles back to original values.                       */
    /**************************************************************************/
    function toggleActivityState(name, disable) {
        var element = document.querySelector("[name=" + name +"]");
        if (disable) {
            element.disabled = true;
            element.parentElement.style.textDecoration = "line-through";
            element.parentElement.style.color = "grey";
        }
        else {
            element.disabled = false;
            element.parentElement.style.textDecoration = "none";
            element.parentElement.style.color = "black";
        }
    }

    /**************************************************************************/
    /* createTotal()                                                           */
    /* Creates a form element to display the activity price total             */
    /**************************************************************************/
    function createTotal() {
        var total = document.createElement("label");
        total.innerHTML = "Total: $0";
        total.setAttribute("id","total");
        total.style.fontSize ="1.2em";
        total.style.fontWeight ="400";

        document.getElementsByClassName("activities")[0].appendChild(total);
        document.getElementById("total").classList.add("is-hidden");
    }

    /**************************************************************************/
    /* updateTotal()                                                          */
    /* Accepts the price value and if it is checked to determine neg or pos   */
    /* Extracts the previous total value, updates the new price,              */
    /* and displays to the page.                                              */
    /**************************************************************************/
    function updateTotal(price, isChecked) {
        var totalElem = document.getElementById("total");
        var elementText = document.getElementById("total").innerHTML;
        var totalValue = parseInt(elementText.replace(/\D/g,""));

        if (isChecked)
            totalValue += price;
        else
           totalValue -=  price;

        totalElem.innerHTML = "Total: $" + totalValue;
        totalElem.style.display="inline-block";
    }

    /**************************************************************************/
    /* Event Listener for Payment Types                                       */
    /* Sends index to another function that determines what to show/hide      */
    /**************************************************************************/
    document.getElementById("payment").addEventListener("change",function(){
        togglePaymentDiv(this.selectedIndex);
    });

    /**************************************************************************/
    /* togglePaymentDiv()                                                     */
    /* Accepts an index value and shows/hide the credit card, paypal, bitcoin */
    /* divs depending on the index value.                                     */
    /**************************************************************************/
    function togglePaymentDiv(index) {
        var creditCard = document.getElementById("credit-card");
        var paypal = creditCard.nextElementSibling;
        var bitcoin = paypal.nextElementSibling;

        if (index === 1) {
            creditCard.classList.remove("is-hidden");
            paypal.classList.add("is-hidden");
            bitcoin.classList.add("is-hidden");
        }
        else if (index === 2) {
            paypal.classList.remove("is-hidden");
            creditCard.classList.add("is-hidden");
            bitcoin.classList.add("is-hidden");
        }
        else if (index === 3) {
            bitcoin.classList.remove("is-hidden");
            creditCard.classList.add("is-hidden");
            paypal.classList.add("is-hidden");
        }
    }

    /**************************************************************************/
    /* Submit Button Event listener                                           */
    /* Validate form and says if it is valid or prevents form from submitting */
    /* from submitting if not valid                                           */
    /**************************************************************************/
    document.getElementsByTagName("button")[0].addEventListener("click",function(event){
        var isValid=false;

        isValid = isValidateForm();

        if(isValid)
            alert("Thank you. Form successfully submitted.");
        else
            event.preventDefault();
    });

    /**************************************************************************/
    /* isValidForm()                                                          */
    /* Determines if each part of the form is valid.                          */
    /* Returns true when all validation requirements are met, false if not    */
    /**************************************************************************/
    function isValidateForm() {
        var validName = validateName();
        var validEmail = validateEmail();
        var validActivity = validateActivity();
        var validPayment = validatePayment();

        return validName && validEmail && validActivity && validPayment;
    }

    /**************************************************************************/
    /* validateName()                                                         */
    /* Determines if name field is empty, if it is shows error otherwise      */
    /* it resets back to default. Returns true if valid name, false if not.   */
    /**************************************************************************/
    function validateName() {
        var name = document.getElementById("name");
        var label = name.previousElementSibling;

        if(name.value) {
            label.innerHTML = "Name: ";
            label.style.color = "black";
            return true;
        }
        else {
            label.innerHTML = "Name: (please provide your name)";
            label.style.color = "firebrick";
            return false;
        }
    }

    /**************************************************************************/
    /* validateEmail()                                                        */
    /* Determines if email is invalid, uses regular expression to validate    */
    /* Shows error if invalid or resets if valid. Returns true if email is    */
    /* valid and false if not.                                                */
    /**************************************************************************/
    function validateEmail() {
        var email = document.getElementById("mail");
        var label = email.previousElementSibling;

        var pattern = new RegExp("\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\\b", "i");

        if (pattern.test(email.value)) {
            label.innerHTML = "Email: ";
            label.style.color = "black";
            return true;
        }
        else {
            label.innerHTML = "Email: (please provide a valid email address)";
            label.style.color = "firebrick";
            return false;
        }
    }

    /**************************************************************************/
    /* validateActivity()                                                     */
    /* Determines if activity is chosen, if not creates an error to display   */
    /* Returns true if an activity is chosen and false if not.                */
    /**************************************************************************/
    function validateActivity() {
        var list = document.querySelectorAll("input[type='checkbox']");
        var legend = document.getElementsByClassName("activities")[0].firstElementChild;
        var error = document.getElementById("errorActivity");
        var activityChosen =  false;

        for(var i=0; i< list.length; i++) {
            if (list[i].checked) {
                activityChosen=true;
                break;
            }
        }

        if (error)
            legend.parentNode.removeChild(error);
        if (activityChosen)
            return true;
        else {
            error = document.createElement("label");
            error.innerHTML = "Don't forget to select an activity.";
            error.setAttribute("id","errorActivity");
            error.style.color = "firebrick";
            legend.parentNode.insertBefore(error, legend.nextSibling);
            return false;
        }
    }

    /**************************************************************************/
    /* validatePayment()                                                      */
    /* Validates that a payment type is selected, shows error otherwise       */
    /* When credit card is chosen, calls to perform additional validation     */
    /* Returns true if payment is valid and false if not.                     */
    /**************************************************************************/
    function validatePayment() {
        var payment = document.getElementById("payment");
        var legend = document.getElementsByTagName("fieldset")[3].firstElementChild;
        var error = document.getElementById("errorPayment");

        if (error)
            legend.parentNode.removeChild(error);

        if (payment.selectedIndex === 0) {
            var errorPayment = document.createElement("label");
            errorPayment.innerHTML = "Don't forget to select a payment method.";
            errorPayment.setAttribute("id","errorPayment");
            errorPayment.style.color = "firebrick";
            legend.parentNode.insertBefore(errorPayment, legend.nextSibling);
            return false;
        }
        else if (payment.selectedIndex === 1)
            return  validateCreditCard();

        else if (payment.selectedIndex === 2 || payment.selectedIndex === 3  )
            return true;

    }

    /**************************************************************************/
    /* validateCreditCard()                                                   */
    /* Validates that user gave a valid credit card number, a valid zipcode,  */
    /* and a valid 3 number CVV. Displays error if not valid, returns false   */
    /* if one area is invalid, otherwise returns true if all valid.           */
    /**************************************************************************/
    function validateCreditCard() {
        var cardNum = document.getElementById("cc-num");
        var cardLabel = cardNum.previousElementSibling;
        var zipCode = document.getElementById("zip");
        var zipLabel = zipCode.previousElementSibling;
        var cvv = document.getElementById("cvv");
        var cvvLabel = cvv.previousElementSibling;

        var zipPattern = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
        var cvvPattern =  new RegExp("^[0-9]{3}$");
        var cardPattern = new RegExp("^[0-9]*$");

        var inValidCount=0;

        if (cardPattern.test(cardNum.value) && validCreditNum(cardNum.value))
            cardLabel.style.color = "black";

        else {
            cardLabel.style.color = "firebrick";
            inValidCount++;
        }

        if (zipPattern.test(zipCode.value))
            zipLabel.style.color = "black";

        else {
            zipLabel.style.color = "firebrick";
            inValidCount++;
        }

        if (cvvPattern.test(cvv.value))
            cvvLabel.style.color = "black";

        else {
            cvvLabel.style.color = "firebrick";
            inValidCount++;
        }
        return inValidCount === 0;
    }

    /**************************************************************************/
    /* validCreditNum()  -EXTRA CREDIT-                                       */
    /* Accepts a string that contains only numbers                            */
    /* Uses Luhn Algorithm and returns true if valid number and false if not  */
    /* 1. Removes last digit from number and saves as check digit             */
    /* 2. Reverses the numbers                                                */
    /* 3. Multiply the digits in odd positions 1,3,5 (even array index values)*/
    /*    by 2 and subtract 9 to all results higher than 9.                   */
    /* 4. Add all the numbers together to get a total                         */
    /* 5. Add the total and the checkvalue together & test if multiple of 10  */
    /*    If it is then the credit card number is valid                       */
    /**************************************************************************/
    function validCreditNum(str) {
        var checkDigit = parseInt(str.charAt(str.length-1));
        var totalNumbers=0;
        var reverseArr = str.slice(0,-1).split("").reverse();

        for(var i=0; i<reverseArr.length; i++) {
            if (i % 2 === 0)
                reverseArr[i] *= 2;
            if (reverseArr[i] > 9)
                reverseArr[i] -= 9;
            totalNumbers += parseInt(reverseArr[i]);
        }
        return ((totalNumbers + checkDigit) % 10 === 0);
    }

}());
