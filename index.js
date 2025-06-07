//
//
//
// ------------------------------------------------
// ROTEM Interpreter Below
// ------------------------------------------------
//
//
//
function rotemInterpreter() {

  const fibtemA5 = Number($("#fibtemA5Entered").val());
  const extemA5 = Number($("#extemA5Entered").val());
  const extemCT = Number($("#extemCTEntered").val());
  var txa = "Not needed";
  var hyperfib = false;
  
  if ($("#txa").is(":checked")) {
    txa = "1g"
    hyperfib = true;
  };
  
  var cryo = "Not needed";
  var platelets = "Not needed";
  var ffp = "Not needed";
  
  
  if (fibtemA5 < 10){
    if (12 - fibtemA5 <= 3){
      cryo = "10 Units"
    } else if (12 - fibtemA5 >3 && 12 - fibtemA5 <= 5){
      cryo = "15 Units"
    } else if (12 - fibtemA5 >5 && 12 - fibtemA5 <= 8){
      cryo = "20 Units"
    } else if (12 - fibtemA5 >8){
      cryo = "25 Units"
    }
  };

  if (extemA5 < 35){
    platelets = "1 Bag"
  };

  if (extemCT > 80){
    if (fibtemA5 >= 10){
      ffp = "2 Units"
    } else {
      if (extemCT > 140){
        ffp = "2 Units"
      }
    }
  };

  var dictRotem = {
    "Entered variables": " ",
    "______________________________  ":"_________",
    "FIBTEM A5": fibtemA5 + " mm",
    "EXTEM A5": extemA5 + " mm",
    "EXTEM CT": extemCT + " s",
    "PPH, Trauma or Hyperfibrinolysis": hyperfib,
    "______________________________": "__________",
    "Products indicated": "  ",
    "______________________________ ": "__________ ",
    "TXA": txa,
    "Cryoprecipitate": cryo,
    "Platelets": platelets,
    "FFP": ffp
  };

  // Create a table to display the output
  generateTable(".rotemOutput", dictRotem);

}
//
//
//
// ------------------------------------------------
// Local Anaesthetic Calculation Below
// ------------------------------------------------
//
//
//
function localAnaesCalculation() {

  var height = Number($("#heightEntered").val());
  var totalBodyWeight = Number($("#weightEntered").val());
  var finalBodyWeight = 0;
  var sex = $("#sexCategory").val();
  var BMI = totalBodyWeight / (height * height);
  var localChosen = $("#localChoice").val();
  var concChosen = Number($("#localConcentrationEntered").val());
  var finalVolume = 0;
  var weightCategory = "TBW"

  if (height === 0) {
    finalBodyWeight = totalBodyWeight;
  } else {
    if (BMI >= 30) {
      weightCategory = "LBW";
      if (sex === "female") {
        finalBodyWeight = Math.round((9270 * totalBodyWeight) / (8780 + (224 * BMI)));
        console.log("sex = female");
      } else if (sex === "male") {
        finalBodyWeight = Math.round((9370 * totalBodyWeight) / (6680 + (216 * BMI)));
        console.log("sex = female");
      } else {
        console.log("something wrong after BMI if statement");
      }
    } else {
      weightCategory = "TBW";
      finalBodyWeight = totalBodyWeight;
    }
  }

  var ropi = Math.round(3 * finalBodyWeight);
  var bupi = Math.round(2 * finalBodyWeight);
  var levo = Math.round(2.5 * finalBodyWeight);
  var lidoNeat = Math.round(3 * finalBodyWeight);
  var lidoAdr = Math.round(7 * finalBodyWeight);
  var lidoAirway = Math.round(8 * finalBodyWeight);
  // var localName = "";

  switch (localChosen) {
    case "ropivacaine":
      finalVolume = ropi / (concChosen * 10);
      var localName = "Ropivacaine";
      var maxDose = ropi;
      break;
    case "bupivacaine":
      finalVolume = bupi / (concChosen * 10);
      localName = "Bupivacaine";
      maxDose = bupi;
      break;
    case "levobupivacaine":
      finalVolume = levo / (concChosen * 10);
      localName = "Levobupivacaine";
      maxDose = levo;
      break;
    case "lidocaineNeat":
      finalVolume = lidoNeat / (concChosen * 10);
      localName = "Lidocaine (without adrenaline)";
      maxDose = lidoNeat;
      break;
    case "lidocaineAdr":
      finalVolume = lidoAdr / (concChosen * 10);
      localName = "Lidocaine (with adrenaline)";
      maxDose = lidoAdr;
      break;
    case "lidocaineAirway":
      finalVolume = lidoAirway / (concChosen * 10);
      localName = "Lidocaine (for airway)";
      maxDose = lidoAirway;
      break;
    default:
      alert("Default action on switch statement");
      console.log(localChosen + concChosen);
      break;
  }

  var dictLA = {
    "Local Anaesthetic": localName,
    "Concentration": concChosen + " %",
    "Weight": finalBodyWeight + " kg (" + weightCategory + ")",
    "Max Dose": maxDose + " mg",
    "Max Volume": finalVolume + " mL"
  };

  // Create a table to display the output
  generateTable(".laCalcOutput", dictLA);

}

//
//
//
// ------------------------------------------------
// Paed Anaesthesia Calculation Below
// ------------------------------------------------
//
//
//
function paedCalculation() {
  // Declare variables for entered inputs
  var age = Number($("#ageEntered").val());
  var wtEntered = Number($("#weightEntered").val());

  // Declare calculated variables
  var wtCalc = (age + 4) * 2;
  if (wtEntered === 0) {
    var weight = wtCalc;
    var wtCategory = "Estimated";
  } else {
    weight = wtEntered;
    wtCategory = "Actual";
  }
  // LMA sizing algorithm
  if (weight < 5) {
    var lma = 1;
  } else if (weight >= 5 && weight < 10) {
    lma = 1.5;
  } else if (weight >= 10 && weight < 20) {
    lma = 2;
  } else if (weight >= 20 && weight < 30) {
    lma = 2.5;
  } else if (weight >= 30) {
    lma = 3;
  }

  var dictPaed = {
    "Age": (age) + " years",
    "Weight": (weight) + " kg [" + wtCategory + "]",
    "......": "......",
    "sBP": (80 + age * 2) + " mmHg",
    "DC Shock": (weight * 4) + " J",
    "Atropine": (weight * 20) + " mcg",
    "Adrenaline": (weight * 10) + " mcg",
    "Amiodarone": (weight * 5) + " mg",
    "......     ": "......        ",
    "ETT [Uncuffed]": (age / 4) + 4,
    "ETT Depth [Oral]": ((age / 2) + 12) + " cm",
    "LMA": lma,
    "......  ": "......  ",
    "Fentanyl [1-2mcg/kg]": weight + " mcg - " + (weight * 2) + " mcg",
    "Propofol [4-6mcg/kg]": (weight * 4) + " mg - " + (weight * 6) + " mg",
    "Suxamethonium": (weight * 2) + " mg [IV] / " + (weight * 4) + " mg [IM]",
    "...... ": "...... ",
    "Cefazolin": (weight * 50) + " mg",
    "Ondansetron": ((weight * 0.15).toFixed(1)) + " mg",
    "Dexamethasone": ((weight * 0.15).toFixed(1)) + " mg",
    "Paracetamol": (weight * 15) + " mg",
    "Ibuprofen": (weight * 10) + " mg",
    "Ketorolac": (weight * 2) + " mg",
    "......      ": "...... ",
    "Crystalloid [20mL/kg]": (weight * 20) + " mL",
    "pRBC [for 10g/L]": (weight * 4) + " mL"

  };

  // Create a table to display the output
  generateTable(".paedCalcTableDiv", dictPaed);

}
//
//
//
// ------------------------------------------------
// Income Distribution Calculation Below
// ------------------------------------------------
//
//
//
function incomeDistribution() {
  var income = Number($("#income").val());
  // var income = Number(document.querySelector("#income").value);
  var mojo = 0;
  var parents = 0;
  var shares = 0;
  var tax = 0;

  if ($("#pretax").is(":checked")) {
    tax = income/2;
    income = income/2;
  }

  if ($("#mojo").is(":checked")) {
    if (income > 100) {
      income -= 100;
      mojo = 100;
    } else {
      alert("Insufficient funds - Mojo");
    }
  }

  if ($("#parents").is(":checked")) {
    if (income > 800) {
      income -= 800;
      parents = 400;
    } else {
      alert("Insufficient funds - Parents");
    }
  }

  if ($("#shares").is(":checked")) {
    if (income > 1000) {
      income -= 1000;
      shares = 1000;
    } else {
      alert("Insufficient funds - Shares");
    }
  }

  var dictIncomeDistribution = {
    "Tax": "$ " + tax.toFixed(2),
    "Mojo": "$ " + mojo.toFixed(2),
    "Parents' Gift": "$ " + parents.toFixed(2),
    "Shares": "$ " + shares.toFixed(2),
    "Fire Extinguisher": "$ " + (income * 0.65).toFixed(2),
    "Daily Expenses": "$ " + (income * 0.2).toFixed(2),
    "Smile": "$ " + (income * 0.1).toFixed(2),
    "Splurge": "$ " + (income * 0.025).toFixed(2)
  };

  // Create a table to display the output
  generateTable(".incomeOutputTableDiv", dictIncomeDistribution);

}

//
//
//
// ------------------------------------------------
// Body weight calculator below
// ------------------------------------------------
//
//
//
function bodyWeightCalculation(){
    // Variables for entered inputs
    var tbw = Number($("#weightEntered").val());
    var height = Number($("#heightEntered").val());
    var sex = $("#sexCategory").val();

    // Calculated variables
    var bmi = tbw / height**2;
    if (sex === 'male'){
        var ibw = ((height/2.54)-60)*2.3 + 50;
        var lbw = Math.round((9370 * tbw) / (6680 + (216 * bmi)));
    } else if (sex === 'female') {
        var ibw = ((height/2.54)-60)*2.3 + 45.5;
        var lbw = Math.round((9270 * tbw) / (8780 + (224 * bmi)));
    }
    abw = ibw + 0.4*(tbw-ibw)

    // Output string
    var dictBodyWeight = {
        "BMI": bmi.toFixed(0),
        "Total body weight": tbw + " kg",
        "Ideal body weight (Devine)": ibw + " kg",
        "Lean body weight": lbw + " kg",
        "Adjusted body weight": abw + " kg"
    }

    console.log(tbw, ibw, lbw, abw);

    generateTable(".bwOutputTableDiv", dictBodyWeight);

}
//
//
//
// ------------------------------------------------
// Output Table Generator Below
// ------------------------------------------------
//
//
//
function generateTable(selector, dict) {
  // Get the reference for the body
  var body = document.querySelector(selector);

  // Check if element with class "generatedTable" exists -> If so, remove that element before carrying on
  if (document.querySelectorAll(".generatedTable").length != 0) {
    document.querySelectorAll(".generatedTable")[0].remove();
  }

  // Creates a <table> element with class "generatedTable" and a <tbody> element
  var tbl = document.createElement("table");
  tbl.classList.add("generatedTable");
  var tblBody = document.createElement("tbody");

  // Iterate through the dictPaed object
  for (var key in dict) {
    var value = dict[key];

    // create a row
    var row = document.createElement("tr");
    // create the left column cell
    var leftCell = document.createElement("td");
    // generate text for the left column
    var leftCellText = document.createTextNode(key);
    // append text into the left column cell
    leftCell.appendChild(leftCellText);
    // append the left cell to the row
    row.appendChild(leftCell);
    // do the same for the right column
    var rightCell = document.createElement("td");
    var rightCellText = document.createTextNode(value);
    rightCell.appendChild(rightCellText);
    row.appendChild(rightCell);
    // append the row to the <tbody>
    tblBody.appendChild(row);

  }
  // append the <tbody> into the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
}
//
//
//
// ------------------------------------------------
// Page Reset Below
// ------------------------------------------------
//
//
//
function resetPage() {
  location.reload();
}

function buttonClick(){
  var hiddenText = document.querySelector(".hiddenText");
  hiddenText.value = Date.now();
  location.reload();
}

function show_pd_formulae(){
  const txt = `
Weight (kg): (Age + 4) x 2
sBP (mmHg): 80 + (Age x 2)

Uncuffed ETT size: (Age/4) + 4
Oral ETT depth (cm): (Age/2) + 12

LMA size:
  - <5kg: 1.0
  - 5-10kg: 1.5
  - 10-20kg: 2.0
  - 20-30kg: 2.5
  - >30kg: 3.0

DC Shock: 4J/kg
Amiodarone: 5mg/kg
Adrenaline: 10mcg/kg
Atropine: 20mcg/kg

Fentanyl: 1-2mcg/kg
Propofol: 4-6mg/kg
Suxamethonium: 2mg/kg [IV], 4mg/kg [IM]
Cefazolin: 50mg/kg

Ondansetron: 0.15mg/kg
Dexamethasone: 0.15mg/kg
Paracetamol: 15mg/kg
Ibuprofen: 10mg/kg
Ketorolac: 2mg/kg

Crystalloid for shock: 20mL/kg
pRBC to raise Hb by 10g/L: 4mL/kg
        `
  alert(txt);
}

function show_la_formulae(){
  const txt = `
Ropivacaine: 3mg/kg
Bupivacaine: 2mg/kg
Levobupivacaine: 2.5mg/kg
Lidocaine without adrenaline: 3mg/kg
Lidocaine with adrenaline: 7mg/kg
Lidocaine for airway topicalisation: 8mg/kg

Lean Body Weight (Janmahasatian):
  Female: (9270 x TBW) / (8780 + (224 x BMI))
  Male: (9270 x TBW) / (6680 + (216 x BMI))
`
  alert(txt);  
}

function show_bw_formulae(){
  const txt = `
Total Body Weight:
    Suxamethonium
    LMWHs

Lean Body Weight:
    Propofol induction
    Fentanyl and Alfentanil
    Morphine
    Non-depolarising NMBDs
    Paracetamol
    Local Anaesthetics

Adjusted Body Weight:
    Propofol infusion
    Neostigmine
    Sugammadex
    Antibiotics
`

  alert(txt);
}

function go_soba(){
  window.open("https://www.sobauk.co.uk/_files/ugd/373d41_eebe369c3c6b4021bff6f3da059aa796.pdf", '_blank').focus();
}

function go_rotem_guide(){
  window.open("https://raphaelmhpyo.github.io/rptools/rotem-guide.html", '_blank').focus();
}
