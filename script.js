const questions = [
  {q:"Preterm labour is defined as the onset of labour after fetal viability and before 37 weeks.", a:true},
  {q:"The incidence of preterm labour is typically reported as 20–25% of all pregnancies.", a:false},
  {q:"About half of preterm labour cases have no apparent cause.", a:true},
  {q:"A history of two or more first-trimester abortions is listed as a historical risk factor for preterm labour.", a:true},
  {q:"Previous cervical surgery is not considered a historical factor for preterm labour.", a:false},
  {q:"Low socioeconomic status is listed as a social factor associated with preterm labour.", a:true},
  {q:"Maternal age between 20 and 35 is identified as a social risk factor for preterm labour.", a:false},
  {q:"Smoking is a social factor that increases risk of preterm labour.", a:true},
  {q:"Lack of antenatal care (ANC) is listed as a risk factor for preterm labour.", a:true},
  {q:"Maternal medical disorders such as diabetes, cardiac disease, renal disease, and anemia are maternal factors associated with preterm labour.", a:true},
  {q:"Local obstetric disorders such as APH and PIH are not associated with preterm labour.", a:false},
  {q:"Fetal factors for preterm labour include congenital anomalies, polyhydramnios, and multiple pregnancy.", a:true},
  {q:"IUFD is listed among fetal factors related to preterm labour.", a:true},
  {q:"PROM is not considered a fetal factor for preterm labour.", a:false},
  {q:"Iatrogenic causes of preterm labour can include premature induction, external cephalic version, and amniocentesis.", a:true},
  {q:"Intracranial hemorrhage in preterm infants is linked to capillary fragility, weak skull bones, and hypoprothrombinemia.", a:true},
  {q:"Respiratory problems in preterm infants do not include atelectasis or respiratory distress syndrome.", a:false},
  {q:"Metabolic complications of preterm infants may include hypothermia, hypoglycemia, jaundice, and neonatal anemia.", a:true},
  {q:"Infection risk is decreased in preterm infants because of a more active immune system.", a:false},
  {q:"Long-term effects of preterm birth can include impaired mental development.", a:true},
  {q:"The best predictor of risk for preterm labour is a bad obstetric history.", a:true},
  {q:"Early signs of threatened preterm labour include regular contractions, pelvic pressure, backache, bloody discharge, and cervical changes.", a:true},
  {q:"Uterine contractions alone are diagnostic of established preterm labour.", a:false},
  {q:"Typical characteristics of a preterm baby include red skin, weight <2.5 kg, absent vernix, and weak cry.", a:true},
  {q:"Prophylactic management of preterm labour includes treating predisposing factors and detecting those at risk.", a:true},
  {q:"Management of threatened preterm labour commonly includes bed rest and tocolytic drugs.", a:true},
  {q:"Hospitalization and careful conduct of delivery are recommended for established preterm labour.", a:true},
  {q:"For preterm infants, oxygen concentration above 50% is recommended.", a:false},
  {q:"Incubators for preterm infants should maintain body temperature around 37°C with humidity ≤70%.", a:true},
  {q:"Prophylactic antibiotics and early feeding help prevent hypoglycemia and infection in preterm infants.", a:true},
  {q:"Prerequisites for tocolysis include cervical dilatation <4 cm and absence of bleeding, IUFD, IUGR, anomalies, or contraindications.", a:true},
  {q:"Patients with antepartum hemorrhage are good candidates for tocolysis.", a:false},
  {q:"β2-agonists such as ritodrine and salbutamol are used as tocolytics and usually given by IV drip.", a:true},
  {q:"Maternal side effects of β-agonists include tachycardia, hypotension, arrhythmias, pulmonary edema, hyperglycemia, and hypokalemia.", a:true},
  {q:"Fetal side effects of β-agonists may include hypotension, fetal death, ileus, and hypoglycemia.", a:true},
  {q:"Prostaglandin synthetase inhibitors have no maternal or fetal side effects.", a:false},
  {q:"Indomethacin may cause fetal pulmonary hypertension due to premature closure of the ductus arteriosus.", a:true},
  {q:"Calcium-channel blockers like nifedipine reduce uterine contractions and may cause maternal hypotension.", a:true},
  {q:"Magnesium sulfate, progesterone, aminophylline, atosiban, and nitrates are among agents related to tocolysis.", a:true},
  {q:"Post-maturity is defined as pregnancy extending to or beyond 42 weeks.", a:true},
  {q:"The incidence of post-maturity is approximately 5–10% of pregnancies.", a:true},
  {q:"Causes of post-maturity include decreased fetal cortisol, reduced prostaglandins, reduced uterine distension, familial tendency, and idiopathic causes.", a:true},
  {q:"Post-maturity complications include IUGR, IUFD, oligohydramnios, macrosomia, and post-mature baby features.", a: true},
  {q:"At 40 weeks, management may include modified biophysical profile; abnormal results may indicate termination.", a:true},
  {q:"If MBPP at 40 weeks is normal, it is repeated at 41 weeks before further decisions.", a:true}
];

let index=0;
let answered=false;
let results=[];

const qText=document.getElementById("questionText");
const counter=document.getElementById("counter");
const trueBtn=document.getElementById("trueBtn");
const falseBtn=document.getElementById("falseBtn");
const nextBtn=document.getElementById("nextBtn");
const retryBtn=document.getElementById("retryBtn");
const qList=document.getElementById("questionsList");

function toggleMenu(){
  const m=document.getElementById("sideMenu");
  const o=document.getElementById("overlay");
  if(m.style.right==="0px"){m.style.right="-250px";o.style.display="none";}
  else{m.style.right="0";o.style.display="block";}
}

function startQuiz(){
  shuffle();
  index=0;
  results=Array(questions.length).fill(null);
  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";
  document.querySelector(".options").style.display="flex";
  document.getElementById("questionsBtn").style.display="block";
  retryBtn.style.display="none";
  loadQuestion();
}

function loadQuestion(){
  answered=false;
  trueBtn.style.background="#3498db";
  falseBtn.style.background="#3498db";
  nextBtn.style.display="none";
  counter.innerText=`Question ${index+1} / ${questions.length}`;
  qText.innerText=questions[index].q;
}

function answer(val){
  if(answered) return;
  answered=true;
  const correct=questions[index].a;
  results[index]=(val===correct);

  if(val===correct){
    (val?trueBtn:falseBtn).style.background="#27ae60";
  }else{
    (val?trueBtn:falseBtn).style.background="#e74c3c";
    (correct?trueBtn:falseBtn).style.background="#27ae60";
  }

  if(results.every(r=>r!==null)){
    finishQuiz();
  }else{
    nextBtn.style.display="inline-block";
  }
}

function nextQuestion(){
  index = results.findIndex((r,i)=>r===null && i>index);
  if(index===-1){
    index = results.findIndex(r=>r===null);
  }
  loadQuestion();
}

function finishQuiz(){
  qText.innerText=`✅ Finished — Score: ${results.filter(r=>r).length} / ${questions.length}`;
  document.querySelector(".options").style.display="none";
  document.getElementById("questionsBtn").style.display="none";
  nextBtn.style.display="none";
  retryBtn.style.display="inline-block";
}

function retryQuiz(){
  startQuiz();
}

function toggleQuestions(){
  qList.innerHTML="";
  qList.style.display=qList.style.display==="block"?"none":"block";
  results.forEach((r,i)=>{
    const d=document.createElement("div");
    d.className="q-item "+(r===true?"correct":r===false?"wrong":"unanswered");
    d.innerText=i+1;
    d.onclick=()=>{
      index=i;
      loadQuestion();
      qList.style.display="none";
    };
    qList.appendChild(d);
  });
}

function shuffle(){
  questions.sort(()=>Math.random()-0.5);
}
