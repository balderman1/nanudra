const solveButton = document.getElementById('solve');
const solutionDiv = document.getElementById('solution');
const x1Div = document.getElementById('x1');
const x2Div = document.getElementById('x2');


function clearOutPut() {
  const ids = ['solution','x1','x2']
  for (let i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).innerText = '';
  }
}
function renderSolution(a,b,c,sign,index,root) {
  return  `
  <math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>

    <mfrac>
      <mrow>
        <mo>-</mo><mo>(</mo><mi>${b}</mi><mo>)</mo><mo>${sign}</mo>
        <msqrt>
          <msup>
            <mi>${b}</mi>
            <mn>2</mn>
          </msup>
          <mo>-</mo>
          <mo>(</mo>
          <mn>4 </mn>
          <mo>×</mo>
          <mi>${a}</mi>
          <mo>×</mo>
          <mi>${c}</mi>
          <mo>)</mo>
        </msqrt>
      </mrow>
      <mrow>
        <mn>2</mn> <mo>×</mo> <mn>${a}</mn>
      </mrow>
    </mfrac>
    <mo>=</mo>
    <mn>${root.toFixed(3)}</mn> 
  </mrow>
  </math>`
}
solveButton.addEventListener('click', () => {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);
  clearOutPut();
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    solutionDiv.innerText = 'Please enter valid numbers for a, b, and c.';
    return;
  }

  const discriminant = b**2 - 4 * a * c;
  let solution;
  let root1
  let root2
  let num_of_solutions = 0
  if (discriminant === 0) {
    root1 = (-b) / (2 * a)
    solution = `x = ${root1.toFixed(3)}`
    num_of_solutions = 1
  } else if (discriminant > 0) {
    root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    solution = `x₁ = ${root1.toFixed(3)}, x₂ = ${root2.toFixed(3)}`;
    num_of_solutions = 2
  } else {
    solution = `No real solutions, discriminant is negative.`;
  }

  solutionDiv.innerHTML = solution;
  const sign = num_of_solutions == 1 ? '&plusmn;' : '+'
  if(num_of_solutions == 1 || num_of_solutions == 2) {
    x1Div.innerHTML = renderSolution(a, b, c, sign, 1, root1)
  }
  if (num_of_solutions == 2) {
      x2Div.innerHTML = renderSolution(a,b,c,'-',2,root2)
  }

});
