function calculateDisease(){

let selected=[];

document.querySelectorAll(".symptom-box input:checked").forEach(cb=>{
selected.push(cb.value);
});


let disease="General Weakness";
let medicine="Balanced diet, hydration, multivitamin.";
let diet="Eat fruits, vegetables, drink enough water.";


/* RESPIRATORY */

if(selected.includes("fever") && selected.includes("cough")){

disease="Flu";
medicine="Paracetamol, steam inhalation.";
diet="Warm soup, herbal tea, citrus fruits.";

}

else if(selected.includes("loss_smell") && selected.includes("fever")){

disease="Covid possibility";
medicine="Paracetamol, vitamin C, isolation.";
diet="Protein diet, fluids.";

}

else if(selected.includes("breath_shortness") && selected.includes("chest_pain")){

disease="Respiratory disorder";
medicine="Consult doctor immediately.";
diet="Light diet.";

}


/* DIGESTIVE */

else if(selected.includes("stomach_pain") && selected.includes("diarrhea")){

disease="Food poisoning";
medicine="ORS, probiotics.";
diet="Banana, rice, curd.";

}

else if(selected.includes("acidity") && selected.includes("gas")){

disease="Acidity";
medicine="Antacid.";
diet="Avoid spicy food.";

}


/* HEART */

else if(selected.includes("palpitations") && selected.includes("high_bp")){

disease="Hypertension";
medicine="Monitor BP.";
diet="Low salt diet.";

}


/* MENTAL */

else if(selected.includes("anxiety") && selected.includes("insomnia")){

disease="Stress disorder";
medicine="Meditation.";
diet="Magnesium rich food.";

}


/* SKIN */

else if(selected.includes("itching") && selected.includes("rash")){

disease="Allergy";
medicine="Antihistamine.";
diet="Avoid allergen food.";

}


/* URINARY */

else if(selected.includes("burning_urination")){

disease="UTI";
medicine="Drink water.";
diet="Coconut water.";

}


/* RESULT */

document.getElementById("result-card").style.display="block";

document.getElementById("disease-name").innerText=disease;

document.getElementById("medicine-name").innerHTML=

"<b>Medicine:</b> "+medicine+

"<br><br><b>Diet:</b> "+diet;

}