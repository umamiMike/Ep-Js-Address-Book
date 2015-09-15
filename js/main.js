function Contact(firstName, lastName){
  this.firstName = firstName
  this.lastName = lastName
  this.addresses = []
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(street, city, state, category) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.category = category;
}

Address.prototype.fullAddress = function() {

  var tempCategory = "";
  if (typeof this.category === "undefined")
  {tempCategory = ""}
  else {tempCategory = this.category + ", ";}

  return tempCategory + this.street + ", " + this.city + ", " + this.state;
}

function resetFields(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $("div.new-address").not(':first').remove();
}



function showContacts(newContact) {

      $("#show-contact").show(600);

      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
          $("ul#addresses").append("<li>" + address.street + ", " + address.city + ", " + address.state + "</li>");
      });
    }

$(document).ready(function() {


    $("#add-address").click(function() {

        $(".new-address:last").clone().find("input:text").val("").end().last().appendTo("#new-addresses");
      });

    $("form#new-contact").submit(function(event) {
        event.preventDefault();

        var inputtedFirstName = $("input#new-first-name").val();
        var inputtedLastName = $("input#new-last-name").val();


        var newContact = new Contact(inputtedFirstName, inputtedLastName);

        $(".new-address").each(function(){
            var iType = $(this).find("input.new-type").val();
            var iStreet = $(this).find("input.new-street").val();
            var iCity = $(this).find("input.new-city").val();
            var iState = $(this).find("input.new-state").val();

                var newAddress = {
                    street: iStreet,
                    city: iCity,
                    state: iState,
                    type: iType
                }

                newContact.addresses.push(newAddress);
                });


           $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span><li>");




      $(".contact").last().click(function (){showContacts(newContact)});//ends contact click function


        resetFields();


  });//ends form submit function
});//ends document ready function
