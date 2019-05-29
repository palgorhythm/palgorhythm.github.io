import $ from "jquery";
import formToObject from "form-to-object";
import timbrePoly from "./timbre-poly.js";
import queryString from "query-string";
import empty from "is-empty";
import isMobile from "ismobilejs";

let intervals;
if (isMobile.any) {
  $("#mobile-device-warning").show();
}

var params = document.querySelectorAll(".form-field");
if (!empty(params)) {
  $("#levels").val(params[0].value);
  $("#A").val(params[1].value);
  $("#B").val(params[2].value);
  $("#bpm").val(params[3].value);
}

$("body").fadeIn({ duration: 3000, easing: "swing" });
$("body").click(e =>{
  console.log('clicked somewhere!',e);
  
})
$("#form").submit(function(e) {
  e.preventDefault();
  e.stopPropagation();
  $("#start").hide();
  $("#stop").show();
  var opts = formToObject(this);
  intervals = timbrePoly(opts);
});

$("#stop").click(e => {
  e.preventDefault();
  e.stopPropagation();
  $("div.dot").remove();
  intervals.forEach(el => {
    el.inter.stop();
  });
  $("#start").show();
  $("#stop").hide();
  // OLD STUFF THAT REFRESHES PAGE
  // var form = $("#form")[0];
  // var opts = formToObject(form);
  // var searchParams = queryString.stringify(opts);
  // location.search = searchParams;
});