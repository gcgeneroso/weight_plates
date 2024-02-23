const fortyFives = document.getElementById("forty-fives-input")
const thirtyFives = document.getElementById("thirty-fives-input")
const twentyFives = document.getElementById("twenty-fives-input")
const tens = document.getElementById("tens-input")
const fives = document.getElementById("fives-input")
const twoPointFives = document.getElementById("two-point-fives-input")

const totalWeightInput = document.getElementById("total-weight")
const calculatePlatesButton = document.getElementById("calculate-plates")
const clearButton = document.getElementById("clear")
const output = document.getElementById("output")

const barbell = 45

const outputOriginal = output.innerHTML

function calculate_plates(e) {
    const platesTable = document.querySelector('#plates-table tbody')
    const remainingWeight = document.getElementById("remaining-weight")
    e.preventDefault();
    
    let forty_fives = fortyFives.value
    let thirty_fives = thirtyFives.value
    let twenty_fives = twentyFives.value
    let tenz = tens.value
    let fivez = fives.value
    let two_point_fives = twoPointFives.value 
    let plates_used = {}
    const total_weight = totalWeightInput.value
    let minus_barbell = total_weight - barbell

    while (minus_barbell >= 90 && forty_fives >= 2) {
        if (!('45' in plates_used)){
            plates_used['45'] = 0;
        }
        plates_used['45'] += 2
        forty_fives -= 2
        minus_barbell -= 90
    }
    while (minus_barbell >= 70 && thirty_fives >= 2) {
        if (!('35' in plates_used)){
            plates_used['35'] = 0;
        }
        plates_used['35'] += 2
        thirty_fives -= 2
        minus_barbell -= 70
    }
    while (minus_barbell >= 50 && twenty_fives >= 2) {
        if (!('25' in plates_used)){
            plates_used['25'] = 0;
        }
        plates_used['25'] += 2
        twenty_fives -= 2
        minus_barbell -= 50
    }
    while (minus_barbell >= 20 && tenz >= 2) {
        if (!('10' in plates_used)){
            plates_used['10'] = 0;
        }
        plates_used['10'] += 2
        tenz -= 2
        minus_barbell -= 20
    }
    while (minus_barbell >= 10 && fivez >= 2) {
        if (!('5' in plates_used)){
            plates_used['5'] = 0;
        }
        plates_used['5'] += 2
        fivez -= 2
        minus_barbell -= 10
    }
    while (minus_barbell >= 5 && two_point_fives >= 2) {
        if (!('2.5' in plates_used)){
            plates_used['2.5'] = 0;
        }
        plates_used['2.5'] += 2
        two_point_fives -= 2
        minus_barbell -= 5
    }

    output.removeAttribute("hidden")
    // console.log(`Remaining weight: ${minus_barbell}`)
    // console.log(plates_used)

    let sorted = [];
    for(const key in plates_used) {
        sorted[sorted.length] = Number(key);
    }
    sorted.sort(function(a, b){return b-a});
    console.log(sorted)
    for (const key of sorted){
        // console.log(`${plates_used[String(key)]}`)
        // output.innerText += `${key}: ${plates_used[String(key)]}\n`
        platesTable.insertAdjacentHTML("beforeend", `<tr><td>${key}</td><td>${plates_used[String(key)]}</td></tr>`)
    }

    // for (const [k, v] of Object.entries(plates_used)) {
    //     output.innerText += `${k}: ${v}\n`
    // }

    remainingWeight.innerText = `Remaining weight: ${minus_barbell}\n`
}

function clear_table(e) {
    e.preventDefault();
    output.setAttribute("hidden", "")
    output.innerHTML = outputOriginal
}

calculatePlatesButton.addEventListener("click", calculate_plates)
clearButton.addEventListener("click", clear_table)
